import { NameValue } from '../models/name-value';
import { HttpMethod } from './http-method';
import { IFormatConverter } from '../data-format/format-converter';
import { IDataMapper } from '../data-mapping/datamapper';

/**
 * represent an http request.
 */
export class RequestProvider {

  // the route of the url.
  private route: string[];

  // the params to include in the url.
  private params: NameValue[];

  // base url of the request.
  private _baseUrl: string;

  private _uniqueName: string;

  // the request body.
  private _body: any = null;

  // the constructed url.
  private _url: string = null;

  // the request type.
  private _requestType: HttpMethod;

  // response formats.
  private _responseFormats: IFormatConverter[];

  // response formats.
  private _requestFormat: IFormatConverter;

  // data mapper to be used to map the response into db actions.
  private _dataMapper: IDataMapper;

  // create a request after this one is completed
  private _chainedRequest: (resp: any) => RequestProvider = null;

  /**
   * get the response formats that this request can parse.
   */
  get responseFormats(): IFormatConverter[] {
    return this._responseFormats;
  }

  /**
   * get the format converter to parse the request body in the case of POST and PUT.
   */
  get requestFormat(): IFormatConverter {
    return this._requestFormat;
  }

  /**
   * get the request type asociated with this provider.
   */
  get requestType(): HttpMethod {
    return this._requestType;
  }

  /**
   * get the request body or null if is not available.
   */
  get body(): any {
    return this._body;
  }

  /**
   * get the data mapper asociated with this request.
   */
  get dataMapper(): IDataMapper {
    return this._dataMapper;
  }

  /**
  * get the url generated by this provider
  */
  get url(): string {

    if (!this._url) {
      //create the url
      let url = this.route.join('/');
      let parsedParams: string[] = [];

      this.params.forEach((v) => {
        parsedParams.push([v.name, v.value].join('='));
      });

      this._url = encodeURI(url + '?' + parsedParams.join('&'));
    }

    return this._url;

  }

  /**
   * get the unique name of the entity
   */
  get uniqueName() {
    return this._uniqueName;
  }

  /**
   * get the request to be executed after or null if there is not any.
   */
  get chainedRequest() {  
    return this._chainedRequest;
  }

  /**
   * get the base url of this request
   */
  get baseUrl() {
    return this._baseUrl;
  }

  constructor(uniqueName: string, baseUrl: string, route: string[], params: NameValue[], requestType: HttpMethod, body: any, responseFormats: IFormatConverter[], requestFormat: IFormatConverter, dataMapper: IDataMapper, chainedRequest: (resp: any) => RequestProvider = null ) {

    //clone arrays
    this.route = route.slice(0);
    this.params = params.slice(0);

    this._requestType = requestType;
    this._body = body;
    this._responseFormats = responseFormats;
    this._requestFormat = requestFormat;
    this._dataMapper = dataMapper;
    this._baseUrl = baseUrl;
    this._uniqueName = uniqueName;
    this._chainedRequest = chainedRequest;
  }

  //Start of the fluent api
  //-------------------------------------------------------------------------------------------------------

  /**
   * add a path param to the url.
   * @param param the param to add to the url.
   */
  at(param: string): RequestProvider {
    return new RequestProvider(this.uniqueName, this.baseUrl, this.route.concat(param), this.params, this._requestType, this._body, this._responseFormats, this._requestFormat, this._dataMapper);
  }

  /**
   * Add a query param to the url (only valid for GET and DELETE requests)
   * @param name the name of the parameter.
   * @param value the value of the parameter.
   */
  withParam(name: string, value: string): RequestProvider {
    if (this._requestType != 'GET' && this._requestType != 'DELETE')
      throw "query params are only valid for GET and DELETE requests.";

    return new RequestProvider(this.uniqueName, this.baseUrl, this.route, this.params.concat(new NameValue(name, value)), this._requestType, this._body, this._responseFormats, this._requestFormat, this._dataMapper);
  }

  /**
   * add body to the request (only valid for POST and PUT requests)
   * @param body the body to add
   */
  withBody(body: any): RequestProvider {
    if (this._requestType != 'POST' && this._requestType != 'PUT')
      throw "request body is only valid for POST and PUT requests.";

    if (this._body != null)
      throw "request body can only be assigned one time.";

    return new RequestProvider(this.uniqueName, this.baseUrl, this.route, this.params, this._requestType, body, this._responseFormats, this._requestFormat, this._dataMapper);
  }

  withRequestFormat(format: IFormatConverter): RequestProvider {
    if (this._requestType != 'POST' && this._requestType != 'PUT')
      throw "request format is only valid for POST and PUT requests.";

    return new RequestProvider(this.uniqueName, this.baseUrl, this.route, this.params, this._requestType, this._body, this._responseFormats, format, this._dataMapper);
  }

  /**
   * set the data mapper to be used in this request.
   * @param mapper data mapper to be used.
   */
  withDataMapper(mapper: IDataMapper) {
    return new RequestProvider(this.uniqueName, this.baseUrl, this.route, this.params, this._requestType, this._body, this._responseFormats, this.requestFormat, mapper);
  }

  then( req: (resp: any) => RequestProvider ) {
    return new RequestProvider(this.uniqueName, this.baseUrl, this.route, this.params, this._requestType, this._body, this._responseFormats, this.requestFormat, this.dataMapper, req);
  }

}
