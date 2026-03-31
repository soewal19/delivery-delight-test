import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Observable, from, map } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, OnModuleDestroy {
  @WebSocketServer()
  server: Server;

  private healthCheckInterval: NodeJS.Timeout;

  constructor(private readonly prisma: PrismaService) {}

  afterInit(server: Server) {
    // Check DB connection status every 30 seconds
    this.healthCheckInterval = setInterval(async () => {
      const isDbHealthy = await this.checkDbHealth();
      if (this.server) {
        this.server.emit('db_status', { isHealthy: isDbHealthy });
      }
    }, 30000);
  }

  onModuleDestroy() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const isDbHealthy = await this.checkDbHealth();
    client.emit('db_status', { isHealthy: isDbHealthy });
    client.emit('socket_status', { isHealthy: true });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping')
  handlePing(): WsResponse<string> {
    return { event: 'pong', data: new Date().toISOString() };
  }

  private async checkDbHealth(): Promise<boolean> {
    try {
      await this.prisma.$connect();
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}
