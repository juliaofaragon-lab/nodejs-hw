import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const notesRoutes = Router();

notesRoutes.get('/notes', authenticate, celebrate(getAllNotesSchema), getAllNotes);
notesRoutes.get('/notes/:noteId', authenticate, celebrate(noteIdSchema), getNoteById);
notesRoutes.post('/notes', authenticate, celebrate(createNoteSchema), createNote);
notesRoutes.patch(
  '/notes/:noteId',
  authenticate,
  celebrate(updateNoteSchema),
  updateNote,
);
notesRoutes.delete(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  deleteNote,
);

export default notesRoutes;
