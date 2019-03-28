import { FormatDataType } from '../http/response-type';


export interface IFormatConverter
{
    /**
     * get the content type related to this object.
     */
    getContentType(): string;

    /**
     * convert the data to a javascript object. 
     * @param data the data to convert.
     */
    convertToObject(data: ArrayBuffer) : any;

    /**
     * convert javascript object to data.
     * @param obj the javascript object to convert.
     */
    convertToData(obj: any) : ArrayBuffer;   
}