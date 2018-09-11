import axios from 'axios';
import { take, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';


export const A = 'A';
export const B = 'B';

const initialState = {
    name: 'mamad'
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case A:
            return {
                ...state,
                name: 'salam'
            };
        default:
            return state;
    }
}


export function changeName() {
    return {
        type: A
    };
}

export function changeNameSuccess() {
    return {
        type: B
    };
}


export function* watchChangeName() {
    try {
        const res = yield axios.get('https://api.chibaki.ir/signup');
        yield put(changeNameSuccess());
        yield delay(2000);
        yield take(B);
    } catch (error) {
        console.log('this is the fucking error');
        console.log(error);
    }
}