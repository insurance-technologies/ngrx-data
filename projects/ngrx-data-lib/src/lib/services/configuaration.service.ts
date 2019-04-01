import { Injectable, Inject } from "@angular/core";
import { NgrxDataConfiguration } from '../models/configuration';
import { config } from 'rxjs';
import { RequestProvider } from '../http/request-provider';

@Injectable({
    providedIn: 'root'
 })
export class NgrxDataConfigurationService
{
    private requestProviders: { [uid: string]: RequestProvider } = {};

    /**
     * get the default configuration.
     */
    get configuration(): NgrxDataConfiguration
    {
        return this.config;
    }

    injectRequestProvider(uuid: string, provider: RequestProvider)
    {
       this.requestProviders[uuid] = provider;
    }

    deleteRequestProvider(uuid: string)
    {
        this.requestProviders[uuid] = undefined;
    }

    getRequestProvider(uuid: string)
    {
        return this.requestProviders[uuid];
    }

    constructor(@Inject('ngrxdataConfig') private config: NgrxDataConfiguration )
    {
        
    }
}