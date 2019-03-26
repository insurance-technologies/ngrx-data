import { FormatDataType } from '../models/response-type';


export interface IFormatConverter
{
    /**
     * Get the data type
     */
    getDataType(): FormatDataType;

    /**
     * get the content type related to this object.
     */
    getContentType(): string;

    /**
     * convert the data to a javascript object. 
     * @param data the data to convert.
     */
    convertToObject(data: ArrayBuffer | Blob | Document | any | string) : any;

    /**
     * convert javascript object to data.
     * @param obj the javascript object to convert.
     */
    convertToData(obj: any) : ArrayBuffer | Blob | Document | any | string;   
}