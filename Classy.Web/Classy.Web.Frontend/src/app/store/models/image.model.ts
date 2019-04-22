export interface Image {
  file: File;
  class?: string;
}

export interface FileClass {
  fileName: string;
  className: string;
}

export interface ClassyDataObject {
  [x: string]: string;
}

export const image2ClassyDataObject = (image: Image): ClassyDataObject => {
  return { [image.file.name]: image.class };
}
