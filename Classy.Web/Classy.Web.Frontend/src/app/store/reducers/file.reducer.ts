import { UploadFile } from 'ngx-file-drop';
import { FileActions } from '../actions';

export type FileState = UploadFile[];

const initialState: FileState = [];

export function reducer(
    state: FileState = initialState,
    action: FileActions.FileActionsUnion
): FileState {
    switch (action.type) {
        case FileActions.receive.type: {
            return [...state, action.file ];
        }
        default: {
            return state;
        }
    }
}
