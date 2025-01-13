import express from 'express';
import clientController from './Controllers/clientController';
import clientService from './Services/clientService';
import alertRoutes from '../routes/alerts';
import alertsController from './Controllers/alertsController';
const app = express();
const HOST = 8181;
import { MongoClient } from 'mongodb';
const pass = process.env.DATABASE_URLSALES;
let mongoClient: any
if (pass) {
    mongoClient = new MongoClient(pass);

} else {

    console.error('DATABASE_URLSALES não está definido');
}

app.use(express.json());
app.use(alertRoutes)
app.listen(HOST, async () => {
    console.log(`O servidor está rodando na porta ${HOST}`);

    try {
        // await alertsController.triggerPostgres()
        // await alertsController.dataSumMongotoPostgresql()
        // // await alertsController.changeStream()
        // await new Promise(resolve => setTimeout(resolve, 5000));
        await clientService.clientServer();
        await alertsController.bigNumbers()
        // await alertsController.errorDocumentation()
        // await alertsController.routineZero()
    } catch (error) {
        console.error('Erro ao inicializar o cliente WhatsApp:', error);
    }
});
process.on('SIGINT', async () => {
    try {
        await mongoClient.close();
        console.log('Conexões fechadas com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('Erro ao fechar as conexões:', error);
        process.exit(1);
    }
});
