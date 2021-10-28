import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findById(String(req.params.id));
    
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req,res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if(error instanceof Error) {
            const message = `Something went wrong. Error: ${error.message}`;
            res.status(400).send(message); // <-- materiaalissa eri ratkaisu
        }
    }

    /*const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatientEntry = patientsService.addEntry({
        name, dateOfBirth, ssn, gender, occupation,
    });
    res.json(newPatientEntry);*/
});

export default router;