import {HTTPClient, HTTPClientContentTypesEnum} from "./index";
import {XMLHttpRequestMock} from "./xhr.mock";
import {MockNamespace} from "./mock.namespace";

export class HttpClientMock extends HTTPClient {
    public static context: MockNamespace.MockContext = new MockNamespace.MockContext();

    public static getTransport() {
        return new XMLHttpRequestMock() as any
    }

    public static makeRequest<ResponseType>(
        url: string,
        method: string,
        payload: any,
        query: {[key: string]: string} = {},
        headers: {[key: string]: string} = {},
        responseType: XMLHttpRequestResponseType = "json"
    ): Promise<ResponseType> {
        this.context.call("makeRequest", arguments);
        return HTTPClient.makeRequest.call(this, arguments);
    }

    static get<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
        this.context.call("get", arguments);
        return HTTPClient.get.call(this, arguments);
    }

    static post<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
        this.context.call("post", arguments);
        return HTTPClient.post.call(this, arguments);
    }

    static put<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
        this.context.call("put", arguments);
        return HTTPClient.put.call(this, arguments);
    }
}