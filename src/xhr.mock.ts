import {MockNamespace} from "./mock.namespace";

export class XMLHttpRequestMock {
    public static context: MockNamespace.MockContext = new MockNamespace.MockContext();

    constructor() {
        XMLHttpRequestMock.context.addInstance(this);
    }

    public status: number;
    public readyState: number;

    public set responseType(value: string) {
        XMLHttpRequestMock.context.call("responseType", arguments);
    }

    public open(method: string, url: string) {
        XMLHttpRequestMock.context.call("open", arguments);
    }

    public setRequestHeader(headerName: string, headerValue: string) {
        XMLHttpRequestMock.context.call("setRequestHeader", arguments);
    }

    public send(payload: any) {
        XMLHttpRequestMock.context.call("send", arguments);
    }
}
