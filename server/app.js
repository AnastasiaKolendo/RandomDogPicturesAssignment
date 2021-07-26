const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
})

app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

app.listen(PORT, () => console.log(`
     http://localhost:${PORT}
`))

module.exports = app