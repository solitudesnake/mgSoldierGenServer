import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { ISoldier } from '../models/Soldier';
// import { IBook } from '../models/Book';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            console.log(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    soldier: {
        create: Joi.object<ISoldier>({
            name: Joi.string().required(),
            animal: Joi.string().required(),
            description: Joi.string(),
            images: Joi.array()
        }),
        update: Joi.object<ISoldier>({
            name: Joi.string().required(),
            animal: Joi.string().required(),
            description: Joi.string(),
            images: Joi.array()
        })
    }
};
