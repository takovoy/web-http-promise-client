export namespace XHRMockNamespace {
    class MockContextCaller {
        private counter = 0;
        private callsArgumentsList: IArguments[] = [];

        constructor(public methodName: string) {}

        getCallsCount(): number {
            return this.counter;
        }

        getArguments(callIndex: number) {
            return this.callsArgumentsList[callIndex];
        }

        getAllArguments() {
            return this.callsArgumentsList;
        }

        public increase(args: IArguments) {
            this.callsArgumentsList[this.counter] = args;
            this.counter = this.counter + 1;
        }
    }

    class MockContext {
        private calls: MockContextCaller[] = [];
        private instances: any[] = [];

        public call(methodName: string, args: IArguments) {
            let call = this.calls.find(caller => caller.methodName === methodName);
            if (!call) {
                call = new MockContextCaller(methodName);
                this.calls.push(call);
            }
            call.increase(args);
        }

        public getMethodCalls(methodName: string) {
            return this.calls.find(caller => caller.methodName === methodName);
        }

        public getAllCalls(methodName: string) {
            return this.calls;
        }

        public addInstance(instance: any) {
            this.instances.push(instance);
        }

        public getInstances() {
            return this.instances;
        }

        public clear(): void {
            this.calls = [];
            this.instances = [];
        }
    }

    export class XMLHttpRequestMock {
        public static context: MockContext = new MockContext();

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
}
