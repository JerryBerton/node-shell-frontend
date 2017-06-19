var http = require('http')
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/', secret: 'jerryberton' }) // single handler

function execFunc(content) {
  var exec = require('child_process').exec
  exec(content, function(error, stdout, stderr) {
    if (error) {
      console.error('exec error:' + error)
      return
    }
    console.log('stdout:' + stdout)
    console.log('stderr:' + stderr)
  })
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777, function() {
  console.log('webhook is listen ...');
})

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  )
  //execFunc('sh ./deploy.sh')
})
