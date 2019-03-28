import { IFormatConverter } from '../data-format/format-converter';



export interface NgrxDataConfiguration
{
    deafaultRequestFormat: IFormatConverter;
    deafaultResponseFormats: IFormatConverter[];
}