const http = require('http');

const SEOUL_KEY = '4d6a52524f6d6f6f3131305369537a51';

exports.handler = async function (event) {
  const { start = '1', end = '1000' } = event.queryStringParameters || {};
  const apiUrl = `http://openapi.seoul.go.kr:8088/${SEOUL_KEY}/json/bikeList/${start}/${end}/`;

  return new Promise((resolve) => {
    http.get(apiUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
          body: data,
        });
      });
    }).on('error', (e) => {
      resolve({
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: e.message }),
      });
    });
  });
};
