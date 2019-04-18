import { Injectable } from '@angular/core';
import { 
    HubConnection, 
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel,
    HttpTransportType
} from '@aspnet/signalr';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export default class HubService {

    private API_PATH = 'https://localhost:44311/classy';

    getConnection(): HubConnection {
        return new HubConnectionBuilder()
            .configureLogging(LogLevel.Debug)
            .withUrl(this.API_PATH, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .build();
    }
    
}
