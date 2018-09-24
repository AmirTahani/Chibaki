import { combineReducers } from 'redux';

import professions from './modules/professions';
import proficients from './modules/proficients';
import questions from './modules/questions';

export default combineReducers({
    professions,
    proficients,
    questions
});