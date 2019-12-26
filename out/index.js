'use strict';Object.defineProperty(exports,'__esModule',{value:true});class HTTPClient{static makeRequest(url,method,payload,query={},headers={},responseType='json'){return new Promise((resolve,reject)=>{const request=new window['XMLHttpRequest']();const queryString=Object.keys(query||{}).reduce((result,item)=>result&&`${result}&${item}=${query[item]}`||`?${item}=${query[item]}`,'');request.open(method.toUpperCase(),`${url}${queryString}`);Object.keys(headers||{}).forEach(key=>request.setRequestHeader(key,headers[key]));request.responseType=responseType;request.send(payload);request.onreadystatechange=()=>{if(request.readyState!==4){return;}if(request.status>=400){reject(request);}else{resolve(request);}};});}static get(url,payload=null,query={},noCache=true,contentType='json'){let requestBody=payload;if(noCache){query._=Date.now().toString();}if(contentType==='json'){try{requestBody=JSON.stringify(payload);}catch(e){return Promise.reject({error:'Invalid request payload'});}}return this.makeRequest(url,'get',requestBody,query,{'Content-Type':contentType});}static post(url,payload=null,query={},noCache=true,contentType='json'){let requestBody=payload;if(noCache){query._=Date.now().toString();}if(contentType==='json'){try{requestBody=JSON.stringify(payload);}catch(e){return Promise.reject({error:'Invalid request payload'});}}return this.makeRequest(url,'post',requestBody,query,{'Content-Type':contentType});}static put(url,payload=null,query={},noCache=true,contentType='json'){let requestBody=payload;if(noCache){query._=Date.now().toString();}if(contentType==='json'){try{requestBody=JSON.stringify(payload);}catch(e){return Promise.reject({error:'Invalid request payload'});}}return this.makeRequest(url,'put',requestBody,query,{'Content-Type':contentType});}}exports.HTTPClient=HTTPClient;