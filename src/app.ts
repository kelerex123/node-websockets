import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('Client connected');

    ws.on('error', console.error);

    ws.on('message', function message(data) {

        const payload = {
            type: 'custom-message',
            payload: data.toString().toUpperCase(),
        }

        //ws.send(JSON.stringify(payload));

        //Server broadcasting, a todos incluyo al que mando el mensaje.
        // wss.clients.forEach(function each(client) {
        //     if (client.readyState === WebSocket.OPEN) {
        //       client.send(JSON.stringify(payload), { binary: false });
        //     }
        // });

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(payload), { binary: false });
            }
        });


    });

    ws.on('close', () => {
        console.log('Client disconnected');
    })

});

console.log('Server running on https://localhost:3000');