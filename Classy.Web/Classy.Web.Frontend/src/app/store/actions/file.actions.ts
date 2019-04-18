import { createAction, union, props } from '@ngrx/store';
import { UploadFile } from 'ngx-file-drop';

export const receive = createAction(
    '[File] Receive',
    props<{ file: UploadFile }>()
);

const all = union({ receive });
export type FileActionsUnion = typeof all;
