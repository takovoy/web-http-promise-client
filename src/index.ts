export class HTTPClient {
    private static contentTypes = {
        json: "application/json; charset=UTF-8"
    };

    private static makeRequest(
        url: string,
        method: string,
        payload: any,
        query: {[key: string]: string} = {},
        headers: {[key: string]: string} = {},
        responseType: XMLHttpRequestResponseType = "json"
    ) {
        const formattedHeaders = JSON.parse(JSON.stringify(headers));
        if (formattedHeaders["Content-Type"] && this.contentTypes[formattedHeaders["Content-Type"]]) {
            formattedHeaders["Content-Type"] = this.contentTypes[formattedHeaders["Content-Type"]];
        }
        return new Promise((resolve, reject) => {
            const request = new window["XMLHttpRequest"]();
            const queryString = Object.keys(query || {})
                .reduce((result, item) => result && `${result}&${item}=${query[item]}` || `?${item}=${query[item]}`, "");
            request.open(method.toUpperCase(), `${url}${queryString}`);
            Object.keys(formattedHeaders || {}).forEach(key => request.setRequestHeader(key, formattedHeaders[key]));
            request.responseType = responseType;
            request.send(payload);
            request.onreadystatechange = () => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status >= 400) {
                    reject(request);
                } else {
                    resolve(request);
                }
            };
        });
    }

    static get(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: XMLHttpRequestResponseType = "json",
    ) {
        let requestBody = payload;
        if (noCache) {
            query._ = Date.now().toString();
        }
        if (contentType === "json") {
            try {
                requestBody = JSON.stringify(payload);
            } catch (e) {
                return Promise.reject({ error: "Invalid request payload" });
            }
        }
        return this.makeRequest(url, "get", requestBody, query, { "Content-Type": contentType });
    }

    static post(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: XMLHttpRequestResponseType = "json",
    ) {
        let requestBody = payload;
        if (noCache) {
            query._ = Date.now().toString();
        }
        if (contentType === "json") {
            try {
                requestBody = JSON.stringify(payload);
            } catch (e) {
                return Promise.reject({ error: "Invalid request payload" });
            }
        }
        return this.makeRequest(url, "post", requestBody, query, { "Content-Type": contentType });
    }

    static put(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: XMLHttpRequestResponseType = "json",
    ) {
        let requestBody = payload;
        if (noCache) {
            query._ = Date.now().toString();
        }
        if (contentType === "json") {
            try {
                requestBody = JSON.stringify(payload);
            } catch (e) {
                return Promise.reject({ error: "Invalid request payload" });
            }
        }
        return this.makeRequest(url, "put", requestBody, query, { "Content-Type": contentType });
    }
}
