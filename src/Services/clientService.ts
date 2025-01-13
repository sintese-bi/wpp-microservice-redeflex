import express from 'express';
import pkg, { MessageMedia, NoAuth } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";

import dotenv from 'dotenv';
dotenv.config();
const { Client, LocalAuth } = pkg;

class ClientService {
    public client: any;

    public async clientServer() {
        try {
            const path = process.env.ROTA;
            this.client = new Client({
                webVersionCache: {
                    type: "remote",
                    remotePath:
                        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.24.7.72.html",
                },
                puppeteer: {
                    headless: true,
                    executablePath: path,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-accelerated-2d-canvas',
                        '--disable-gpu',
                        '--window-size=800,600',
                        '--disable-application-cache', 
                        '--disk-cache-size=0', 
                        '--media-cache-size=0'
                    ],
                },
                authStrategy: new LocalAuth({ dataPath: ".wwebjs_auth" }),
            });

            this.client.on('qr', (qr: string) => {
                qrcode.generate(qr, { small: true });
            });

            this.client.on('ready', () => {
                console.log('Client is ready!')
            });

            await this.client.initialize();
        } catch (err) {
            console.error('Error initializing client:', err);
            throw err;
        }
    }
}

export default new ClientService();
