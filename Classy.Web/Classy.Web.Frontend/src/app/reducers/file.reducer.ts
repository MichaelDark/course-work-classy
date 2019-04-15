import { UploadFile } from 'ngx-file-drop';
import { FileActions } from './../actions';

export type State = UploadFile[];

const initialState: State = [];

export function reducer(
    state: State = initialState,
    action: FileActions.FileActionsUnion
): State {
    switch (action.type) {
        case FileActions.save.type: {
            return [...state, action.file ];
        }
        default: {
            return state;
        }
    }
}
