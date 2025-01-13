import { Request, Response } from "express";
import alertsService from "../Services/alertsService";

class AlertController {
    public async changeStream() {
        try {
            await alertsService.changeStream();
            console.log('Change Stream iniciado com sucesso!');
        } catch (error) {
            console.error('Os dados não foram retornados:', error);

        }
    }
    public async triggerPostgres() {
        try {
            await alertsService.triggerPostgres();
            console.log('Conexão com o Postgresql efetuada com sucesso!');
        } catch (error) {
            console.error('Os dados não foram retornados:', error);

        }

    }
    public async dataSumMongotoPostgresql() {
        try {
            await alertsService.dataSum();
            console.log('Change Stream iniciado com sucesso!');
        } catch (error) {
            console.error('Os dados não foram retornados:', error);

        }
    }
    public async routineZero() {
        try {
            await alertsService.agendarVerificacaoDeAlertas();
            console.log('Rotina executada com sucesso!');
        } catch (error) {
            console.error('Erro:', error);

        }
    }
    public async bigNumbers() {
        try {
            await alertsService.agendarAlertaBigNumber();
            console.log('Rotina executada com sucesso!');
        } catch (error) {
            console.error('Erro:', error);

        }
    }
    public async errorDocumentation() {
        try {
            await alertsService.errorDoc();
            console.log('Monitoramento iniciado com sucesso!');
        } catch (error) {
            console.error('Os dados não foram retornados:', error);

        }
    }

}

export default new AlertController();
