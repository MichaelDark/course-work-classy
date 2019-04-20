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
    case ImageActions.sendToServer.type: {
      return state;
    }
    case ImageActions.clearClassificationStorage.type: {
      return state;
    }
    default: {
      return state;
    }
  }
}
