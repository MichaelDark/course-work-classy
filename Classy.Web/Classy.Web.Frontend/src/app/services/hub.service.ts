import { Injectable } from '@angular/core';
import { 
    HubConnection, 
    HubConnectionBuilder, 
    LogLevel,
    HttpTransportType
} from '@aspnet/signalr';

@Injectable()
export default class HubService {

    connection: HubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl('https://localhost:44311/classy', {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .build();

    send(methodName: string, ...args: any) {
        this.connection.send(methodName, ...args);
    }

}
