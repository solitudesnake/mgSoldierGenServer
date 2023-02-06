import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Soldier, { IRandomWord, ISoldier, ISoldierModel } from '../models/Soldier';
import { urlServicesBack } from '../resources/Word';
import animalList from '../resources/animals';
import Axios, { AxiosResponse } from 'axios';

const saveSoldier = (soldier: ISoldierModel, res: Response) => {
    return soldier
        .save()
        .then((soldier: ISoldier) => res.status(201).json({ soldier }))
        .catch((error) => res.status(500).json({ error }));
};

// async function getRandomWord(): Promise<{ type: String; required: true }> {
//     const randomWord: IRandomWord = await urlServicesBack.get('');
//     return randomWord.word;
// }

function getRandomWord2() {
    return Axios.get('https://api.api-ninjas.com/v1/randomword', {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'L1Y+oV0C5EyPnYBtMetOag==M8Zga67TfZEfGM3C'
        }
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

    // console.log('req', req);
    const soldier = new Soldier({
        _id: new mongoose.Types.ObjectId(),
        name: await getRandomWord2(),
        animal: getRandomAnimal(),
        description,
        images
    });

    const algo = await getRandomWord2();
    console.log('algo', algo);
    console.log('soldier', soldier);
    // console.log('getRandomWord()22', getRandomWord());

    return saveSoldier(soldier, res);
};

// const readSoldier = (req: Request, res: Response, next: NextFunction) => {
//     const soldierId = req.params.soldierId;
//
//     return Soldier.findById(soldierId)
//         .then((soldier) => (soldier ? res.status(200).json({ soldier }) : res.status(404).json({ message: 'not found' })))
//         .catch((error) => res.status(500).json({ error }));
// };

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
