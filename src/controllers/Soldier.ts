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

function getImages(soldierIdea: string): Promise<any> {
    const body = {
        prompt: soldierIdea + ' shinkawa metal gear',
        style: 'painting',
        layout: 'square',
        amount: 4,
        isHd: false,
        isPublic: true
    };

    console.log('body', body);

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
            // console.log('response1', response);
            return fetch('https://api.neural.love/v1/ai-art/orders/' + response.orderId, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer v1.315f60ddb2c22489bf58381bfc2acc94f8129fd97ec9782474b1a1216c96342a',
                    accept: 'application/json',
                    data: JSON.stringify(body)
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log('response----', response);
                    // console.log('response.output----', response.output);
                    // console.log('response.output22----', response.output[2]);
                    const obj: IOrder = {
                        orderId: response.id,
                        images: response.output.map((img: { full: any }) => {
                            console.log('img----', img);
                            return img.full;
                        })
                    };

                    // return obj as IOrder;
                    return response as any;
                });
        });

    // .then((response) => response.json())
    // .then((response) => {
    //     console.log('response', response);
    //     return response as IOrder;
    // })
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

    let P1 = await getRandomWord();
    const results1 = await Promise.all([Promise.resolve(P1.word)]);
    soldier.name = results1[0];
    console.log('soldier', soldier);

    let P2 = await getImages(soldier.name + ' ' + soldier.animal);
    console.log('p2', P2);
    const results2 = await Promise.all([Promise.resolve(P2.orderId), Promise.resolve(P2.output)]);
    soldier.orderId = results2[0];
    soldier.images = results2[1];

    console.log('results2', results2);

    soldier.name = results1[0];

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
