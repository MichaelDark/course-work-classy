import { UploadFile } from 'ngx-file-drop';
import { Injectable } from '@angular/core';
import { FileActions } from '@classy/store/actions/index.ts';
import { of, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import HubService from '@classy/core/services/hub.service';

@Injectable()
export class FileEffects {

    @Effect({ dispatch: false })
    sendFiles$ = this.actions$.pipe(
        ofType(FileActions.receive.type),
        map((action: any) => action.file),
        tap(file => {
            const connection = this.hubService.getConnection();
            connection.start().then(() => {
                connection.send('SendTest', '1', '2', '3');
            });
        })
    );
    
    constructor(
        private actions$: Actions,
        private hubService: HubService
    ) { }

}
