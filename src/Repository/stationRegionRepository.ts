import { PrismaClient as PrismaLBCBi } from '../../generated/clientLBCBi';
import { PrismaClient as PrismaSales, VendasItems } from '../../generated/clientSales';
import { PrismaClient as PrismaRedeFlex } from '../../generated/clientRedeFlex';
import clientService from '../Services/clientService';
import moment from 'moment-timezone';
import { MongoClient } from 'mongodb';
import { Request, Response } from 'express';
const prismaRedeFlex = new PrismaRedeFlex();
const prismaLBCBi = new PrismaLBCBi();
const prismaSales = new PrismaSales();

const pass = process.env.DATABASE_URLSALES;
let mongoClient: MongoClient;

if (pass) {
    mongoClient = new MongoClient(pass);
} else {
    console.error('DATABASE_URLSALES não está definido');
}
class stationRegionRepository {
    //Dados de região e posto
    public async gasStation() {
        try {
            const todayDateHour = moment.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

            const result = await prismaRedeFlex.gas_station_setvariables.findMany({
                select: {
                    gas_station_uuid: true,
                    gas_station_marginGC: true,
                    gas_station_margin_TOTAL_PRODUCT: true,
                    gas_station_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: true,
                    gas_station_margin_FILTROS_AR_PRODUCT: true,
                    gas_station_margin_ETANOL_COMUM: true,
                    gas_station_margin_GASOLINA_PREMIUM: true,
                    gas_station_margin_GASOLINA_PODIUM: true,
                    gas_station_margin_DIESEL_GROUP: true,
                    gas_station_margin_DIESEL_GROUP_S500: true,
                    gas_station_type_margin_GASOLINA_PREMIUM: true,
                    gas_station_type_margin_ETANOL_COMUM: true,
                    gas_station_type_marginGC: true,
                    gas_station_type_margin_GASOLINA_PODIUM: true,
                    gas_station_type_margin_DIESEL_GROUP: true,
                    gas_station_type_margin_DIESEL_GROUP_S500: true,
                    gas_station_type_margin_TOTAL_PRODUCT: true,
                    gas_station_type_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: true,
                    gas_station_type_margin_FILTROS_AR_PRODUCT: true,
                    gas_station_whats_app: true,
                    verification_hour_marginGC: true,
                    verification_hour_margin_ETANOL_COMUM: true,
                    verification_hour_margin_GASOLINA_PREMIUM: true,
                    verification_hour_margin_GASOLINA_PODIUM: true,
                    verification_hour_margin_DIESEL_GROUP: true,
                    verification_hour_margin_DIESEL_GROUP_S500: true,
                    verification_hour_margin_TOTAL_PRODUCT: true,
                    verification_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: true,
                    verification_hour_margin_FILTROS_AR_PRODUCT: true,
                    verification_msg_sent: true,
                    ibm_info: {
                        select: {
                            id: true,
                            nomefantasia: true,
                            ibm: true
                        },
                    },
                },
            });

            return result
        } catch (error) {
            console.error("Erro ao retornar os dados!", error);
            throw new Error("Erro ao retornar os dados!");
        }


    }
    public async regionStation() {
        try {
            const todayDateHour = moment.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

            const result = await prismaRedeFlex.region_setvariables.findMany({
                select: {
                    region_uuid: true,
                    region_marginGC: true,
                    region_margin_ETANOL_COMUM: true,
                    region_margin_GASOLINA_PREMIUM: true,
                    region_margin_DIESEL_GROUP: true,
                    region_margin_DIESEL_GROUP_S500: true,
                    region_type_marginGC: true,
                    region_type_margin_ETANOL_COMUM: true,
                    region_type_margin_GASOLINA_PREMIUM: true,
                    region_type_margin_DIESEL_GROUP: true,
                    region_type_margin_DIESEL_GROUP_S500: true,
                    region_margin_GASOLINA_PODIUM: true,
                    region_type_margin_GASOLINA_PODIUM: true,
                    region_whats_app: true,
                    verification_hour_marginGC: true,
                    verification_hour_margin_ETANOL_COMUM: true,
                    verification_hour_margin_GASOLINA_PREMIUM: true,
                    verification_hour_margin_GASOLINA_PODIUM: true,
                    verification_hour_margin_DIESEL_GROUP: true,
                    verification_hour_margin_DIESEL_GROUP_S500: true,
                    verification_msg_sent: true,
                    regions: {
                        select: {
                            regions_uuid: true,
                            regions_name: true,
                            regions_types: true
                        },
                    },
                },
            });

            return result
        } catch (error) {
            console.error("Erro ao retornar os dados!", error);
            throw new Error("Erro ao retornar os dados!");
        }


    }
    public async ibmInfo() {
        try {
            const result = await prismaRedeFlex.ibm_info.findMany({
                select: {
                    id: true, ibm: true, nomefantasia: true, ibm_margin_ETANOL_COMUM: true,
                    ibm_margin_GC: true
                }
            })
            return result

        } catch (error) {
            console.error("Erro ao retornar os dados!", error);
            throw new Error("Erro ao retornar os dados!");
        }

    }
    public async regions() {
        try {
            const result = await prismaRedeFlex.regions.findMany({
                select: {
                    regions_uuid: true, regions_name: true, regions_margin_GC: true, regions_margin_ETANOL_COMUM: true

                }
            })
            return result

        } catch (error) {
            console.error("Erro ao retornar os dados!", error);
            throw new Error("Erro ao retornar os dados!");
        }




    }
    // public async updateLogs() {
    //     try {



    //     } catch (error) {
    //         console.error("Erro ao retornar os dados!", error);
    //         throw new Error("Erro ao retornar os dados!");

    //     }
    // }






}

export default new stationRegionRepository()