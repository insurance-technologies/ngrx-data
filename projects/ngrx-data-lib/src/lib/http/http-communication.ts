/**
 * Helpers functions for http request with support for multiple response and request formats.
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IFormatConverter } from '../data-format/format-converter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestProvider } from './request-provider';
import { HttpMethod } from './http-method';
import { stringToUint } from '../data-format/tools';

/**
 * make http request using a request provider.
 * @param http the http client to be use.
 * @param baseUrl the base url for this request.
 * @param provider the request provider to be use for this http request.
 */
export function makeRequest(http: HttpClient, baseUrl: string, provider: RequestProvider) : Observable<any>
{
  //create the url
   let url = baseUrl + provider.url;
   switch(provider.requestType)
   {
     case HttpMethod.get:
       return getRequest(http, url, provider.responseFormats);

     case HttpMethod.post:
       return postRequest(http, url, provider.body, provider.requestFormat, provider.responseFormats);

       case HttpMethod.delete:
       return getRequest(http, url, provider.responseFormats);

     case HttpMethod.put:
       return putRequest(http, url, provider.body, provider.requestFormat, provider.responseFormats);
   }
}

/**
 * make a get request.
 * @param http the angular http client.
 * @param url the url of the endpoint.
 * @param formatsAcepted an array of the formats that can parse the response. 
 */
export function getRequest(http: HttpClient, url: string, formatsAcepted: IFormatConverter[]) : Observable<any>
{
   //create the headers
   let headers = new HttpHeaders();
   //add all the formats to the Accept header
   headers = headers.append('Accept', formatsAcepted.map(f=>f.getMediaType()) );
   
   //create the request
   return http.get(url, {
    headers: headers,
    observe: 'response',
    responseType: 'arraybuffer'
   }).pipe(map(response=>{
      
     //process response
     if(response.ok)
     {
        if(!response.body)
          throw 'response body not found';

        //get the content type of the response
        let contentType = response.headers.get("Content-Type");
        if(!contentType)
          throw 'response without content-type';

        //get the format converter asociated with this content type
        let contentTypeSplit = contentType.split(';');
        let mediaType = contentTypeSplit[0];
        let charset = contentTypeSplit[1] ? extractCharset(contentTypeSplit[1]) : 'utf-8';
        charset.trim();      

        let formatConverter = formatsAcepted.find(c=>c.getMediaType() == mediaType && c.getCharset() == charset);
        if(!formatConverter)
          throw "cant't find formatConverter for Content-Type: " + contentType;
          
        return formatConverter.convertToObject(response.body);
     }
     else     
        throw response.statusText;
     

   }));
}


/**
 * make a post request.
 * @param http the angular http client.
 * @param url the url of the endpoint.
 * @param body the body of the request.
 * @param requestFormat the format to use to parse the body request.
 * @param formatsAcepted an array of the formats that can parse the response. 
 */
export function postRequest(http: HttpClient, url: string, body: any, requestFormat: IFormatConverter, formatsAcepted: IFormatConverter[]) : Observable<any>
{
   let headers = new HttpHeaders();
   headers = headers.append('Accept', formatsAcepted.map(f=>f.getMediaType()) );
   //add the format content type
   headers = headers.append('Content-Type', `${requestFormat.getMediaType()}; charset=${requestFormat.getCharset()}`   );

   //convert the data to the format
   let dataBody = requestFormat.convertToData(body);

   //make the request
   return http.post(url, dataBody, {
    headers: headers,
    observe: 'response',
    responseType: 'arraybuffer'
   }).pipe(map(response=>{
      
     //process response
     if(response.ok)
     {
        if(!response.body)
        throw 'response body not found';
          
        //get the content type of the response
        let contentType = response.headers.get("Content-Type");
        if(!contentType)
        throw 'response without content-type';

        //get the format converter asociated with this content type
        let contentTypeSplit = contentType.split(';');
        let mediaType = contentTypeSplit[0];
        let charset = contentTypeSplit[1] ? extractCharset(contentTypeSplit[1]) : 'utf-8';
        charset.trim();      

        let formatConverter = formatsAcepted.find(c=>c.getMediaType() == mediaType && c.getCharset() == charset);
        if(!formatConverter)
        throw "cant't find formatConverter for Content-Type: " + contentType;
          
        return formatConverter.convertToObject(response.body);
     }
     else
     {
        throw response.statusText;
     }

   }));
}


/**
 * make a delete request.
 * @param http the angular http client.
 * @param url the url of the endpoint.
 * @param formatsAcepted an array of the formats that can parse the response. 
 */
export function deleteRequest(http: HttpClient, url: string, formatsAcepted: IFormatConverter[]) : Observable<any>
{
   let headers = new HttpHeaders();
   headers = headers.append('Accept', formatsAcepted.map(f=>f.getMediaType()) );

   return http.delete(url, {
    headers: headers,
    observe: 'response',
    responseType: 'arraybuffer'
   }).pipe(map(response=>{
      
     //process response
     if(response.ok)
     {
        if(!response.body)
          throw 'response body not found';

        //get the content type of the response
        let contentType = response.headers.get("Content-Type");
        if(!contentType)
          throw 'response without content-type';

        //get the format converter asociated with this content type
        let contentTypeSplit = contentType.split(';');
        let mediaType = contentTypeSplit[0];
        let charset = contentTypeSplit[1] ? extractCharset(contentTypeSplit[1]) : 'utf-8';
        charset.trim();      

        let formatConverter = formatsAcepted.find(c=>c.getMediaType() == mediaType && c.getCharset() == charset);
        if(!formatConverter)
          throw "cant't find formatConverter for Content-Type: " + contentType;
          
        return formatConverter.convertToObject(response.body);
     }
     else
      throw response.statusText;

   }));
}


/**
 * make a put request.
 * @param http the angular http client.
 * @param url the url of the endpoint.
 * @param body the body of the request.
 * @param requestFormat the format to use to parse the body request.
 * @param formatsAcepted an array of the formats that can parse the response. 
 */
export function putRequest(http: HttpClient, url: string, body: any, requestFormat: IFormatConverter, formatsAcepted: IFormatConverter[]) : Observable<any>
{
   let headers = new HttpHeaders();
   headers = headers.append('Accept', formatsAcepted.map(f=>f.getMediaType()) );
   //add the format content type
   headers = headers.append('Content-Type', `${requestFormat.getMediaType()}; charset=${requestFormat.getCharset()}`   );

   let dataBody = requestFormat.convertToData(body);

   return http.put(url, dataBody, {
    headers: headers,
    observe: 'response',
    responseType: 'arraybuffer'
   }).pipe(map(response=>{
      
     //process response
     if(response.ok)
     {
        if(!response.body)
          throw 'response body not found';
          
        //get the content type of the response
        let contentType = response.headers.get("Content-Type");
        if(!contentType)
          throw 'response without content-type';

        //get the format converter asociated with this content type
        let contentTypeSplit = contentType.split(';');
        let mediaType = contentTypeSplit[0];
        let charset = contentTypeSplit[1] ? extractCharset(contentTypeSplit[1]) : 'utf-8';
        charset.trim();      

        let formatConverter = formatsAcepted.find(c=>c.getMediaType() == mediaType && c.getCharset() == charset);
        if(!formatConverter)
          throw "cant't find formatConverter for Content-Type: " + contentType;
          
        return formatConverter.convertToObject(response.body);
     }
     else
      throw response.statusText;

   }));
}

function extractCharset(charset: string)
{
   let trimed = charset.trim();
   let splited = trimed.split('=');
   return splited[1];
}