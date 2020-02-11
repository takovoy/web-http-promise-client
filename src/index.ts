enum HTTPClientContentTypesEnum {
    json = "json",
    html = "html",
    text = "text",
}

export class HTTPClient {
    private static contentTypes: {[key: string]: string} = {
        json: "application/json; charset=UTF-8",
        html: "text/html; charset=utf-8",
        text: "text/plain; charset=utf-8",
    };

    public static getTransport() {
        return new window["XMLHttpRequest"]();
    }

    public static makeRequest<ResponseType>(
        url: string,
        method: string,
        payload: any,
        query: {[key: string]: string} = {},
        headers: {[key: string]: string} = {},
        responseType: XMLHttpRequestResponseType = "json"
    ): Promise<ResponseType> {
        const formattedHeaders = JSON.parse(JSON.stringify(headers));
        if (formattedHeaders["Content-Type"] && this.contentTypes[formattedHeaders["Content-Type"]]) {
            formattedHeaders["Content-Type"] = this.contentTypes[formattedHeaders["Content-Type"]];
        }
        return new Promise((resolve, reject) => {
            const request = this.getTransport();
            const params = new URLSearchParams();
            Object.keys(query || {}).forEach(key => params.append(key, query[key]));
            request.open(method.toUpperCase(), `${url}${query && Object.keys(query).length ? `?${params}` : ""}`);
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
                    resolve(request.response);
                }
            };
        });
    }

    static get<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
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
        return this.makeRequest<ResponseType>(url, "get", requestBody, query, { "Content-Type": contentType });
    }

    static post<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
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
        return this.makeRequest<ResponseType>(url, "post", requestBody, query, { "Content-Type": contentType });
    }

    static put<ResponseType>(
        url: string,
        payload: any = null,
        query: {[key: string]: string} = {},
        noCache: boolean = true,
        contentType: HTTPClientContentTypesEnum = HTTPClientContentTypesEnum.json,
    ): Promise<ResponseType> {
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
        return this.makeRequest<ResponseType>(url, "put", requestBody, query, { "Content-Type": contentType });
    }
}
