import { SetupApplication } from './app';
import 'dotenv/config';
import { connectMongo } from './app/database/mongo';

class Server {
    static start(): void {
        const port = parseInt(process.env.PORT!) || 3333;
        const application = new SetupApplication(port);
        application.init();
        application.start();
    }
}

connectMongo();
Server.start();