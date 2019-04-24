import { IFormatConverter } from './format-converter';
import { FormatDataType } from '../http/response-type';
import { uintToString, stringToUint } from './tools';


export class TextFormatConverter implements IFormatConverter
{
    getContentType(): string {
        return 'text/plain; charset=utf-8';
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
