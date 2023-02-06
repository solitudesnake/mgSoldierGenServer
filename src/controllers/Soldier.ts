import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Soldier, { IOrder, IRandomWord, ISoldier, ISoldierModel } from '../models/Soldier';
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

function getImages(orderId: string): Promise<any> {
    return fetch('https://api.neural.love/v1/ai-art/orders/' + orderId, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer v1.315f60ddb2c22489bf58381bfc2acc94f8129fd97ec9782474b1a1216c96342a',
            accept: 'application/json'
        }
    })
        .then((response) => response.json())
        .then((response) => {
            return response as any;
        });
}

function getOrder(soldierIdea: string): Promise<any> {
    const body = {
        prompt: soldierIdea + ' shinkawa',
        style: 'painting',
        layout: 'square',
        amount: 4,
        isHd: false,
        isPublic: true
    };

    return fetch('https://api.neural.love/v1/ai-art/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer v1.315f60ddb2c22489bf58381bfc2acc94f8129fd97ec9782474b1a1216c96342a',
            accept: 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .then((response) => {
            return response as IOrder;
        });
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
    const { description } = req.body;

    const soldier = new Soldier({
        _id: new mongoose.Types.ObjectId(),
        orderId: '',
        name: '',
        animal: getRandomAnimal(),
        description,
        images: []
    });

    await getRandomWord()
        .then((P1) => {
            const a = Promise.resolve(P1.word);
            return a.then((value) => {
                soldier.name = value;
            });
        })
        .then(() => {
            return getOrder(soldier.name + ' ' + soldier.animal).then((P2) => {
                const a = Promise.resolve(P2.orderId);

                console.log('a', a);
                a.then((value) => {
                    soldier.orderId = value;
                });
            });
        })
        .then(() => {
            console.log('esperando a que esten disponibles');
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(2), 30000);
            });
        })
        .then((value) => {
            return getImages(soldier.orderId).then((P3) => {
                const a = Promise.resolve(P3.output);
                a.then((value) => {
                    soldier.images = value.map((img: { full: any }) => {
                        return img.full;
                    });
                });
            });
        })
        .then(() => {
            return saveSoldier(soldier, res);
        });
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
