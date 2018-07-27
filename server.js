
const http = require('http');
const mime = require('mime-types');
const urlParser = require('url');
const Assistant = require('./assistant');
const port = process.env.PORT || 5000;
const House = require('./lib/house.js')
let Messages = require('./lib/message.js')

let house = new House();

let messages = []


http.createServer(handleRequest).listen(port);
console.log('listening on port ' + port)

function handleRequest(request, response) {
    let assistant = new Assistant(request, response);
    let path = assistant.path;

    try {
        if (path === '/') {
            assistant.sendFile('index.html');
                    
        } else if (path === '/chat') {
            assistant.parsePostParams((params) => {
                let message = {
                    name: 'anonymous',
                    body: params.body,
                    when: new Date().toISOString()
                }
                messages.push(message);
                let data = JSON.stringify(messages);
                let type = mime.lookup('json');
                assistant.finishResponse(type, data);
            })
        } else {
            let fileName = path.slice(1);
            assistant.sendFile(fileName)
        }
    } catch (error) {
        assistant.sendError(404, "error: " + error.toString())
    }
}