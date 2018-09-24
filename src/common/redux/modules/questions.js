import { select, put } from 'redux-saga/effects';
import { handleSagaError } from "../../utils/handleSagaError";

export const LOAD_QUESTIONS = 'ssr/questions/LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'ssr/questions/LOAD_QUESTIONS_SUCCESS';
export const LOAD_QUESTIONS_FAILURE = 'ssr/questions/LOAD_QUESTIONS_FAILURE';


export const SET_ANSWER = 'ssr/questions/SET_ANSWER';
export const SUBMIT_ANSWERS = 'ssr/question/SUBMIT_ANSWERS';

const initialState = {
    loading: false,
    loaded: false,
    error: null,
    question: {},
    professionId: '',
    answers: {},
    isDirect: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_QUESTIONS:
            return {
                ...state,
                loading: true,
                professionId: action.professionId,
                isDirect: action.isDirect
            };
        case LOAD_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                question: action.question
            };
        case LOAD_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case SET_ANSWER:
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.questionId]: { ...action.answer }
                }
            };
        default:
            return state;
    }
}


export function loadQuestions(professionId, isDirect) {
    return {
        type: LOAD_QUESTIONS,
        professionId,
        isDirect
    };
}

export function loadQuestionsSuccess(response) {
    return {
        type: LOAD_QUESTIONS_SUCCESS,
        question: response
    };
}

export function loadQuestionsFailure(error) {
    return {
        type: LOAD_QUESTIONS_FAILURE,
        error
    };
}

export function setAnswer(questionId, answer) {
    return {
        type: SET_ANSWER,
        questionId,
        answer
    };
}

export function submitAnswers() {
    return {
        type: SUBMIT_ANSWERS
    };
}

export function* watchLoadQuestions(client, { professionId, isDirect }) {
    try {
        const response = yield client.get(`/professions/${professionId}/questions?direct=${isDirect}`);
        yield put(loadQuestionsSuccess(response));
    } catch (error) {
        yield put(loadQuestionsFailure(error));
        yield handleSagaError(error);
    }
}

export function* watchSubmitAnswers(client, { profUserId }) {
    try {
        const questionsState = yield select(state => state.questions);
        if (questionsState.isDirect) {
            yield client.post(`/professionals/${profUserId}/jobs`, { data: questionsState.answers });
        } else {
            yield client.post('/customers/jobs', { data: questionsState.answer });
        }

    } catch (error) {
        yield handleSagaError(error);
    }
}