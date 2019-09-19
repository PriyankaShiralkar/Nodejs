const querystring =require('querystring');
function parseBody(req, res, next){
    if(req.method === 'GET'){
        next();
    }
    const contentLength = parseInt(req.headers['content-length']);
    let reqBody = '';
    req.on('data', function(chunk){
        reqBody += chunk.toString();
        if(reqBody.length >= contentLength){
            //entir request is parsed now
            const bodyObj = querystring.parse(reqBody);
            req.body = bodyObj;
            next();
        }
    });
    
}

module.exports = parseBody;