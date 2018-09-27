import { combineReducers } from 'redux';

import professions from './modules/professions';
import proficients from './modules/proficients';
import questions from './modules/questions';
import professional from './modules/professional';

export default combineReducers({
    professions,
    proficients,
    questions,
    professional
});