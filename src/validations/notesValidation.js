import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

const noteBodySchema = {
  title: Joi.string().trim().min(1),
  content: Joi.string().trim().allow(''),
  tag: Joi.string()
    .trim()
    .valid(...TAGS),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .trim()
      .valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.message('Invalid noteId');
        }

        return value;
      })
      .required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    ...noteBodySchema,
    title: noteBodySchema.title.required(),
  }),
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object(noteBodySchema).min(1),
};
