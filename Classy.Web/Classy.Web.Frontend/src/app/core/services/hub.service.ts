import { Injectable } from '@angular/core';
import { 
    HubConnection, 
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel,
    HttpTransportType
} from '@aspnet/signalr';
import { Observable, from } from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export default class HubService {

    private API_PATH = environment.API_PATH;

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
