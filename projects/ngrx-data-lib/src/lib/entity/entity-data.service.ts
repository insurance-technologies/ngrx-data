import { RequestProvider } from '../http/request-provider';
import { HttpMethod } from '../http/http-method';
import { IFormatConverter } from '../data-format/format-converter';
import { Observable } from 'rxjs';
import { makeRequest } from '../http/http-communication';
import { HttpClient } from '@angular/common/http';

export class DataService
{
    private _getProvider : RequestProvider;
    private _postProvider : RequestProvider;
    private _deleteProvider : RequestProvider;
    private _putProvider : RequestProvider;

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
     * @param entityBaseUrl the base url.
     * @param deafaultRequestFormat the default format to use in the request body.
     * @param deafaultResponseFormats the default supported formats in the response.
     */
    constructor(public qualifiedName: string, private http: HttpClient, private entityBaseUrl: string, deafaultRequestFormat: IFormatConverter, deafaultResponseFormats: IFormatConverter[])
    {
       this._getProvider = new RequestProvider([], [], HttpMethod.get, null, deafaultResponseFormats, null);
       this._postProvider = new RequestProvider([], [], HttpMethod.post, null, deafaultResponseFormats, deafaultRequestFormat);
       this._deleteProvider = new RequestProvider([], [], HttpMethod.delete, null, deafaultResponseFormats, null);
       this._putProvider = new RequestProvider([], [], HttpMethod.put, null, deafaultResponseFormats, deafaultRequestFormat);           
    }

    /**
     * make an http request with a given provider.
     * @param provider the provider.
     */
    makeRequest(provider: RequestProvider) : Observable<any>
    {
       let result = makeRequest(this.http, this.entityBaseUrl, provider);
       return result;
    }
}