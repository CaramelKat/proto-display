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
            return gpiop.write(7, true)
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
        })
});

app.delete('/v1/setpin/:value', (req, res) => {
    const num = Number(req.params.value);
    console.log(`Pin ${num} is off`);
    gpiop.setup(7, gpiop.DIR_OUT)
        .then(() => {
            return gpiop.write(7, false)
        })
        .catch((err) => {
            console.log('Error: ', err.toString())
        })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})