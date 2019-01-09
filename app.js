import http from 'http';
import url from 'url';
import { StringDecoder } from 'string_decoder';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const httpMethod = req.method.toUpperCase();
  const queryStringObject = parsedUrl.query;
  const headers = req.headers;

  payloadParser(req, res);
})

const payloadParser = (req, res) => {
  let buffer = '';
  const decoder = new StringDecoder('utf-8');
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();
    res.end('Operation complete');
  })
};

server.listen(3500, () => {
  console.log('App started on port 3000');
})