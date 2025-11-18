import './util/module-alias';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';
import cors from 'cors';
import 'dotenv/config';
import router from './routes';
import cookieParser from "cookie-parser";

export class SetupApplication {
  private server?: Server;

  
  constructor(private port = 3000, public app = express()) { }
  
  public init(): void {
    this.setupExpress();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.use(router);
  }

  private setupExpress(): void {

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors({
      origin: [frontendUrl],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    }));
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}