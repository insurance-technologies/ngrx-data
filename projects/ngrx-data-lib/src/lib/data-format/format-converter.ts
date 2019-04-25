import { FormatDataType } from '../http/response-type';


export interface IFormatConverter
{
    /**
     * return the media type supported by this format.
     */
    getMediaType(): string;

    /**
     * return the charsets supported by this format converter.
     */
    getCharset(): string;

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