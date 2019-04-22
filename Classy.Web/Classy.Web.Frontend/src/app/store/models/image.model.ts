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

export const image2classyDataObject = (image: Image): ClassyDataObject => {
  return { [image.file.name]: image.class };
}

export const classyDataObject2fileClass = (classyDataObject: ClassyDataObject): FileClass => {
  const fileName = Object.keys(classyDataObject)[0];
  const className = classyDataObject[fileName];
  return { fileName, className };
}
