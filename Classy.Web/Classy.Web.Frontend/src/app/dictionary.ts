export class imgFile {
  base64string: string;
  imgName: string;
  constructor(base64string: string, imgName: string) {
    this.base64string = base64string;
    this.imgName = imgName;
  }
}

export class DictionaryItem {
  imgClass: String;
  imgFiles: imgFile[];
  constructor(imageClass: string) {
    this.imgClass = imageClass;
    this.imgFiles = [];
  }
}

export class Dictionary {
  dict: DictionaryItem[] = [];

  public addImage(imageClass: string, imageFile: imgFile) {
    for (var item of this.dict) {
      //console.log(item);
      if(item.imgClass === imageClass) {
        item.imgFiles.push(imageFile);
        console.log(this.dict);
        return;
      }
    }
    const dictionaryItem = new DictionaryItem(imageClass);
    dictionaryItem.imgFiles.push(imageFile);
    this.dict.push(dictionaryItem);
    console.log(this.dict);
  }

}

export interface JsonImage {
  image: string;
}
