import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor {
    name: string;
    animal: string;
    description: string;
    images: Array<String>;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        animal: { type: String, required: true },
        description: { type: String, required: true },
        images: { type: Array, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
