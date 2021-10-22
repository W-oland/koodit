import express from 'express';
const app = express();

import { multiplicator } from './bmiCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = multiplicator(weight, height);

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        res.send({ error: "malformatted parameters" })
    } else {
        const render = {
            "weight": weight,
            "height": height,
            "bmi": bmi
        }
        res.send(render);
    }
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});