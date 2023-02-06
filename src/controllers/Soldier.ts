import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Soldier, { IRandomWord, ISoldier, ISoldierModel } from '../models/Soldier';
import animalList from '../resources/animals';

const saveSoldier = (soldier: ISoldierModel, res: Response) => {
    return soldier
        .save()
        .then((soldier: ISoldier) => res.status(201).json({ soldier }))
        .catch((error) => res.status(500).json({ error }));
};

function getRandomWord(): Promise<IRandomWord> {
    return fetch('https://api.api-ninjas.com/v1/randomword', {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'L1Y+oV0C5EyPnYBtMetOag==M8Zga67TfZEfGM3C'
        }
    })
        .then((response) => response.json())
        .then((response) => {
            return response as IRandomWord;
        });
}

function getRandomAnimal() {
    const list = animalList;
    return list[Math.floor(Math.random() * list.length) - 1];
}

const createCustomSoldier = (req: Request, res: Response, next: NextFunction) => {
    const { name, animal, description, images } = req.body;

    console.log('req', req);
    const soldier = new Soldier({
        _id: new mongoose.Types.ObjectId(),
        name,
        animal,
        description,
        images
    });

    return saveSoldier(soldier, res);
};

const createRandomSoldier = async (req: Request, res: Response, next: NextFunction) => {
    const { description, images } = req.body;

    let P1 = await getRandomWord();

    const results = await Promise.all([Promise.resolve(P1.word)]);

    const soldier = new Soldier({
        _id: new mongoose.Types.ObjectId(),
        name: results[0],
        animal: getRandomAnimal(),
        description,
        images
    });

    console.log('soldier', soldier);

    return saveSoldier(soldier, res);
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Soldier.find()
        .then((soldiers) => res.status(200).json({ soldiers }))
        .catch((error) => res.status(500).json({ error }));
};

const updateSoldier = (req: Request, res: Response, next: NextFunction) => {
    const soldierId = req.params.soldierId;

    return Soldier.findById(soldierId)
        .then((soldier) => {
            if (soldier) {
                soldier.set(req.body);

                return soldier
                    .save()
                    .then((soldier) => res.status(201).json({ soldier }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteSoldier = (req: Request, res: Response, next: NextFunction) => {
    const soldierId = req.params.soldierId;

    return Soldier.findByIdAndDelete(soldierId)
        .then((soldier) => (soldier ? res.status(201).json({ soldier, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createRandomSoldier, createCustomSoldier, readAll, updateSoldier, deleteSoldier };
