import { ImageActions } from '../actions';
import { Image, FileClass, ClassyDataObject } from '../models';

export type ImageState = Array<Image>;

const initialState: ImageState = [];

export function reducer(
  state: ImageState = initialState,
  action: ImageActions.ImageActionsUnion
): ImageState {
  switch (action.type) {
    case ImageActions.receive.type: {
      return [ ...state, { file: action.file } ];
    }
    case ImageActions.assignClass.type: {
      console.log('assign class ', action.fileClass.fileName, action.fileClass.className);
      let images = [ ...state ];
      let index = images.findIndex(im => im.file.name === action.fileClass.fileName);
      images[index].class = action.fileClass.className;
      return images;
    }
    default: {
      return state;
    }
  }
}
