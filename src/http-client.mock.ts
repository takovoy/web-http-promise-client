import {HTTPClient, HTTPClientContentTypesEnum} from "./index";
import {XMLHttpRequestMock} from "./xhr.mock";
import {MockNamespace} from "test-mock.namespace";

export class HttpClientMock {
    public context: MockNamespace.MockContext = new MockNamespace.MockContext();
    private contentTypes: {[key: string]: string} = {
        json: "application/json; charset=UTF-8",
        html: "text/html; charset=utf-8",
        text: "text/plain; charset=utf-8",
    };

    constructor(private payload: any) {}

    public getTransport() {
        const transportInstance = new XMLHttpRequestMock();
        this.context.addInstance(transportInstance);
        return transportInstance as any
    }

    public makeRequest<ResponseType>(
        url: string,
        method: string,
        payload: any,
        query: {[key: string]: string} = {},
        headers: {[key: string]: string} = {},
        responseType: XMLHttpRequestResponseType = "json"
    ): Promise<ResponseType> {
        this.context.call("makeRequest", arguments);
        return HTTPClient.makeRequest.apply(this, arguments)
            .then(() => this.payload);
    }

    public get<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
        this.context.call("get", arguments);
        return HTTPClient.get.apply(this, arguments)
            .then(() => this.payload);
    }

    public post<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
        this.context.call("post", arguments);
        return HTTPClient.post.apply(this, arguments)
            .then(() => this.payload);
    }

    public put<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
        this.context.call("put", arguments);
        return HTTPClient.put.apply(this, arguments)
            .then(() => this.payload);
    }
}