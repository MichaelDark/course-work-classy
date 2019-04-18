import { Injectable } from '@angular/core';
import { 
    HubConnection, 
    HubConnectionBuilder, 
    LogLevel,
    HttpTransportType
} from '@aspnet/signalr';

@Injectable({
    providedIn: 'root'
})
export default class HubService {

    private API_PATH = 'https://localhost:44311/classy';

    private connection: HubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl(this.API_PATH, {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
        .build();

    send(methodName: string, ...args: any[]): Promise<void> {
        return this.connection.send(methodName, ...args);
    }
    
}
