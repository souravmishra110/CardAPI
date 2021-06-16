
import CardModel from '../models/cardSchema.js'

export const getCards = async (request, response) => {
    const cards = await CardModel.find({});

    try {
        response.send(cards);
    } catch (error) {
        response.status(500).send(error);
    }
}

export const createCard = async (request, response) => {
    const cards = new CardModel(request.body);

    try {
        await cards.save();
        response.send(cards);
    } catch (error) {
        response.status(500).send(error);
    }
}

export const getCardsById = async (request, response) => {
    await CardModel.findById(request.params.id)
        .then(result => {
            response.send(result);
        })
        .catch(err => {
            response.status(500).send(err);
        })
}

export const updateCard = async (request, response) => {
    try {
        await CardModel.findByIdAndUpdate(request.params.id, request.body);
        await CardModel.save();
        response.send(Card);
    } catch (error) {
        response.status(500).send(error);
    }
}

export const deleteCard = async (request, response) => {
    try {
        const card = await CardModel.findByIdAndDelete(request.params.id);

        if (!card) response.status(404).send("No item found");
        response.status(200).send();
    } catch (error) {
        response.status(500).send(error);
    }
}

export const getCardsByLanguage = async (request, response) => {
    const lang = (request.params.language).toLowerCase()
    await CardModel.find({ language: lang })
        .then(result => {
            response.send(result);
        })
        .catch(err => {
            response.status(500).send(err);
        })
}

export const getCardsByFramework = async (request, response) => {
    const frame = (request.params.framework).toLowerCase()
    await CardModel.find({ framework: frame })
        .then(result => {
            response.send(result);
        })
        .catch(err => {
            response.status(500).send(err);
        })
}