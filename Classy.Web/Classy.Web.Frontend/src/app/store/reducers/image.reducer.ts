import { ImageActions } from '../actions';

export type ImageState = Array<{
    file: File
}>;

const initialState: ImageState = [];

export function reducer(
    state: ImageState = initialState,
    action: ImageActions.ImageActionsUnion
): ImageState {
    switch (action.type) {
        case ImageActions.receive.type: {
            return [...state, { file: action.file }];
        }
        default: {
            return state;
        }
    }
}
