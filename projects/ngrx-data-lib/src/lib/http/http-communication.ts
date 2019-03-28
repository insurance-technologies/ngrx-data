/**
 * Helpers functions for http request with support for multiple response and request formats.
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IFormatConverter } from '../data-format/format-converter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestProvider } from './request-provider';
import { HttpMethod } from './http-method';

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
       return postRequest(http, url, provider.body, provider.requestFormat, provider.responseFormats);
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
   headers.append('Accept', formatsAcepted.map(f=>f.getContentType()) );

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
          return null;

        //get the content type of the response
        let contentType = response.headers.get("Content-Type");
        if(!contentType)
          return null;

        //get the format converter asociated with this content type
        let formatConverter = formatsAcepted.find(c=>c.getContentType() == contentType);
        if(!formatConverter)
          return null;
          
        return formatConverter.convertToObject(response.body);
     }
     else
     {
        return null;
     }

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
   headers.append('Accept', formatsAcepted.map(f=>f.getContentType()) );
   //add the format content type
   headers.append('Content-Type', requestFormat.getContentType());

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
          return null;
          
        //get the content type of the response
        let contentType = response.headers.get("Content-Type");
        if(!contentType)
          return null;

        //get the format converter asociated with this content type
        let formatConverter = formatsAcepted.find(c=>c.getContentType() == contentType);
        if(!formatConverter)
          return null;
          
        return formatConverter.convertToObject(response.body);
     }
     else
     {
        return null;
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
   headers.append('Accept', formatsAcepted.map(f=>f.getContentType()) );

   return http.delete(url, {
    headers: headers,
    observe: 'response',
    responseType: 'arraybuffer'
   }).pipe(map(response=>{
      
     //process response
     if(response.ok)
     {
        if(!response.body)
          return null;

        //get the content type of the response
        let contentType = response.headers.get("Content-Type");
        if(!contentType)
          return null;

        //get the format converter asociated with this content type
        let formatConverter = formatsAcepted.find(c=>c.getContentType() == contentType);
        if(!formatConverter)
          return null;
          
        return formatConverter.convertToObject(response.body);
     }
     else
     {
        return null;
     }

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
   headers.append('Accept', formatsAcepted.map(f=>f.getContentType()) );

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
          return null;
          
        //get the content type of the response
        let contentType = response.headers.get("Content-Type");
        if(!contentType)
          return null;

        //get the format converter asociated with this content type
        let formatConverter = formatsAcepted.find(c=>c.getContentType() == contentType);
        if(!formatConverter)
          return null;
          
        return formatConverter.convertToObject(response.body);
     }
     else
     {
        return null;
     }

   }));
}