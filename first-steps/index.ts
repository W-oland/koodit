import express from 'express';
const app = express();

app.use(express.json());

import { multiplicator } from './bmiCalculator';
import { counter } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = multiplicator(weight, height);

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        res.send({ error: "malformatted parameters" });
    } else {
        const render = {
            "weight": weight,
            "height": height,
            "bmi": bmi
        };
        res.send(render);
    }
    
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = req.body.target;

    if (!target || !daily_exercises) {
        res.json({ error: 'parameters missing' });
    } else if (isNaN(target) || !(daily_exercises instanceof Array)) {
        res.json({ error: 'malformaated parameters' });
    } else {
        res.json(counter(target, daily_exercises));
    }
    
    /*const { daily_exercises, target } = req.body;

    try {
        res.json(counter(target, daily_exercises));
    } catch (e) {
        if (e instanceof Error) {
            console.log('Error, something bad happened, message: ', e.message);
        } 
    }*/
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});