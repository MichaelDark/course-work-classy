import { ImageActions } from '../actions';
import { Image } from '../models';

export type ImageState = Array<Image>;

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
    case ImageActions.classificationResponse.type: {
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
