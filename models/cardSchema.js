import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true , lowercase: true},
    developer: { type: String, required: true, trim: true , lowercase: true },
    price: { type: Number, required: true, default: 0, validate(value) { if (value < 0) throw Error("Negative Price!!!!"); } },
    description: { type: String, required: true },
    language:  [{ type: String, required: true,  trim: true , lowercase: true}] ,
    framework: [{ type: String,  trim: true , lowercase: true}],
});

const Card = mongoose.model("Card", CardSchema);

export default Card;