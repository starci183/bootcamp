import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(5001, { transports: ['websocket'] })
export class HelloGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private map = new Map();
    afterInit(server: Server) {
        console.log('Initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('Client connected');
        client.join('phong_cho');
    }
    
    handleDisconnect(client: Socket) {
        console.log('Client disconnected');
    }

    // server tong cua socket
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('join_room')
    handleJoinRoom(
        @ConnectedSocket() client: Socket,
         @MessageBody() { name}: { name: string}) {
            //client id laf ma id cua cai nguoi dung
            // de xu ly logic sau
        this.map.set(client.id, name);
        // tra ve tin nhan la nguoi name da join vao
        // client nay don gian la clien cua nguoi dung goi toi backend
        //client.join('room1');
        client.emit('joined');
        // server tong nay se emit tin hieu toi cho tat ca moi nguoi
        this.server.to('phong_cho').emit('co_nguoi_vao', name);

        this.server.to(this.map.get(client.id)).emit('co_nguoi_vao', name);
    }
}