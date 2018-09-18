import { combineReducers } from 'redux';

import professions from './modules/professions';
import proficients from './modules/proficients';

export default combineReducers({
    professions,
    proficients
});