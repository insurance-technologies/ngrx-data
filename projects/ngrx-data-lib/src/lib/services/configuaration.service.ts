import { Injectable, Inject } from "@angular/core";
import { NgrxDataConfiguration } from '../models/configuration';
import { config } from 'rxjs';


@Injectable()
export class NgrxDataConfigurationService
{
    /**
     * get the default configuration.
     */
    get configuration(): NgrxDataConfiguration
    {
        return this.config;
    }

    constructor(@Inject('ngrxdataConfig') private config: NgrxDataConfiguration )
    {
        
    }
}