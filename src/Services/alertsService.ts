import { PrismaClient as PrismaLBCBi } from '../../generated/clientLBCBi';
import { PrismaClient as PrismaSales, VendasItems } from '../../generated/clientSales';
import { PrismaClient as PrismaRedeFlex } from '../../generated/clientRedeFlex';
import clientService from "./clientService";
import moment from 'moment-timezone';
import { Request, Response, application } from "express";
import { Client } from 'pg'
import { MongoClient } from 'mongodb';
import cron from "node-cron"
import axios from 'axios';
import { fuelList } from '../utils/fuelList';
// import regionsName from "../utils/regions.json"
import stationRegionRepository from '../Repository/stationRegionRepository';
import { Mutex } from 'async-mutex';
import { fuelGroupedByCategory } from '../utils/fuelListGroups';
import { productGroup } from '../utils/produtosAgrupados';
const prismaRedeFlex = new PrismaRedeFlex();
const prismaLBCBi = new PrismaLBCBi();
const prismaSales = new PrismaSales();
const mutex = new Mutex();
const pass = process.env.DATABASE_URLSALES;
let mongoClient: MongoClient;

if (pass) {
    mongoClient = new MongoClient(pass);
} else {
    console.error('DATABASE_URLSALES não está definido');
}

const clientPost = new Client({
    connectionString: process.env.DATABASE_URL,
});


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
class AlertsService {

    public async changeStream() {
        try {
            await mongoClient.connect();
            console.log('Conectado ao MongoDB Atlas para Change Streams');
            const dataStations = await stationRegionRepository.gasStation();
            const db = mongoClient.db('SalesMonitor');
            const collection = db.collection('Vendas');
            const changeStream = collection.watch();


            changeStream.on('change', async (next: any) => {
                // console.log('Mudança detectada:', next);
                const todayDateHour = moment.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                const adjustedDateHour = moment(todayDateHour).subtract(3, 'hours').toISOString();
                const currentDate = moment(adjustedDateHour);
                if (next.operationType === 'insert') {
                    const newDocument = next.fullDocument;
                    // console.log('Novo documento adicionado:', newDocument);
                    const stationNumber = newDocument.ibm;
                    const specificIbm = dataStations.filter(element =>
                        stationNumber === element.ibm_info?.ibm
                    );
                    if (specificIbm.length === 0) {

                        return;
                    }

                    if (newDocument.items.length != 0) {


                        await Promise.all(newDocument.items.map(async (element: VendasItems) => {
                            if (element.iTip === '1' && element.dI === "GASOLINA COMUM") {

                                await Promise.all(specificIbm.map(async specific => {
                                    // console.log(specificIbm)
                                    if (specific.gas_station_marginGC == null) {

                                        return;
                                    }
                                    let margin = specific.gas_station_marginGC ?? 0;
                                    const total: number = parseFloat(element.tot);
                                    if (specific.gas_station_type_marginGC === true && specific.gas_station_marginGC != null) {
                                        const percent = specific.gas_station_marginGC / 100;
                                        margin = total * percent;
                                    }

                                    const savedDate = moment(specific.verification_hour_marginGC);

                                    const differenceInMinutes = currentDate.diff(savedDate, 'minutes');

                                    if ((specific.verification_hour_marginGC == null || differenceInMinutes >= 60) && total < margin) {
                                        if (clientService.client) {
                                            try {
                                                const number = "+553182341415";
                                                const chatId = number.substring(1) + "@c.us";

                                                await clientService.client.sendMessage(chatId, `A sua margem de gasolina comum está abaixo do esperado: A que você escolheu: ${margin} e a que está: ${total}`);
                                                console.log('Mensagem enviada com sucesso!');
                                                await delay(5000);
                                            } catch (error) {
                                                console.error("Erro durante o envio da mensagem:", error);
                                            }
                                        }
                                        await prismaRedeFlex.gas_station_setvariables.update({
                                            data: { verification_hour_marginGC: adjustedDateHour, verification_msg_sent: true },
                                            where: { gas_station_uuid: specific.gas_station_uuid }
                                        });
                                    }
                                }));
                            }
                        }));
                    }
                }
            });

        } catch (error) {
            console.error("Erro ao iniciar o Change Stream:", error);
            throw new Error("Erro ao iniciar o Change Stream");
        }
    }
    public async triggerPostgres() {
        try {
            // Conectar ao banco de dados PostgreSQL
            await clientPost.connect()
                .then(() => {
                    console.log('Conectado ao banco de dados PostgreSQL');
                    clientPost.query('LISTEN table_change_channel');
                })
                .catch(err => {
                    console.error('Erro ao conectar:', err.stack);
                    throw new Error('Erro ao conectar ao PostgreSQL');
                });

            const ibmData = await stationRegionRepository.ibmInfo();
            let isProcessing = false;
            // Ouvir notificações do canal
            clientPost.on('notification', async (msg) => {
                if (isProcessing) return;

                if (msg.payload) {
                    const release = await mutex.acquire(); // Adquire o mutex
                    isProcessing = true;
                    try {

                        console.log(`Notificação recebida:`, msg.payload);
                        const payload = JSON.parse(msg.payload);
                        const tableName = payload.table;
                        const data = payload.data;

                        if (tableName === 'ibm_info') {

                            const ibmName = data.id;
                            const gas_stationData = await stationRegionRepository.gasStation();
                            //Margem acumulada Gasolina Comum
                            const margin_GASOLINA_COMUM = Math.round((data.ibm_margin_GC[0] / data.ibm_margin_GC[1]) * 1000) / 1000;
                            // Margem acumulada Gasolina Podium
                            const margin_GASOLINA_PODIUM = Math.round((data.ibm_margin_GASOLINA_PODIUM[0] / data.ibm_margin_GASOLINA_PODIUM[1]) * 1000) / 1000;
                            // Margem acumulada Gasolina Premium
                            const margin_GASOLINA_PREMIUM = Math.round((data.ibm_margin_GASOLINA_PREMIUM[0] / data.ibm_margin_GASOLINA_PREMIUM[1]) * 1000) / 1000;
                            // Margem acumulada Diesel S10
                            const margin_DIESEL = Math.round((data.ibm_margin_DIESEL_GROUP[0] / data.ibm_margin_DIESEL_GROUP[1]) * 1000) / 1000;
                            // Margem acumulada Diesel S500
                            const margin_DIESEL_S500 = Math.round((data.ibm_margin_DIESEL_GROUP_S500[0] / data.ibm_margin_DIESEL_GROUP_S500[1]) * 1000) / 1000;
                            // Margem acumulada Etanol Comum
                            const margin_ETANOL_COMUM = Math.round((data.ibm_margin_ETANOL_COMUM[0] / data.ibm_margin_ETANOL_COMUM[1]) * 1000) / 1000;
                            // Margem acumulada Aditivos Automoveis
                            const margin_ADITIVOS_AUTOMOVEIS = Math.round((data.ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT[0] / data.ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT[1]) * 1000) / 1000;
                            // Margem acumulada Filtros de Ar
                            const margin_FILTROS_DE_AR = Math.round((data.ibm_margin_FILTROS_AR_PRODUCT[0] / data.ibm_margin_FILTROS_AR_PRODUCT[1]) * 1000) / 1000;
                            for (const element of gas_stationData) {
                                const todayDateHour = moment.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                                const hourwpp = moment(todayDateHour).format('HH:mm');
                                const adjustedDateHour = moment(todayDateHour).toISOString();
                                const adjustedDateHour2 = moment(todayDateHour).subtract(3, 'hours').toISOString();
                                const currentDate = moment(adjustedDateHour);

                                //GASOLINA COMUM
                                let setGASOLINA_COMUM: any = element.gas_station_marginGC
                                //Horário salvo gasolina comum
                                const savedDateGasoline = moment(element.verification_hour_marginGC).add(3, 'hours');
                                const differenceInMinutesGasoline = currentDate.diff(savedDateGasoline, 'minutes');


                                // //GASOLINA PODIUM
                                let setGASOLINA_PODIUM: any = element.gas_station_margin_GASOLINA_PODIUM
                                // //Horário salvo etanol hidratado combustivel
                                const savedDateGASOLINA_PODIUM = moment(element.verification_hour_margin_GASOLINA_PODIUM).add(3, 'hours');
                                const differenceInMinutesGASOLINA_PODIUM = currentDate.diff(savedDateGASOLINA_PODIUM, 'minutes');

                                // //GASOLINA PREMIUM
                                let setGASOLINA_PREMIUM: any = element.gas_station_margin_GASOLINA_PREMIUM
                                // //Horário salvo etanol hidratado combustivel
                                const savedDateGASOLINA_PREMIUM = moment(element.verification_hour_margin_GASOLINA_PREMIUM).add(3, 'hours');
                                const differenceInMinutesGASOLINA_PREMIUM = currentDate.diff(savedDateGASOLINA_PREMIUM, 'minutes');

                                // //DIESEL_S10
                                let setDIESEL: any = element.gas_station_margin_DIESEL_GROUP
                                // //Horário salvo etanol hidratado combustivel
                                const savedDateDIESEL = moment(element.verification_hour_margin_DIESEL_GROUP).add(3, 'hours');
                                const differenceInMinutesDIESEL = currentDate.diff(savedDateDIESEL, 'minutes');

                                // //DIESEL_s500
                                let setDIESEL_s500: any = element.gas_station_margin_DIESEL_GROUP_S500
                                // //Horário salvo etanol hidratado combustivel
                                const savedDateDIESEL_s500 = moment(element.verification_hour_margin_DIESEL_GROUP_S500).add(3, 'hours');
                                const differenceInMinutesDIESEL_S500 = currentDate.diff(savedDateDIESEL_s500, 'minutes');

                                // //Etanol Comum
                                let setETANOL_COMUM: any = element.gas_station_margin_ETANOL_COMUM
                                // //Horário salvo etanol hidratado combustivel
                                const savedDateETANOL_COMUM = moment(element.verification_hour_margin_ETANOL_COMUM).add(3, 'hours');
                                const differenceInMinutesETANOL_COMUM = currentDate.diff(savedDateETANOL_COMUM, 'minutes');


                                // //Aditivos Automoveis
                                let setADITIVOS_AUTOMOVEIS: any = element.gas_station_margin_ADITIVOS_AUTOMOVEIS_PRODUCT
                                // //Horário salvo etanol hidratado combustivel
                                const savedDateADITIVOS_AUTOMOVEIS = moment(element.verification_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT).add(3, 'hours');
                                const differenceInMinutesADITIVOS_AUTOMOVEIS = currentDate.diff(savedDateADITIVOS_AUTOMOVEIS, 'minutes');

                                // //Filtros de Ar
                                let setFILTROS_DE_AR: any = element.gas_station_margin_FILTROS_AR_PRODUCT
                                // //Horário salvo etanol hidratado combustivel
                                const savedDateFILTROS_DE_AR = moment(element.verification_hour_margin_FILTROS_AR_PRODUCT).add(3, 'hours');
                                const differenceInMinutesFILTROS_DE_AR = currentDate.diff(savedDateFILTROS_DE_AR, 'minutes');




                                // console.log({ 1: todayDateHour, 2: hourwpp, 3: adjustedDateHour, 4: adjustedDateHour2, 5: currentDate, 6: savedDateGasoline, 7: differenceInMinutesGasoline })

                                //Interface para tipagem
                                interface Margin {
                                    margin: number,
                                    timeDifference: number,
                                    setValue: number
                                    verificationHour: string
                                    fuelName: string
                                    sanado: string
                                    sanadoHour: string
                                }
                                //Array contendo as margens e comparativos para cada combustível que foi setado para aquele usuário
                                const marginsArrayTyped: Margin[] = [{
                                    margin: margin_GASOLINA_COMUM, timeDifference: differenceInMinutesGasoline, setValue: setGASOLINA_COMUM,
                                    verificationHour: "verification_hour_marginGC", fuelName: "Gasolina Comum", sanado: "gas_station_sanado_marginGC", sanadoHour: "gas_station_sanado_hour_marginGC"
                                },
                                {
                                    margin: margin_GASOLINA_PODIUM, timeDifference: differenceInMinutesGASOLINA_PODIUM,
                                    setValue: setGASOLINA_PODIUM, verificationHour: "verification_hour_margin_GASOLINA_PODIUM",
                                    fuelName: "Gasolina Podium", sanado: "gas_station_sanado_margin_GASOLINA_PODIUM",
                                    sanadoHour: "gas_station_sanado_hour_margin_GASOLINA_PODIUM"
                                },
                                {
                                    margin: margin_GASOLINA_PREMIUM, timeDifference: differenceInMinutesGASOLINA_PREMIUM,
                                    setValue: setGASOLINA_PREMIUM, verificationHour: "verification_hour_margin_GASOLINA_PREMIUM",
                                    fuelName: "Gasolina Premium", sanado: "gas_station_sanado_margin_GASOLINA_PREMIUM",
                                    sanadoHour: "gas_station_sanado_hour_margin_GASOLINA_PREMIUM"
                                },
                                {
                                    margin: margin_DIESEL, timeDifference: differenceInMinutesDIESEL,
                                    setValue: setDIESEL, verificationHour: "verification_hour_margin_DIESEL_GROUP",
                                    fuelName: "Diesel S10", sanado: "gas_station_sanado_margin_DIESEL_GROUP",
                                    sanadoHour: "gas_station_sanado_hour_margin_DIESEL_GROUP"
                                },
                                {
                                    margin: margin_DIESEL_S500, timeDifference: differenceInMinutesDIESEL_S500,
                                    setValue: setDIESEL_s500, verificationHour: "verification_hour_margin_DIESEL_GROUP_S500",
                                    fuelName: "Diesel S500", sanado: "gas_station_sanado_margin_DIESEL_GROUP_S500",
                                    sanadoHour: "gas_station_sanado_hour_margin_DIESEL_GROUP_S500"
                                },
                                {
                                    margin: margin_ETANOL_COMUM, timeDifference: differenceInMinutesETANOL_COMUM,
                                    setValue: setETANOL_COMUM, verificationHour: "verification_hour_margin_ETANOL_COMUM",
                                    fuelName: "Etanol Comum", sanado: "gas_station_sanado_margin_ETANOL_COMUM",
                                    sanadoHour: "gas_station_sanado_hour_ETANOL_COMUM"
                                },
                                {
                                    margin: margin_ADITIVOS_AUTOMOVEIS, timeDifference: differenceInMinutesADITIVOS_AUTOMOVEIS,
                                    setValue: setADITIVOS_AUTOMOVEIS, verificationHour: "verification_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT",
                                    fuelName: "Aditivos Automóveis", sanado: "gas_station_sanado_margin_ADITIVOS_AUTOMOVEIS_PRODUCT",
                                    sanadoHour: "gas_station_sanado_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT"
                                },
                                {
                                    margin: margin_FILTROS_DE_AR, timeDifference: differenceInMinutesFILTROS_DE_AR,
                                    setValue: setFILTROS_DE_AR, verificationHour: "verification_hour_margin_FILTROS_AR_PRODUCT",
                                    fuelName: "Filtros de Ar", sanado: "gas_station_sanado_margin_FILTROS_AR_PRODUCT",
                                    sanadoHour: "gas_station_sanado_hour_margin_FILTROS_AR_PRODUCT"
                                },

                                ]
                                const filterMargins = marginsArrayTyped.filter(values => {
                                    return values.margin !== null && values.margin !== undefined &&
                                        values.setValue !== null && values.setValue !== undefined;
                                });


                                if (element.ibm_info?.id === ibmName) {
                                    //Fluxo para log sanado/nao-sanado
                                    for (const marginsValue of filterMargins) {
                                        if (marginsValue.margin < marginsValue.setValue) {
                                            await prismaRedeFlex.gas_station_setvariables.update({
                                                data: { [marginsValue.sanado]: false, [marginsValue.sanadoHour]: adjustedDateHour2 },
                                                where: { gas_station_uuid: element.gas_station_uuid }

                                            })

                                        } else {
                                            await prismaRedeFlex.gas_station_setvariables.update({
                                                data: { [marginsValue.sanado]: true, [marginsValue.sanadoHour]: adjustedDateHour2 },
                                                where: { gas_station_uuid: element.gas_station_uuid }

                                            })
                                        }
                                        if (marginsValue.timeDifference >= 60 && marginsValue.margin < marginsValue.setValue) {
                                            if (clientService.client) {
                                                try {
                                                    // Enviar mensagens para os números de WhatsApp associados

                                                    element.gas_station_whats_app.map(async (telephone) => {
                                                        if (telephone.length != 0) {
                                                            const chatId = telephone.substring(1) + "@c.us";
                                                            let moeda1: string;
                                                            let moeda2: string;

                                                            moeda1 = marginsValue.setValue < 1 ? 'centavos' : 'reais';
                                                            moeda2 = marginsValue.margin < 1 ? 'centavos' : 'reais';
                                                            const valorSet = marginsValue.setValue < 1 ? marginsValue.setValue : marginsValue.setValue;
                                                            const valorMargin = marginsValue.margin < 1 ? marginsValue.margin : marginsValue.margin;
                                                            let message;
                                                            if (marginsValue.verificationHour.includes("PRODUCT")) {
                                                                message =
                                                                    `*Verificar Ticket Médio Produto de ${marginsValue.fuelName} para o posto ${element.ibm_info?.nomefantasia}.⚠️*\n` +
                                                                    `• *TMP alvo:* ${Math.round(valorSet * 100) / 100} ${moeda1}\n` +
                                                                    `• *TMP atual:* ${Math.round(valorMargin * 100) / 100} ${moeda2}\n\n` +
                                                                    `*Horário:* ${hourwpp}\n\n` +
                                                                    `⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽`;
                                                            } else {
                                                                message =
                                                                    `*Verificar Galonagem de ${marginsValue.fuelName} para o posto ${element.ibm_info?.nomefantasia}.⚠️*\n` +
                                                                    `• *TM Vol alvo:* ${Math.round(valorSet * 100) / 100} litros\n` +
                                                                    `• *TM Vol atual:* ${Math.round(valorMargin * 100) / 100} litros\n\n` +
                                                                    `*Horário:* ${hourwpp}\n\n` +
                                                                    `⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽`;
                                                            }


                                                            await clientService.client.sendMessage(chatId, message);
                                                            console.log('Mensagem enviada com sucesso!');

                                                            // Atualizar a hora de verificação e o estado de envio da mensagem
                                                            await prismaRedeFlex.gas_station_setvariables.update({
                                                                data: { [marginsValue.verificationHour]: adjustedDateHour2, verification_msg_sent: true },
                                                                where: { gas_station_uuid: element.gas_station_uuid }
                                                            });
                                                        }
                                                    });

                                                } catch (error) {
                                                    console.error("Erro durante o envio da mensagem:", error);
                                                }
                                            }
                                        }
                                    }

                                }
                            };

                        } else if (tableName === 'regions') {
                            // const ibmName = data.regions_uuid;

                            // const region_stationData = await stationRegionRepository.regionStation()
                            // //Margem acumulada GASOLINA COMUM
                            // const margin_GASOLINA_COMUM = Math.round((data.regions_margin_GC[0] / data.regions_margin_GC[1]) * 1000) / 1000;
                            // // //Margem acumulada GASOLINA PODIUM
                            // const margin_GASOLINA_PODIUM = Math.round((data.regions_margin_GASOLINA_PODIUM[0] / data.regions_margin_GASOLINA_PODIUM[1]) * 1000) / 1000;
                            // // //Margem acumulada GASOLINA PREMIUM
                            // const margin_GASOLINA_PREMIUM = Math.round((data.regions_margin_GASOLINA_PREMIUM[0] / data.regions_margin_GASOLINA_PREMIUM[1]) * 1000) / 1000;
                            // //Array de margens acumuladas
                            // for (const element of region_stationData) {

                            //     const todayDateHour = moment.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
                            //     const hourwpp = moment(todayDateHour).format('HH:mm');
                            //     const adjustedDateHour = moment(todayDateHour).toISOString();
                            //     const adjustedDateHour2 = moment(todayDateHour).subtract(3, 'hours').toISOString();
                            //     const currentDate = moment(adjustedDateHour);
                            //     //GASOLINA COMUM
                            //     let setGASOLINA_COMUM: any = element.region_marginGC
                            //     //Horário salvo gasolina comum
                            //     const savedDateGasoline = moment(element.verification_hour_marginGC).add(3, 'hours');
                            //     const differenceInMinutesGasoline = currentDate.diff(savedDateGasoline, 'minutes');

                            //     // //GASOLINA PODIUM
                            //     let setGASOLINA_PODIUM: any = element.region_margin_GASOLINA_PODIUM
                            //     // //Horário salvo gasolina podium
                            //     const savedDateGASOLINA_PODIUM = moment(element.verification_hour_margin_GASOLINA_PODIUM).add(3, 'hours');
                            //     const differenceInMinutesGASOLINA_PODIUM = currentDate.diff(savedDateGASOLINA_PODIUM, 'minutes');

                            //     // //GASOLINA PREMIUM
                            //     let setGASOLINA_PREMIUM: any = element.region_margin_GASOLINA_PREMIUM
                            //     // //Horário salvo gasolina podium
                            //     const savedDateGASOLINA_PREMIUM = moment(element.verification_hour_margin_GASOLINA_PREMIUM).add(3, 'hours');
                            //     const differenceInMinutesGASOLINA_PREMIUM = currentDate.diff(savedDateGASOLINA_PREMIUM, 'minutes');
                            //     interface Margin {
                            //         margin: number,
                            //         timeDifference: number,
                            //         setValue: number
                            //         verificationHour: string
                            //         fuelName: string
                            //         sanado: string
                            //         sanadoHour: string
                            //     }

                            //     const marginsArrayTyped: Margin[] = [{
                            //         margin: margin_GASOLINA_COMUM, timeDifference: differenceInMinutesGasoline,
                            //         setValue: setGASOLINA_COMUM,
                            //         verificationHour: "verification_hour_marginGC", fuelName: "Gasolina Comum",
                            //         sanado: "region_sanado_marginGC", sanadoHour: "region_sanado_hour_marginGC"
                            //     },
                            //     {
                            //         margin: margin_GASOLINA_PODIUM, timeDifference: differenceInMinutesGASOLINA_PODIUM, setValue: setGASOLINA_PODIUM,
                            //         verificationHour: "verification_hour_margin_GASOLINA_PODIUM", fuelName: "Gasolina Podium",
                            //         sanado: "region_sanado_margin_GASOLINA_PODIUM", sanadoHour: "region_sanado_hour_GASOLINA_PODIUM"
                            //     },
                            //     {
                            //         margin: margin_GASOLINA_PREMIUM, timeDifference: differenceInMinutesGASOLINA_PREMIUM, setValue: setGASOLINA_PREMIUM,
                            //         verificationHour: "verification_hour_margin_GASOLINA_PREMIUM", fuelName: "Gasolina Premium",
                            //         sanado: "region_sanado_margin_GASOLINA_PREMIUM", sanadoHour: "region_sanado_hour_GASOLINA_PREMIUM"
                            //     },
                            //     ]

                            //     const filterMargins = marginsArrayTyped.filter(values => {
                            //         return values.margin !== null && values.margin !== undefined &&
                            //             values.setValue !== null && values.setValue !== undefined;
                            //     });
                            //     if (element.regions?.regions_uuid === ibmName) {
                            //         //Fluxo para log sanado/nao-sanado

                            //         for (const marginsValue of filterMargins) {

                            //             if (marginsValue.margin < marginsValue.setValue) {
                            //                 await prismaRedeFlex.region_setvariables.update({
                            //                     data: { [marginsValue.sanado]: false, [marginsValue.sanadoHour]: adjustedDateHour2 },
                            //                     where: { region_uuid: element.region_uuid }

                            //                 })

                            //             } else {
                            //                 await prismaRedeFlex.region_setvariables.update({
                            //                     data: { [marginsValue.sanado]: true, [marginsValue.sanadoHour]: adjustedDateHour2 },
                            //                     where: { region_uuid: element.region_uuid }

                            //                 })
                            //             }
                            //             if (marginsValue.timeDifference >= 60 && marginsValue.margin < marginsValue.setValue) {
                            //                 if (clientService.client) {
                            //                     try {
                            //                         // Enviar mensagens para os números de WhatsApp associados
                            //                         element.region_whats_app.map(async (telephone) => {
                            //                             const chatId = telephone.substring(1) + "@c.us";
                            //                             let moeda1: string
                            //                             let moeda2: string
                            //                             if (marginsValue.setValue < 1) {
                            //                                 moeda1 = 'centavos'
                            //                             } else {
                            //                                 moeda1 = 'reais'
                            //                             }
                            //                             if (marginsValue.margin < 1) {
                            //                                 moeda2 = 'centavos'
                            //                             } else {
                            //                                 moeda2 = 'reais'
                            //                             }
                            //                             const message =
                            //                                 `* Verificar margem de ${marginsValue.fuelName} para a região ${element.regions?.regions_name}.⚠️*\n` +
                            //                                 `• *Valor da margem definida:* ${marginsValue.setValue} reais\n` +
                            //                                 `• *Valor da margem atual:* ${marginsValue.margin} reais\n\n` +
                            //                                 `*Horário:* ${hourwpp}\n\n` +
                            //                                 `⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽ ⛽`;
                            //                             await clientService.client.sendMessage(chatId, message)
                            //                             console.log('Mensagem enviada com sucesso!');
                            //                             // Atualizar a hora de verificação e o estado de envio da mensagem

                            //                             await prismaRedeFlex.region_setvariables.update({
                            //                                 data: { [marginsValue.verificationHour]: adjustedDateHour2, verification_msg_sent: true },
                            //                                 where: { region_uuid: element.region_uuid }
                            //                             });


                            //                         });

                            //                     } catch (error) {
                            //                         console.error("Erro durante o envio da mensagem:", error);
                            //                     }
                            //                 }
                            //             }


                            //         }
                            //     }
                            // }
                        }

                    } finally {
                        isProcessing = false;
                        release();
                    }
                } else {
                    console.warn('Mensagem de notificação sem payload.');
                }
            });

        } catch (error) {
            console.error("Erro ao iniciar o trigger do PostgreSQL:", error);
            throw new Error("Erro ao iniciar o trigger do PostgreSQL");
        }
    }

    public async dataSum() {
        const mutex = new Mutex();  // Cria o mutex

        try {
            await mongoClient.connect();
            console.log('Conectado ao MongoDB Atlas para Change Streams');
            const dataStations = await stationRegionRepository.gasStation();
            const db = mongoClient.db('SalesMonitor');
            const collection = db.collection('Vendas');
            const changeStream = collection.watch();
            const todayDateHour = moment.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
            const adjustedDateHour = moment(todayDateHour).subtract(3, 'hours').toISOString();
            const currentDate = moment(adjustedDateHour);

            changeStream.on('change', async (next: any) => {
                if (next.operationType === 'insert') {
                    const release = await mutex.acquire();
                    try {
                        const newDocument = next.fullDocument;
                        const stationNumber = newDocument.ibm;
                        const ibmInfo = await prismaRedeFlex.ibm_info.findFirst({
                            select: {
                                id: true, ibm_margin_GC: true,
                                ibm_margin_GASOLINA_PODIUM: true,
                                ibm_margin_GASOLINA_PREMIUM: true,
                                ibm_margin_DIESEL_GROUP: true,
                                ibm_margin_DIESEL_GROUP_S500: true,
                                ibm_margin_ETANOL_COMUM: true,
                                ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: true,
                                ibm_margin_FILTROS_AR_PRODUCT: true,
                                regional: true
                            }, where: { ibm: stationNumber }
                        });
                        // const regionID = await prismaRedeFlex.regions.findFirst({
                        //     where: { regions_name: ibmInfo?.regional },
                        //     select: {
                        //         regions_uuid: true,
                        //         regions_margin_GC: true,
                        //         regions_margin_GASOLINA_PODIUM: true,
                        //         regions_margin_GASOLINA_PREMIUM: true,
                        //         regions_margin_DIESEL_GROUP: true,
                        //         regions_margin_DIESEL_GROUP_S500: true,
                        //         regions_margin_ETANOL_COMUM: true,
                        //     }
                        // });

                        const stationItems = newDocument.items;
                        //Soma e inserção no banco de dados do grupo de Gasolinas
                        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
                        //FLuxo Gasolina Comum
                        const stationItemsGasolinaComum = stationItems.filter((element: VendasItems) => {
                            return fuelGroupedByCategory.gasolinaComum.includes(element.dI);
                        });
                        // const itensTipo0 = stationItemsGasolinaComum.filter((item: any) => item.iTip === '0');
                        // const itensTipo1 = stationItemsGasolinaComum.filter((item: any) => item.iTip === '1');
                        //Quantas vezes foi abastecido combustível nos postos
                        const supplyQuantityGasolinaComum = stationItemsGasolinaComum.flatMap((element: any) => {
                            return element

                        })
                        //Quantas vezes entraram carros e compraram no posto
                        const quantSupplyGasolinaComum = supplyQuantityGasolinaComum.length
                        if (stationItemsGasolinaComum.length != 0) {
                            const sumFuelNumerator = stationItemsGasolinaComum.reduce((accumulator: number, currentValue: any) => {
                                return (accumulator || 0) + parseFloat(currentValue.qd) || 0;
                            }, 0);
                            const sumFuelDenominator = quantSupplyGasolinaComum
                            console.log({ DENOMINADOR: sumFuelDenominator })
                            await prismaRedeFlex.ibm_info.update({ data: { ibm_margin_GC: [ibmInfo?.ibm_margin_GC[0] + sumFuelNumerator, ibmInfo?.ibm_margin_GC[1] + sumFuelDenominator] }, where: { id: ibmInfo?.id } });
                            await delay(500);
                            // if (ibmInfo?.regional != undefined) {
                            //     await prismaRedeFlex.regions.updateMany({ data: { regions_margin_GC: [regionID?.regions_margin_GC[0] + sumFuelNumerator, regionID?.regions_margin_GC[1] + sumFuelDenominator] }, where: { regions_name: ibmInfo.regional } });
                            // }
                        }
                        await delay(1500);
                        //Fluxo Gasolina Podium
                        const stationItemsGasolinaPodium = stationItems.filter((element: VendasItems) => {
                            return fuelGroupedByCategory.gasolinaPodium.includes(element.dI);
                        });
                        //Quantas vezes foi abastecido combustível nos postos
                        const supplyQuantityGasolinaPodium = stationItemsGasolinaPodium.flatMap((element: any) => {
                            return element

                        })
                        //Quantas vezes entraram carros e compraram no posto
                        const quantSupplyGasolinaPodium = supplyQuantityGasolinaPodium.length
                        if (stationItemsGasolinaPodium.length != 0) {
                            const sumFuelNumerator = stationItemsGasolinaPodium.reduce((accumulator: number, currentValue: any) => {
                                return (accumulator || 0) + parseFloat(currentValue.qd) || 0;
                            }, 0);
                            const sumFuelDenominator = quantSupplyGasolinaPodium
                            // console.log({ DENOMINADOR: sumFuelDenominator })
                            await prismaRedeFlex.ibm_info.update({ data: { ibm_margin_GASOLINA_PODIUM: [ibmInfo?.ibm_margin_GASOLINA_PODIUM[0] + sumFuelNumerator, ibmInfo?.ibm_margin_GASOLINA_PODIUM[1] + sumFuelDenominator] }, where: { id: ibmInfo?.id } });
                            await delay(500);
                            // if (ibmInfo?.regional != undefined) {
                            //     await prismaRedeFlex.regions.updateMany({ data: { regions_margin_GASOLINA_PODIUM: [regionID?.regions_margin_GASOLINA_PODIUM[0] + sumFuelNumerator, regionID?.regions_margin_GASOLINA_PODIUM[1] + sumFuelDenominator] }, where: { regions_name: ibmInfo.regional } });
                            // }
                        }
                        await delay(1500);
                        //Fluxo Gasolina Premium
                        const stationItemsGasolinaPremium = stationItems.filter((element: VendasItems) => {
                            return fuelGroupedByCategory.gasolinaPremium.includes(element.dI);
                        });

                        //Quantas vezes foi abastecido combustível nos postos
                        const supplyQuantityGasolinaPremium = stationItemsGasolinaPremium.flatMap((element: any) => {
                            return element

                        })
                        //Quantas vezes entraram carros e compraram no posto
                        const quantSupplyGasolinaPremium = supplyQuantityGasolinaPremium.length
                        if (stationItemsGasolinaPremium.length != 0) {
                            const sumFuelNumerator = stationItemsGasolinaPremium.reduce((accumulator: number, currentValue: any) => {
                                return (accumulator || 0) + parseFloat(currentValue.qd) || 0;
                            }, 0);
                            const sumFuelDenominator = quantSupplyGasolinaPremium
                            // console.log({ DENOMINADOR: sumFuelDenominator })
                            await prismaRedeFlex.ibm_info.update({ data: { ibm_margin_GASOLINA_PREMIUM: [ibmInfo?.ibm_margin_GASOLINA_PREMIUM[0] + sumFuelNumerator, ibmInfo?.ibm_margin_GASOLINA_PREMIUM[1] + sumFuelDenominator] }, where: { id: ibmInfo?.id } });
                            await delay(500);
                            // if (ibmInfo?.regional != undefined) {
                            //     await prismaRedeFlex.regions.updateMany({ data: { regions_margin_GASOLINA_PREMIUM: [regionID?.regions_margin_GASOLINA_PREMIUM[0] + sumFuelNumerator, regionID?.regions_margin_GASOLINA_PREMIUM[1] + sumFuelDenominator] }, where: { regions_name: ibmInfo.regional } });
                            // }
                        }
                        await delay(1500);
                        //Fluxo Diesel S10-DIESELGROUP
                        const stationItemsDiesel = stationItems.filter((element: VendasItems) => {
                            return fuelGroupedByCategory.dieselS10.includes(element.dI);
                        });
                        //Quantas vezes foi abastecido combustível nos postos
                        const supplyQuantityDieselS10 = stationItemsDiesel.flatMap((element: any) => {
                            return element

                        })
                        //Quantas vezes entraram carros e compraram no posto
                        const quantSupplyDieselS10 = supplyQuantityDieselS10.length
                        if (stationItemsDiesel.length != 0) {
                            const sumFuelNumerator = stationItemsDiesel.reduce((accumulator: number, currentValue: any) => {
                                return (accumulator || 0) + parseFloat(currentValue.qd) || 0;
                            }, 0);
                            const sumFuelDenominator = quantSupplyDieselS10
                            await prismaRedeFlex.ibm_info.update({ data: { ibm_margin_DIESEL_GROUP: [ibmInfo?.ibm_margin_DIESEL_GROUP[0] + sumFuelNumerator, ibmInfo?.ibm_margin_DIESEL_GROUP[1] + sumFuelDenominator] }, where: { id: ibmInfo?.id } });
                            await delay(500);
                            // if (ibmInfo?.regional != undefined) {
                            //     await prismaRedeFlex.regions.updateMany({ data: { regions_margin_DIESEL_GROUP: [regionID?.regions_margin_DIESEL_GROUP[0] + sumFuelNumerator, regionID?.regions_margin_DIESEL_GROUP[1] + sumFuelDenominator] }, where: { regions_name: ibmInfo.regional } });
                            // }
                        }
                        await delay(1500);
                        //Fluxo Diesel S500
                        const stationItemsDiesel_S500 = stationItems.filter((element: VendasItems) => {
                            return fuelGroupedByCategory.dieselS500.includes(element.dI);
                        });
                        //Quantas vezes foi abastecido combustível nos postos
                        const supplyQuantityDieselS500 = stationItemsDiesel_S500.flatMap((element: any) => {
                            return element

                        })
                        //Quantas vezes entraram carros e compraram no posto
                        const quantSupplyDieselS500 = supplyQuantityDieselS500.length
                        if (stationItemsDiesel_S500.length != 0) {
                            const sumFuelNumerator = stationItemsDiesel_S500.reduce((accumulator: number, currentValue: any) => {
                                return (accumulator || 0) + parseFloat(currentValue.qd) || 0;
                            }, 0);
                            const sumFuelDenominator = quantSupplyDieselS500
                            await prismaRedeFlex.ibm_info.update({ data: { ibm_margin_DIESEL_GROUP_S500: [ibmInfo?.ibm_margin_DIESEL_GROUP_S500[0] + sumFuelNumerator, ibmInfo?.ibm_margin_DIESEL_GROUP_S500[1] + sumFuelDenominator] }, where: { id: ibmInfo?.id } });
                            await delay(500);
                            // if (ibmInfo?.regional != undefined) {
                            //     await prismaRedeFlex.regions.updateMany({ data: { regions_margin_DIESEL_GROUP_S500: [regionID?.regions_margin_DIESEL_GROUP_S500[0] + sumFuelNumerator, regionID?.regions_margin_DIESEL_GROUP_S500[1] + sumFuelDenominator] }, where: { regions_name: ibmInfo.regional } });
                            // }
                        }
                        await delay(1500);
                        //Fluxo Etanol Comum
                        const stationItemsEtanolComum = stationItems.filter((element: VendasItems) => {
                            return fuelGroupedByCategory.etanolComum.includes(element.dI);
                        });
                        //Quantas vezes foi abastecido combustível nos postos
                        const supplyQuantityEtanolComum = stationItemsEtanolComum.flatMap((element: any) => {
                            return element

                        })
                        //Quantas vezes entraram carros e compraram no posto
                        const quantSupplyEtanolComum = supplyQuantityEtanolComum.length
                        if (stationItemsEtanolComum.length != 0) {
                            const sumFuelNumerator = stationItemsEtanolComum.reduce((accumulator: number, currentValue: any) => {
                                return (accumulator || 0) + parseFloat(currentValue.qd) || 0;
                            }, 0);
                            const sumFuelDenominator = quantSupplyEtanolComum
                            await prismaRedeFlex.ibm_info.update({ data: { ibm_margin_ETANOL_COMUM: [ibmInfo?.ibm_margin_ETANOL_COMUM[0] + sumFuelNumerator, ibmInfo?.ibm_margin_ETANOL_COMUM[1] + sumFuelDenominator] }, where: { id: ibmInfo?.id } });
                            await delay(500);
                            // if (ibmInfo?.regional != undefined) {
                            //     await prismaRedeFlex.regions.updateMany({ data: { regions_margin_ETANOL_COMUM: [regionID?.regions_margin_ETANOL_COMUM[0] + sumFuelNumerator, regionID?.regions_margin_ETANOL_COMUM[1] + sumFuelDenominator] }, where: { regions_name: ibmInfo.regional } });
                            // }
                        }
                        await delay(1500);
                        //Fluxo por produtos
                        //Aditivos Automoveis
                        const stationItemsAditivosAutomoveis = stationItems.filter((element: VendasItems) => {
                            return productGroup['ADITIVOS AUTOMÓVEIS'].includes(element.dI);
                        });
                        //Quantas vezes foi abastecido combustível nos postos
                        const supplyQuantityAditivosAutomoveis = stationItemsAditivosAutomoveis.flatMap((element: any) => {
                            return element

                        })
                        //Quantas vezes entraram carros e compraram no posto
                        const quantSupplyAditivosautomoveis = supplyQuantityAditivosAutomoveis.length
                        if (stationItemsAditivosAutomoveis.length != 0) {
                            const sumFuelNumerator = stationItemsAditivosAutomoveis.reduce((accumulator: number, currentValue: any) => {
                                return (accumulator || 0) + parseFloat(currentValue.tot) || 0;
                            }, 0);
                            const sumFuelDenominator = quantSupplyAditivosautomoveis
                            await prismaRedeFlex.ibm_info.update({ data: { ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: [ibmInfo?.ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT[0] + sumFuelNumerator, ibmInfo?.ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT[1] + sumFuelDenominator] }, where: { id: ibmInfo?.id } });
                            await delay(500);
                            // if (ibmInfo?.regional != undefined) {
                            //     await prismaRedeFlex.regions.updateMany({ data: { regions_margin_ETANOL_COMUM: [regionID?.regions_margin_ETANOL_COMUM[0] + sumFuelNumerator, regionID?.regions_margin_ETANOL_COMUM[1] + sumFuelDenominator] }, where: { regions_name: ibmInfo.regional } });
                            // }
                        }
                        await delay(1500);
                        //Filtros de Ar
                        const stationItemsFiltrosdeAr = stationItems.filter((element: VendasItems) => {
                            return productGroup['FILTROS AR'].includes(element.dI);
                        });
                        //Quantas vezes foi abastecido combustível nos postos
                        const supplyQuantityFiltrosdeAr = stationItemsFiltrosdeAr.flatMap((element: any) => {
                            return element

                        })
                        //Quantas vezes entraram carros e compraram no posto
                        const quantSupplyFiltrosdeAr = supplyQuantityFiltrosdeAr.length
                        if (stationItemsAditivosAutomoveis.length != 0) {
                            const sumFuelNumerator = quantSupplyFiltrosdeAr.reduce((accumulator: number, currentValue: any) => {
                                return (accumulator || 0) + parseFloat(currentValue.tot) || 0;
                            }, 0);
                            const sumFuelDenominator = quantSupplyFiltrosdeAr
                            await prismaRedeFlex.ibm_info.update({ data: { ibm_margin_FILTROS_AR_PRODUCT: [ibmInfo?.ibm_margin_FILTROS_AR_PRODUCT[0] + sumFuelNumerator, ibmInfo?.ibm_margin_FILTROS_AR_PRODUCT[1] + sumFuelDenominator] }, where: { id: ibmInfo?.id } });
                            await delay(500);
                            // if (ibmInfo?.regional != undefined) {
                            //     await prismaRedeFlex.regions.updateMany({ data: { regions_margin_ETANOL_COMUM: [regionID?.regions_margin_ETANOL_COMUM[0] + sumFuelNumerator, regionID?.regions_margin_ETANOL_COMUM[1] + sumFuelDenominator] }, where: { regions_name: ibmInfo.regional } });
                            // }
                        }
                        await delay(1500);

                    } finally {
                        release();
                    }
                }
            });
        } catch (error) {
            console.error("Erro ao iniciar o Change Stream:", error);
            throw new Error("Erro ao iniciar o Change Stream");
        }
    }
    public async errorDoc() {
        const mutex = new Mutex();  // Cria o mutex

        try {
            await mongoClient.connect();
            console.log('Conectado ao MongoDB Atlas para Change Streams');

            const db = mongoClient.db('SalesMonitor');
            const collection = db.collection('Vendas');
            let changeStream;

            try {
                changeStream = collection.watch();
            } catch (error) {
                console.error("Erro ao iniciar o Change Stream:", error);
                throw new Error("Erro ao iniciar o Change Stream");
            }

            const todayDate = moment.tz('America/Sao_Paulo').startOf("day");
            console.log(todayDate)
            changeStream.on('change', async (next: any) => {
                if (next.operationType === 'insert' || next.operationType === 'update') {
                    const release = await mutex.acquire();
                    try {
                        const newDocument = next.fullDocument;
                        const stationNumber = newDocument.ibm;
                        const stationName = await prismaRedeFlex.ibm_info.findFirst({ select: { nomefantasia: true }, where: { ibm: stationNumber } })
                        const dateTime = newDocument.dtHr;
                        const adjustedDateTime = moment(dateTime).add(3, 'hours');
                        console.log(dateTime, adjustedDateTime)
                        if (!dateTime || !moment(dateTime, moment.ISO_8601, true).isValid()) {
                            console.error("Data inválida ou ausente:", dateTime);
                            return;
                        }
                        const formattedDateTime = adjustedDateTime.format('DD/MM/YYYY HH:mm:ss');
                        if (moment(adjustedDateTime).isBefore(todayDate)) {
                            const arrayNumbers = ["+553192206401", "+553192932316"];
                            for (const num of arrayNumbers) {
                                const tel = num.substring(1) + "@c.us";
                                try {
                                    await clientService.client.sendMessage(
                                        tel,
                                        `*⚠️ Documento com atraso recebido!*\n\n🔑 *Ibm*: ${stationNumber}\n📍*Posto*: ${stationName?.nomefantasia}\n🕒 *Data*: ${formattedDateTime}`
                                    );
                                } catch (error) {
                                    console.error("Erro ao enviar mensagem:", error);
                                }
                            }
                            await delay(1500);
                        }
                    } finally {
                        release();
                    }
                }
            });
        } catch (error) {
            console.error("Erro ao iniciar o Change Stream:", error);
            throw new Error("Erro ao iniciar o Change Stream");
        }
    }

    public async zeroRoutine() {
        try {

            await prismaRedeFlex.ibm_info.updateMany({
                data: {
                    ibm_margin_GC: [0, 0], ibm_margin_GASOLINA_PODIUM: [0, 0],
                    ibm_margin_GASOLINA_PREMIUM: [0, 0],
                    ibm_margin_DIESEL_GROUP: [0, 0], ibm_margin_DIESEL_GROUP_S500: [0, 0],
                    ibm_margin_ETANOL_COMUM: [0, 0],
                    ibm_margin_TOTAL_PRODUCT: [0, 0],
                    ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: [0, 0]
                }

            })
            await prismaRedeFlex.regions.updateMany({
                data: {
                    regions_margin_GC: [0, 0], regions_margin_GASOLINA_PODIUM: [0, 0],
                    regions_margin_GASOLINA_PREMIUM: [0, 0], regions_margin_DIESEL_GROUP: [0, 0], regions_margin_DIESEL_GROUP_S500: [0, 0],
                    regions_margin_ETANOL_COMUM: [0, 0],

                },

            }
            )
            console.log("Dados Adicionados!")
        } catch (error) {

            console.error("Não foi possível atualizar os dados!", error);


        }

    }
    public async alertsMLTTMP(req: Request, res: Response) {

        try {
            const actualdate = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD");
            const fuelliterageSell = await prismaSales.vendas.findMany({
                select: { items: true, ibm: true },
                where: {
                    dtHr: {
                        gte: `${actualdate}T00:00:00.000Z`,
                        lte: `${actualdate}T23:59:59.999Z`
                    }
                },

            })

            let ibmObjects: { [key: string]: VendasItems[] } = {};
            const ibms = fuelliterageSell.filter(element => {
                const ibmName = element.ibm
                if (!ibmObjects[ibmName]) {
                    ibmObjects[ibmName] = element.items
                } else {
                    ibmObjects[ibmName] = [...ibmObjects[ibmName], ...element.items]
                }

            })
            let arrayFuel: any = []
            //Faturamento combustível de cada elemento
            for (let value in ibmObjects) {
                const quantSupply = ibmObjects[value].length;
                const sumFuel = ibmObjects[value].reduce((accumulator: number, currentValue: any) => {
                    if (currentValue.iTip === '1') {

                        accumulator += parseFloat(currentValue.tot) || 0;
                    }
                    return accumulator;
                }, 0);
                const sumCostPrice = ibmObjects[value].reduce((accumulator: number, currentValue: any) => {
                    if (currentValue.iTip === '1') {

                        accumulator += parseFloat(currentValue.qd) * parseFloat(currentValue.pC) || 0;
                    }
                    return accumulator;
                }, 0);
                const sumProductPrice = ibmObjects[value].reduce((accumulator: number, currentValue: any) => {
                    if (currentValue.iTip === '0') {

                        accumulator += parseFloat(currentValue.qd) * parseFloat(currentValue.pC) || 0;
                    }
                    return accumulator;
                }, 0);
                const sumLiterage = ibmObjects[value].reduce((accumulator: number, currentValue: any) => {
                    if (currentValue.iTip === '1') {

                        accumulator += parseFloat(currentValue.qd) || 0;
                    }
                    return accumulator;
                }, 0);
                //Diferença faturamento de combustível pelo custo que é o lucro
                const fuelProfit = Math.round(((sumFuel - sumCostPrice)) * 100) / 100
                const valueMLT = sumLiterage !== 0 ? ((fuelProfit / sumLiterage)) : 0
                //Definir TMP
                const valueTMP = quantSupply !== 0 ? (sumProductPrice / quantSupply) : 0;
                arrayFuel.push({ [value]: [{ valueMLT: Math.round(valueMLT * 100) / 100 }, { valueTMP: Math.round(valueTMP * 100) / 100 }] });
            }

            //Buscar no banco de dados as informações referentes aos usuários que definiram margens para o envio de alertas
            const usersInfo = await prismaRedeFlex.gas_station_setvariables.findMany({
                select: {

                    gas_station_margin_MLT: true, gas_station_margin_TMP: true, gas_station_uuid: true, gas_station_whats_app: true, use_uuid: true, ibm_info_id: true,
                    ibm_info: { select: { nomefantasia: true, ibm: true } }
                }
            })
            const flatMappingUsers = usersInfo.map(element => {
                const { ibm_info, ...rest } = element
                let elementNew = { ...rest, ibm: element.ibm_info?.ibm, nomefantasia: element.ibm_info?.nomefantasia, sumMlt: 0, sumTmp: 0 }
                arrayFuel.map((value: any) => {
                    const name = Object.keys(value);

                    if (name[0] === element.ibm_info?.ibm) {
                        console.log(name[0])
                        elementNew.sumMlt = value[name[0]].find((val: any) => val.valueMLT !== undefined)?.valueMLT || 0;
                        elementNew.sumTmp = value[name[0]].find((val: any) => val.valueTMP !== undefined)?.valueTMP || 0;
                    }

                });
                return elementNew

            })


            return res.status(200).json({ data: flatMappingUsers })



        } catch (error) {

            console.error("Não foi possível enviar as informações!", error);


        }


    }
    public async bigNumbersAlerts(req?: Request, res?: Response) {
        try {
            const actualdate = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD");
            const firstDayOfMonth = moment()
                .tz("America/Sao_Paulo")
                .startOf("month")
                .format("YYYY-MM-DD");

            const actualDay = parseFloat(actualdate.split("-")[2]) - 1;

            const fuelliterageSell = await prismaSales.vendas.findMany({
                select: {
                    items: {
                        select: {
                            iTip: true,
                            tot: true,
                            qd: true,
                            pC: true,
                        },
                    },
                    ibm: true,
                },
                where: {
                    dtHr: {
                        gte: `${actualdate}T00:00:00.000Z`,
                        lte: `${actualdate}T23:59:59.999Z`,
                    },
                },
            });
            //Construção array de items
            const itemsArray = fuelliterageSell.flatMap((element) => {
                return element.items;
            });

            //Quantas vezes foi abastecido combustível nos postos
            const supplyQuantity = itemsArray.flatMap((element) => {
                return element;
            });
            //Quantas vezes entraram carros e compraram no posto
            const quantTotal = itemsArray.length;
            const quantSupply = supplyQuantity.length;

            //Soma combustíveis tipo combustivel
            const fuel = itemsArray
                .map((element) => {
                    if (element.iTip == "1") {
                        return parseFloat(element.tot);
                    }
                    return undefined;
                })
                .filter((item): item is number => item !== undefined);

            const sumFuel = fuel.reduce((accumulator, currentValue) => {
                return (accumulator || 0) + (currentValue || 0);
            }, 0);

            //Faturamento total combustível+produto
            const fuelTotal = itemsArray
                .map((element) => {
                    return parseFloat(element.tot);
                })
                .filter((item): item is number => item !== undefined);

            const sumFuelTotal = fuelTotal.reduce((accumulator, currentValue) => {
                return (accumulator || 0) + (currentValue || 0);
            }, 0);

            //Soma da litragem tipo combustível
            const literage = itemsArray
                .map((element) => {
                    if (element.iTip == "1") {
                        return parseFloat(element.qd);
                    }
                    return undefined;
                })
                .filter((item): item is number => item !== undefined);

            //Carros que entraram no posto
            const supply = itemsArray.map((element) => {
                return parseFloat(element.qd);
            }, 0);
            const sumSupply = supply.reduce((accumulator, currentValue) => {
                return (accumulator || 0) + (currentValue || 0);
            }, 0);
            const sumLiterage = literage.reduce((accumulator, currentValue) => {
                return (accumulator || 0) + (currentValue || 0);
            }, 0);
            //Soma do preço de custo do combustível
            const cost_price = itemsArray
                .map((element) => {
                    if (element.iTip === "1") {
                        return { pc: parseFloat(element.pC), qd: parseFloat(element.qd) };
                    }
                    return undefined;
                })
                .filter(
                    (item): item is { pc: number; qd: number } => item !== undefined
                );

            const sumCostPrice = cost_price.reduce((accumulator, currentValue) => {
                return (accumulator || 0) + (currentValue.qd * currentValue.pc || 0);
            }, 0);

            //Soma combustíveis tipo produto
            const fuelProd = itemsArray
                .map((element) => {
                    if (element.iTip == "0") {
                        return parseFloat(element.tot);
                    }
                    return undefined;
                })
                .filter((item): item is number => item !== undefined);

            const sumFuelProd = fuelProd.reduce((accumulator, currentValue) => {
                return (accumulator || 0) + (currentValue || 0);
            }, 0);

            //Soma da litragem tipo produto
            const literageProd = itemsArray
                .map((element) => {
                    if (element.iTip == "0") {
                        return parseFloat(element.qd);
                    }
                    return undefined;
                })
                .filter((item): item is number => item !== undefined);

            const sumLiterageProd = literageProd.reduce(
                (accumulator, currentValue) => {
                    return (accumulator || 0) + (currentValue || 0);
                },
                0
            );
            //Soma do preço de custo do produto
            const product_price = itemsArray
                .map((element) => {
                    if (element.iTip === "0") {
                        return { pc: parseFloat(element.pC), qd: parseFloat(element.qd) };
                    }
                    return undefined;
                })
                .filter(
                    (item): item is { pc: number; qd: number } => item !== undefined
                );

            const sumProductPrice = product_price.reduce(
                (accumulator, currentValue) => {
                    return (
                        (accumulator || 0) + (currentValue.pc * currentValue.qd || 0)
                    );
                },
                0
            );

            //Fluxo valor bignumbers ultima semana
            const samedayLastWeek = moment()
                .tz("America/Sao_Paulo")
                .subtract(7, "days")
                .format("YYYY-MM-DD");
            const samedayLastWeekDate = moment()
                .tz("America/Sao_Paulo")
                .subtract(7, "days")
                .subtract(3, "hours")
                .toISOString();

            const fuelliterageSellLastWeek = await prismaSales.vendas.findMany({
                select: {
                    items: {
                        select: {
                            iTip: true,
                            tot: true,
                            qd: true,
                            pC: true,
                        },
                    },
                    ibm: true,
                    dtHr: true,
                },
                where: {
                    dtHr: {
                        gte: `${samedayLastWeek}T00:00:00.000Z`,
                        lte: samedayLastWeekDate,
                    },
                },
            });

            //Construção array de items
            const itemsArrayLastWeek = fuelliterageSellLastWeek.flatMap(
                (element) => {
                    return element.items;
                }
            );

            //Quantas vezes foi abastecido combustível nos postos
            const supplyQuantityLastWeek = itemsArrayLastWeek.flatMap((element) => {
                return element;
            });
            //Quantas vezes entraram carros e compraram no posto
            const quantTotalLastWeek = itemsArrayLastWeek.length;
            const quantSupplyLastWeek = supplyQuantityLastWeek.length;

            //Soma combustíveis tipo combustivel
            const fuelLastWeek = itemsArrayLastWeek
                .map((element) => {
                    if (element.iTip == "1") {
                        return parseFloat(element.tot);
                    }
                    return undefined;
                })
                .filter((item): item is number => item !== undefined);

            const sumFuelLastWeek = fuelLastWeek.reduce(
                (accumulator, currentValue) => {
                    return (accumulator || 0) + (currentValue || 0);
                },
                0
            );

            //Faturamento total combustível+produto
            const fuelTotalLastWeek = itemsArrayLastWeek
                .map((element) => {
                    return parseFloat(element.tot);
                })
                .filter((item): item is number => item !== undefined);

            const sumFuelTotalLastWeek = fuelTotalLastWeek.reduce(
                (accumulator, currentValue) => {
                    return (accumulator || 0) + (currentValue || 0);
                },
                0
            );

            //Soma da litragem tipo combustível
            const literageLastWeek = itemsArrayLastWeek
                .map((element) => {
                    if (element.iTip == "1") {
                        return parseFloat(element.qd);
                    }
                    return undefined;
                })
                .filter((item): item is number => item !== undefined);

            //Carros que entraram no posto
            const supplyLastWeek = itemsArrayLastWeek.map((element) => {
                return parseFloat(element.qd);
            }, 0);
            const sumSupplyLastWeek = supplyLastWeek.reduce(
                (accumulator, currentValue) => {
                    return (accumulator || 0) + (currentValue || 0);
                },
                0
            );
            const sumLiterageLastWeek = literageLastWeek.reduce(
                (accumulator, currentValue) => {
                    return (accumulator || 0) + (currentValue || 0);
                },
                0
            );
            //Soma do preço de custo do combustível
            const cost_priceLastWeek = itemsArrayLastWeek
                .map((element) => {
                    if (element.iTip === "1") {
                        return { pc: parseFloat(element.pC), qd: parseFloat(element.qd) };
                    }
                    return undefined;
                })
                .filter(
                    (item): item is { pc: number; qd: number } => item !== undefined
                );

            const sumCostPriceLastWeek = cost_priceLastWeek.reduce(
                (accumulator, currentValue) => {
                    return (
                        (accumulator || 0) + (currentValue.qd * currentValue.pc || 0)
                    );
                },
                0
            );

            //Soma combustíveis tipo produto
            const fuelProdLastWeek = itemsArrayLastWeek
                .map((element) => {
                    if (element.iTip == "0") {
                        return parseFloat(element.tot);
                    }
                    return undefined;
                })
                .filter((item): item is number => item !== undefined);

            const sumFuelProdLastWeek = fuelProdLastWeek.reduce(
                (accumulator, currentValue) => {
                    return (accumulator || 0) + (currentValue || 0);
                },
                0
            );

            //Soma da litragem tipo produto
            const literageProdLastWeek = itemsArrayLastWeek
                .map((element) => {
                    if (element.iTip == "0") {
                        return parseFloat(element.qd);
                    }
                    return undefined;
                })
                .filter((item): item is number => item !== undefined);

            const sumLiterageProdLastWeek = literageProdLastWeek.reduce(
                (accumulator, currentValue) => {
                    return (accumulator || 0) + (currentValue || 0);
                },
                0
            );
            //Soma do preço de custo do produto
            const product_priceLastWeek = itemsArrayLastWeek
                .map((element) => {
                    if (element.iTip === "0") {
                        return { pc: parseFloat(element.pC), qd: parseFloat(element.qd) };
                    }
                    return undefined;
                })
                .filter(
                    (item): item is { pc: number; qd: number } => item !== undefined
                );

            const sumProductPriceLastWeek = product_priceLastWeek.reduce(
                (accumulator, currentValue) => {
                    return (
                        (accumulator || 0) + (currentValue.pc * currentValue.qd || 0)
                    );
                },
                0
            );
            const monthBigNumbers =
                await prismaRedeFlex.big_numbers_values.findFirst({
                    select: {
                        bignumbers_fuelProfit: true,
                        bignumbers_fuelSales: true,
                        bignumbers_invoicing: true,
                        bignumbers_productProfit: true,
                        bignumbers_productSales: true,
                        bignumbers_sumliterage: true,
                        bignumbers_Supplies: true,
                        bignumbers_dailyProductProfit: true,
                        bignumbers_dailyLiterageProfit: true,
                    },
                    where: { bignumbers_uuid: "650f5af0-b341-4980-aad0-8617e53c41ec" },
                });

            //Criação array de objetos para comparação
            //{ name: "A galonagem da rede", dailyValue: Math.round(sumLiterage * 100) / 100, lastWeekValue: Math.round(sumLiterageLastWeek * 100) / 100 },
            const bigNumbers = [

                { name: "O faturamento de produto", dailyValue: Math.round(sumFuelProd * 100) / 100, lastWeekValue: Math.round(sumFuelProdLastWeek * 100) / 100 }
            ]
            const portugueseDateFormat = moment().locale('pt')
                .tz("America/Sao_Paulo")
                .subtract(7, "days")
                .format("dddd");
            const portugueseDate = portugueseDateFormat === "Sábado" || portugueseDateFormat === "Domingo" ?
                `do último ${portugueseDateFormat} neste mesmo horário.` : `da última ${portugueseDateFormat} neste mesmo horário.`



            bigNumbers.map(async (element: any) => {
                let ratioBelow = 100 - Math.round((element.dailyValue / element.lastWeekValue) * 100);
                let ratioAbove = Math.round((element.dailyValue / element.lastWeekValue) * 100) - 100
                const formattedDailyValue = element.dailyValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                let literageOrReal = element.name === "A galonagem da rede"
                    ? `${formattedDailyValue} litros`
                    : `R$ ${formattedDailyValue}`;

                let comparison = element.dailyValue < element.lastWeekValue
                    ? `agora está em ${literageOrReal}, estando ${ratioBelow}% abaixo`
                    : `agora está em ${literageOrReal}, estando ${ratioAbove}% acima`;
                // const arrayNumbers = [
                //     "+553192206401",
                //     "+553192932316",
                //     "+553199810900",
                //     "+553199821940",
                //     "+553195083008",
                //     "+553185275429",
                //     "+553185275423"
                // ];
                //, , , 
                const arrayNumbers = ["+553192206401", "+553192932316", "+553199821940", "+553195083008", "+553199810900"]

                for (const number of arrayNumbers) {
                    const chatId = number.substring(1) + "@c.us";
                    try {
                        await clientService.client.sendMessage(chatId, `*${element.name}* ${comparison} ${portugueseDate}⚠️`
                        );

                        console.log(`Mensagem enviada com sucesso!`);
                    } catch (error) {
                        console.error(`Erro ao enviar mensagem para ${number}:`, error);
                    }

                    await delay(3000);
                }

            });
            // const token = process.env.SAULOAPI;
            // const tableData = await axios.get(
            //     `http://159.65.42.225:3053/v2/dataframes?token=${token}`
            // );
            // const number = ["+553192932316", "+553199821940", "+553195083008", "+553199810900", "+553192206401"]
            // number.map(async (num) => {
            //     const tel = num.substring(1) + "@c.us";
            //     await clientService.client.sendMessage(tel, `${tableData.data["a_text_frentista"]}`
            //     );
            //     await delay(3000);
            // })

            return

        } catch (error) {
            console.error("Erro ao iniciar o Change Stream:", error);
            throw new Error();
        }
    }
    // }
    public agendarAlertaBigNumber() {
        // Agendar para 10,14,18,22 hrs
        cron.schedule("0 10,14,18,22 * * *", async () => {
            try {
                await this.bigNumbersAlerts();
            } catch (error) {
                console.error("Erro durante a verificação de alertas:", error);
            }
        },
            {
                timezone: "America/Sao_Paulo",
            }
        );
    }
    public agendarVerificacaoDeAlertas() {
        // Agende a função para ser executada todo fim do dia
        cron.schedule("59 23 * * *", async () => {
            try {
                await this.zeroRoutine();
            } catch (error) {
                console.error("Erro durante a verificação de alertas:", error);
            }
        },
            {
                timezone: "America/Sao_Paulo",
            }
        );
    }
    // public logAlert() {
    //     // Agende a função para ser executada todo fim do dia
    //     cron.schedule("0 * * * *", async () => {
    //         try {
    //             await this.zeroRoutine();
    //         } catch (error) {
    //             console.error("Erro durante a verificação de alertas:", error);
    //         }
    //     },
    //         {
    //             timezone: "America/Sao_Paulo",
    //         }
    //     );
    // }

}


export default new AlertsService();
