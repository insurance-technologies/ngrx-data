import { IFormatConverter } from './format-converter';
import { FormatDataType } from '../http/response-type';
import { uintToString, stringToUint } from './tools';


export class JsonFormatConverter implements IFormatConverter
{
    getMediaType(): string {
        return 'application/json';
    }

    getCharset(): string {
        return 'utf-8';
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

const jsonFormatConverter = new JsonFormatConverter();

export function jsonFormatConverterFactory() : IFormatConverter
{
    return jsonFormatConverter;
}