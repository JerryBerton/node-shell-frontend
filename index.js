'use staric';
const  http           = require('http')
const  createHandler  = require('github-webhook-handler')
const  handler        = createHandler({ path: '/', secret: 'dhc-api' })
const  child_process  = require('child_process')

function execFunc(content) {
  let spawn = child_process.spawn(content);
  spawn.stdout.on('data', (data) => {
    console.log('stdout: ' + data);
  })
  spawn.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  spawn.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
  
}
http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(7777, () => {
  console.log('webhook is listen ...');
})
//
handler.on('error',  (err) => {
  console.error('Error:', err.message);
})
//
handler.on('push', (event) => {
  console.log(
    'Received a push event for %s to %s',
     event.payload.repository.name,
     event.payload.ref
  );
  execFunc('sh ./deploy.sh')
})
