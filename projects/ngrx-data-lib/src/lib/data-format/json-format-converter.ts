import { IFormatConverter } from './format-converter';
import { FormatDataType } from '../models/response-type';


export class JsonFormatConverter implements IFormatConverter
{

    getDataType(): FormatDataType {
        return FormatDataType.Json;
    }    
    
    getContentType(): string {
        return 'application/json';
    }

    convertToObject(data: any) : any {
        return data;
    }

    convertToData(obj: any) : any {
        return obj;
    }
}