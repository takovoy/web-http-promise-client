export namespace MockNamespace {
    export class MockContextCaller {
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

    export class MockContext {
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
}
