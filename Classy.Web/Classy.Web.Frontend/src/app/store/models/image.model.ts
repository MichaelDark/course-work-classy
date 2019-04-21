export interface Image {
  file: File;
  class?: string;
}

export interface FileClass {
  fileName: string;
  className: string;
}

export interface ClassyResponse {
  [x: string]: string;
}

export const classyResponse2FileClass = (classyResponse: ClassyResponse): FileClass => {
  const fileName = Object.keys(classyResponse)[0];
  const className = classyResponse[fileName];
  return { fileName, className };
}
