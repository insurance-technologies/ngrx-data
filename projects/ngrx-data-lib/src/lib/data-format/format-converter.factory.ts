import { IFormatConverter } from './format-converter';


export interface IFormatConverterFactory
{
    () : IFormatConverter;
}