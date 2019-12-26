# web-http-promise-client
Frontend library - HTTP promise client

There are few static rest methods (get, post, put)

Example:

```javascript
import { HTTPClient } from "web-http-promise-client/out/index";

// payload, query, noCache, contentType - are not required arguments
HTTPClient.get("yourAwesomeURL", payload, query, noCache, contentType)
    .then(response => console.log(response))
    .catch(xhrObject => console.log(xhrObject));

// post and put methods have the same signature
HTTPClient.post("yourAwesomeURL", payload, query, noCache, contentType);
HTTPClient.put("yourAwesomeURL", payload, query, noCache, contentType);
```