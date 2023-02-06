import mongoose, { Document, Schema } from 'mongoose';

export interface ISoldier {
    name: string;
    animal: string;
    description?: string;
    images?: Array<String>;
}

export interface IRandomWord {
    word: string;
}

export interface ISoldierModel extends ISoldier, Document {}

const SoldierSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        animal: { type: String, required: true },
        description: { type: String },
        images: { type: Array }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ISoldierModel>('Soldier', SoldierSchema);
