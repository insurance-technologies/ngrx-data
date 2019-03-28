import { IFormatConverter } from './format-converter';
import { FormatDataType } from '../http/response-type';


export class JsonFormatConverter implements IFormatConverter
{
    getContentType(): string {
        return 'application/json; charset=utf-8';
    }

    convertToObject(data: ArrayBuffer) : any {
        let str = uintToString(new Uint8Array(data));
        return JSON.parse(str);
    }

    convertToData(obj: any) : ArrayBuffer {
        let str = JSON.stringify(obj);
        return stringToUint(str).buffer as ArrayBuffer;
    }
}

//copied from stack overflow https://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
function stringToUint(string) {
    var str = btoa(unescape(encodeURIComponent(string))),
        charList = string.split(''),
        uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}

function uintToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}