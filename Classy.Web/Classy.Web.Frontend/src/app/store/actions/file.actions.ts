import { createAction, union, props } from '@ngrx/store';
import { UploadFile } from 'ngx-file-drop';

export const save = createAction(
    '[File] Save',
    props<{ file: UploadFile }>()
);

const all = union({ save });
export type FileActionsUnion = typeof all;
