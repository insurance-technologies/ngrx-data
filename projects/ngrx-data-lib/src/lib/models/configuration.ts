import { IFormatConverter } from '../data-format/format-converter';
import { IDataMapper } from '../data-mapping/datamapper';
import { IFormatConverterFactory } from '../../public_api';


export interface NgrxDataConfiguration
{
    deafaultRequestFormat: IFormatConverterFactory;
    deafaultResponseFormats: IFormatConverterFactory[];
    dataMapper: IDataMapper;    
}