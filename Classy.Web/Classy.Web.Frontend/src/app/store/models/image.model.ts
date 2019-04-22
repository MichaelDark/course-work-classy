import { Observable, Subscriber } from 'rxjs';

export interface Image {
  file: File;
  class?: string;
  base64?: string;
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
};

export const classyDataObject2fileClass = (classyDataObject: ClassyDataObject): FileClass => {
  const fileName = Object.keys(classyDataObject)[0];
  const className = classyDataObject[fileName];
  return { fileName, className };
};

export const readFile = (blob: Blob): Observable<string>=> Observable.create((subscriber: Subscriber<string>) => {
  const reader = new FileReader();

  reader.onerror = err => subscriber.error(err);
  reader.onabort = err => subscriber.error(err);
  reader.onload = () => subscriber.next(reader.result.toString());
  reader.onloadend = () => subscriber.complete();

  return reader.readAsDataURL(blob);
});

export const file2ImageWithBase64 = (file: File): Promise<{ file: File, base64: string }> => {
  return readFile(file)
    .toPromise()
    .then((base64: string) => ({ file, base64 }))
};
