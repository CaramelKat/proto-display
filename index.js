const express = require('express')
const gpio = require('rpi-gpio').promise;
const app = express();
const port = 8080;

app.use(express.static('public', {
    extensions: ['html', 'htm']
}));

app.post('/v1/setpin/:value', (req, res) => {
    const num = Number(req.params.value);
    console.log(`Pin ${num} is on`);
    gpio.setup(num, gpio.DIR_OUT)
        .then(() => {
            gpio.write(num, true).then(() => {
                return res.sendStatus(200);
            })
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
        })
});

app.delete('/v1/setpin/:value', (req, res) => {
    const num = Number(req.params.value);
    console.log(`Pin ${num} is off`);
    gpio.setup(num, gpio.DIR_OUT)
        .then(() => {
            gpio.write(num, false).then(() => {
                return res.sendStatus(200);
            })
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
        })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})