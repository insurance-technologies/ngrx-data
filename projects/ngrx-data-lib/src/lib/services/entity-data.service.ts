import { RequestProvider } from '../http/request-provider';
import { HttpMethod } from '../http/http-method';
import { IFormatConverter } from '../data-format/format-converter';
import { Observable } from 'rxjs';
import { makeRequest } from '../http/http-communication';
import { HttpClient } from '@angular/common/http';
import { NgrxDataConfigurationService } from './configuaration.service';
import { Injectable } from '@angular/core';

/**
 * Provide communication with extern resources providing support for multiple formats and a fluent api.
 */
@Injectable({
   providedIn: 'root'
})
export class DataService
{
    private _getProvider : RequestProvider;
    private _postProvider : RequestProvider;
    private _deleteProvider : RequestProvider;
    private _putProvider : RequestProvider;

    private deafaultRequestFormat: IFormatConverter;
    private deafaultResponseFormats: IFormatConverter[];

    /**
     * get the get request provider.
     */
    get GET(){ return this._getProvider; }
    
    /**
     * get the post request provider.
     */
    get POST(){ return this._postProvider; } 

    /**
     * get the delete request provider.
     */
    get DELETE(){ return this._deleteProvider; } 

    /**
     * get ht put request provider.
     */
    get PUT(){ return this._putProvider; } 
        
    /**
     * create a new instance of data service.
     * @param http the http client to use.
     * @param configurationService the configuration service.
     */
    constructor(private http: HttpClient, private configurationService: NgrxDataConfigurationService)
    {
       //Get the configuration parameters needed
       this.deafaultRequestFormat = this.configurationService.configuration.deafaultRequestFormat;
       this.deafaultResponseFormats = this.configurationService.configuration.deafaultResponseFormats;

       //get the default data mapper
       let defaultMapper = configurationService.configuration.dataMapper;

       //create the requests starting points
       this._getProvider = new RequestProvider([], [], HttpMethod.get, null, this.deafaultResponseFormats, null, defaultMapper);
       this._postProvider = new RequestProvider([], [], HttpMethod.post, null, this.deafaultResponseFormats, this.deafaultRequestFormat, defaultMapper);
       this._deleteProvider = new RequestProvider([], [], HttpMethod.delete, null, this.deafaultResponseFormats, null, defaultMapper);
       this._putProvider = new RequestProvider([], [], HttpMethod.put, null, this.deafaultResponseFormats, this.deafaultRequestFormat, defaultMapper);           
    }

    /**
     * make a http request with a given base url and a request provider.
     * @param baseUrl the base url of the request.
     * @param provider the request provider.
     * @returns returns an observable containing the data returned by the server.
     */
    makeRequest(baseUrl:string, provider: RequestProvider) : Observable<any>
    {
       let result = makeRequest(this.http, baseUrl, provider);
       return result;
    }
}