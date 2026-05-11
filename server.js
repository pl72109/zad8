const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 3000;



app.use(express.json());

app.use(express.static(__dirname));



app.post('/messages', (req, res) => {

    const newMessage = req.body;

    fs.readFile('messages.json', 'utf8', (err, data) => {

        let messages = [];

        if (!err && data) {

            messages = JSON.parse(data);

        }

        messages.push(newMessage);

        fs.writeFile(
            'messages.json',
            JSON.stringify(messages, null, 2),

            (err) => {

                if (err) {

                    return res.status(500).send('Błąd zapisu');

                }

                res.status(200).send('OK');

            }
        );

    });

});



app.listen(PORT, () => {

    console.log(`Serwer działa na porcie ${PORT}`);

});