const WebSocket = require('ws');

const wss = new WebSocket.Server({port:1002});
 
wss.on('connection', ws=>{
  let last;
  ws.on('message',data=>{
    if(last===data){return}
    last=data
    wss.clients.forEach(client=>{
      if (client.readyState === WebSocket.OPEN && ws!==client) {
        client.send(data);
      }
    });
  });
});