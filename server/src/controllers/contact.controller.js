import { createOne, updateOne, getAll, getOne, deleteOne } from "./handlerFactory.js";
import contactModel from "../models/contact.model.js";

export const createContact = createOne(contactModel);

export const updateContact = (req, res, next) => {
    const userFilter = { user: req.user.id };
    return updateOne(contactModel, userFilter)(req, res, next);
};

export const getAllContacts = (req, res, next) => {
    const userFilter = { user: req.user.id };
    return getAll(contactModel, userFilter)(req, res, next);
};

export const getContact = (req, res, next) => {
    const userFilter = { user: req.user.id };
    return getOne(contactModel, null, userFilter)(req, res, next);
};

export const deleteContact = (req, res, next) => {
    const userFilter = { user: req.user.id };
    return deleteOne(contactModel, userFilter)(req, res, next);
};
