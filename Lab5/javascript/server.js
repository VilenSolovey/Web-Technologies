const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let shoes = [
    { id: 1, name: "Nike", price: "1200", size: "43", color: "black" },
    { id: 2, name: "Adidas", price: "1800", size: "41", color: "red" },
    { id: 3, name: "Puma", price: "2200", size: "42", color: "blue" },
    { id: 4, name: "NewBalance", price: "12200", size: "42", color: "blue" },
    { id: 5, name: "Asics", price: "1200", size: "42", color: "blue" }
];

app.get('/shoes', (req, res) => {
    const { search, sort } = req.query;
    let filteredShoes = shoes;

    if (search) {
        filteredShoes = filteredShoes.filter(shoe =>
            shoe.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (sort === 'asc') {
        filteredShoes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === 'desc') {
        filteredShoes.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    res.json(filteredShoes);
});

app.post('/shoes', (req, res) => {
    const { name, price, size, color } = req.body;

    if (!name || !price || !size) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const existingIds = shoes.map(shoe => shoe.id);

    let newId = 1;
    while (existingIds.includes(newId)) {
        newId++;
    }

    const newShoe = {
        id: newId,
        name,
        price,
        size,
        color
    };

    shoes.push(newShoe);
    res.status(201).json(newShoe);
});

app.put('/shoes/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, size } = req.body;
    const shoeIndex = shoes.findIndex(shoe => shoe.id === parseInt(id));

    if (shoeIndex === -1) {
        return res.status(404).send('Взуття не знайдено');
    }

    shoes[shoeIndex] = { id: parseInt(id), name, price, size };
    res.json(shoes[shoeIndex]);
});

app.delete('/shoes/:id', (req, res) => {
    const { id } = req.params;
    const shoeIndex = shoes.findIndex(shoe => shoe.id === parseInt(id));

    if (shoeIndex === -1) {
        return res.status(404).send('Взуття не знайдено');
    }

    shoes.splice(shoeIndex, 1);
    res.status(204).send();
});

app.get('/shoes/total-price', (req, res) => {
    const { search } = req.query;
    let filteredShoes = shoes;

    if (search) {
        filteredShoes = filteredShoes.filter(shoe =>
            shoe.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    const totalPrice = filteredShoes.reduce((sum, shoe) => sum + parseFloat(shoe.price), 0);
    res.json({ totalPrice });
});

app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
