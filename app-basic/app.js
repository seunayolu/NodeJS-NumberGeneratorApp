const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

function generateRandomString(length) {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

app.get('/', (req, res) => {
    res.render('index', { results: null });
});

app.post('/', (req, res) => {
    const length = parseInt(req.body.length, 10);
    const combinations = parseInt(req.body.combinations, 10);
    const results = [];

    for (let i = 0; i < combinations; i++) {
        results.push(generateRandomString(length));
    }

    res.render('index', { results: results });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
