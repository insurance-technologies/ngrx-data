import { IFormatConverter } from '../data-format/format-converter';
import { IDataMapper } from '../data-mapping/datamapper';



export interface NgrxDataConfiguration
{
    deafaultRequestFormat: IFormatConverter;
    deafaultResponseFormats: IFormatConverter[];
    dataMapper: IDataMapper;
    dbName?: string;
}