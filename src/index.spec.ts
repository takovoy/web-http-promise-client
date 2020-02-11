import {expect} from "chai";
import "mocha";
import {HTTPClient} from "./index";
import {XHRMockNamespace} from "./xhr-mock.namespace";
import XMLHttpRequestMock = XHRMockNamespace.XMLHttpRequestMock;

HTTPClient.getTransport = () => {
    return new XMLHttpRequestMock() as any
};

describe("HTTPClient tests", () => {
    beforeEach(() => {
        XMLHttpRequestMock.context.clear();
    });

    describe("makeRequest method tests", () => {
        it("should call open xhr method once", function () {
            HTTPClient.makeRequest("someUrl", "get", null);
            const caller = XMLHttpRequestMock.context.getMethodCalls("open");
            expect(caller.getCallsCount()).equal(1, "Count of \"open\" method's calls is not equal 1");
        });

        it("should correctly set request's method and url", function () {
            HTTPClient.makeRequest("someTestUrl", "GET", null);
            const caller = XMLHttpRequestMock.context.getMethodCalls("open");
            const args = caller.getArguments(0);
            expect(args[0]).equal("GET", "Request's method is not equal original value");
            expect(args[1]).equal("someTestUrl", "Request's url is not equal original value");
        });

        it("should set upper request method's cases", function () {
            HTTPClient.makeRequest("someUrl", "get", null);
            const caller = XMLHttpRequestMock.context.getMethodCalls("open");
            const args = caller.getArguments(0);
            expect(args[0]).equal("GET", "Request's method is not upper cased");
        });

        it("should set query parameters", function () {
            HTTPClient.makeRequest("someUrl", "get", null, {param1: "value1", param2: "value2"});
            const caller = XMLHttpRequestMock.context.getMethodCalls("open");
            const args = caller.getArguments(0);
            expect(args[1]).equal("someUrl?param1=value1&param2=value2", "Count of \"responseType\" sets is not equal 1");
        });

        it("should set request headers", function () {
            HTTPClient.makeRequest("someUrl", "get", null, null, {
                header1: "headerValue1",
                header2: "headerValue2",
            });
            const caller = XMLHttpRequestMock.context.getMethodCalls("setRequestHeader");
            const argsList = caller.getAllArguments();
            expect(argsList[0][0]).equal("header1");
            expect(argsList[0][1]).equal("headerValue1");
            expect(argsList[1][0]).equal("header2");
            expect(argsList[1][1]).equal("headerValue2");
        });

        it("should set response type once", function () {
            HTTPClient.makeRequest("someUrl", "get", null);
            const caller = XMLHttpRequestMock.context.getMethodCalls("responseType");
            expect(caller.getCallsCount()).equal(1, "Count of \"responseType\" sets is not equal 1");
        });

        it("should call 'send' method once", function () {
            HTTPClient.makeRequest("someUrl", "get", null);
            const caller = XMLHttpRequestMock.context.getMethodCalls("send");
            expect(caller.getCallsCount()).equal(1, "Count of \"send\" method calls is not equal 1");
        });

        it("should call 'send' with the same payload as in call", function () {
            HTTPClient.makeRequest("someUrl", "get", "some payload");
            const caller = XMLHttpRequestMock.context.getMethodCalls("send");
            const args = caller.getArguments(0);
            expect(args[0]).equal("some payload", "Payload is not equal original value");
        });
    });
});