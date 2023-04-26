const express = require('express')
const gpiop = require('rpi-gpio').promise;
const app = express();
const port = 8080;

app.use(express.static('public', {
    extensions: ['html', 'htm']
}));

app.post('/v1/setpin/:value', (req, res) => {
    const num = Number(req.params.value);
    console.log(`Pin ${num} is on`);
    gpiop.setup(7, gpiop.DIR_OUT)
        .then(() => {
            gpiop.write(7, true);
            return res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
            return res.sendStatus(504);
        })
});

app.delete('/v1/setpin/:value', (req, res) => {
    const num = Number(req.params.value);
    console.log(`Pin ${num} is off`);
    gpiop.setup(7, gpiop.DIR_OUT)
        .then(() => {
            gpiop.write(7, false);
            return res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
            return res.sendStatus(504);
        })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})