import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable()
export default class HubService {

    connection: signalR.HubConnection;

}
