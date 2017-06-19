'use staric';
const  http           = require('http')
const  createHandler  = require('github-webhook-handler');
const  handler      = createHandler({ path: '/', secret: 'jerryberton' })

function execFunc(content) {
  const exec = require('child_process').exec;
  exec(content, (error, stdout, stderr) => {
    if (error) {
      console.error('exec error:' + error)
      return;
    }
    console.log('stdout:' + stdout)
    console.log('stderr:' + stderr)
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

handler.on('error',  (err) => {
  console.error('Error:', err.message);
})

handler.on('push', (event) => {
  console.log(
    'Received a push event for %s to %s',
     event.payload.repository.name,
     event.payload.ref,
     event.payload
  );
  //execFunc('sh ./deploy.sh')
})
