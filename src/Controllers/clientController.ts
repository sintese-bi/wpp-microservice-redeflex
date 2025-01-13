import { Request, Response } from "express";
import clientService from "../Services/clientService";
class clientController {
    public async clientWpp(req: Request, res: Response) {
        try {
            await clientService.clientServer();
            
            res.status(200).send('WhatsApp client initialized successfully');
        } catch (error) {
            console.error('Error initializing WhatsApp client:', error);
            res.status(500).send('Failed to initialize WhatsApp client');
        }
    }
}

export default new clientController();