import { select, put } from 'redux-saga/effects';
import { handleSagaError } from '../../utils/handleSagaError';
import { isDev } from '../../config';

export const LOAD_QUESTIONS = 'ssr/questions/LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'ssr/questions/LOAD_QUESTIONS_SUCCESS';
export const LOAD_QUESTIONS_FAILURE = 'ssr/questions/LOAD_QUESTIONS_FAILURE';


export const SET_ANSWER = 'ssr/questions/SET_ANSWER';
export const SUBMIT_ANSWERS = 'ssr/question/SUBMIT_ANSWERS';
export const SUBMIT_ANSWERS_SUCCESS = 'ssr/question/SUBMIT_ANSWERS_SUCCESS';
export const SUBMIT_ANSWERS_FAILURE = 'ssr/question/SUBMIT_ANSWERS_FAILURE';
export const CLEAR_ANSWERS = 'ssr/question/CLEAR_ANSWERS';
export const SET_PROF_ID = 'ssr/question/SET_PROF_ID';


const initialState = {
    loading: false,
    loaded: false,
    error: null,
    questions: [],
    gender: '',
    professionId: '',
    answers: {},
    isDirect: false,
    title: '',
    profId: '',
    submitting: false,
    submitted: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_PROF_ID:
            return {
                ...state,
                profId: action.profId
            };
        case LOAD_QUESTIONS:
            return {
                ...state,
                loading: true,
                loaded: false,
                professionId: action.professionId,
                isDirect: action.isDirect
            };
        case LOAD_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                questions: action.response.questions,
                gender: action.response.gender,
                title: action.response.title
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
        case SUBMIT_ANSWERS:
            return {
                ...state,
                submitting: true,
                submitted: false
            };
        case SUBMIT_ANSWERS_SUCCESS:
            return {
                ...state,
                submitting: false,
                submitted: true
            };
        case SUBMIT_ANSWERS_FAILURE:
            return {
                ...state,
                submitting: false,
                submitted: false
            };
        case CLEAR_ANSWERS:
            return {
                ...state,
                answers: {}
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
        response
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

export function submitAnswers(resolve, reject, profUserId) {
    return {
        type: SUBMIT_ANSWERS,
        reject,
        resolve,
        profUserId
    };
}

export function submitAnswersSuccess() {
    return {
        type: SUBMIT_ANSWERS_SUCCESS
    };
}

export function submitAnswersFailure() {
    return {
        type: SUBMIT_ANSWERS_FAILURE
    };
}

export function clearAnswers() {
    return {
        type: CLEAR_ANSWERS
    };
}

export function setProfId(profId) {
    return {
        type: SET_PROF_ID,
        profId
    };
}

export function* watchLoadQuestions(client, { professionId, isDirect }) {
    try {
        let response;
        if (isDirect) {
            response = yield client.get(`/professions/${professionId}/questions?direct=${isDirect}`);
            if (gtag && !isDev) {
                gtag('event', 'DIRECT_QUESTION_STARTED', {
                    event_category: 'user',
                    event_label: 'user started questions',
                    value: 1
                });
            }
        } else {
            response = yield client.get(`/professions/${professionId}/questions`);
            if (gtag && !isDev) {
                gtag('event', 'QUESTION_STARTED', {
                    event_category: 'user',
                    event_label: 'user started questions',
                    value: 1
                });
            }
        }
        yield put(loadQuestionsSuccess(response.data));
    } catch (error) {
        console.log(error, ' this is error');
        yield put(loadQuestionsFailure(error));
        yield handleSagaError(error);
    }
}

export function* watchSubmitAnswers(client, { resolve, reject }) {
    try {
        const questionsState = yield select(state => state.questions);
        const professions = yield select(state => state.professions.professionsFlatChildren);
        const profession = professions.find(prof => prof._id === questionsState.professionId);

        if (questionsState.isDirect) {
            const job = {
                answers: { ...questionsState.answers },
                profession_id: questionsState.professionId
            };
            yield client.post(`/professionals/${questionsState.profId}/jobs`, { data: { job } });
            if (gtag && !isDev) {
                gtag('event', 'SUBMIT_CREATE_REQUEST_DIRECT', {
                    event_category: 'user',
                    event_label: `SUBMIT_REQUEST_FOR_${profession.title}`,
                    value: 1
                });
            }
        } else {
            const data = {
                answers: { ...questionsState.answers },
                profession_id: questionsState.professionId
            };
            yield client.post('/customers/jobs', { data });
            if (gtag && !isDev) {
                gtag('event', 'SUBMIT_CREATE_REQUEST', {
                    event_category: 'user',
                    event_label: `SUBMIT_REQUEST_FOR_${profession.title}`,
                    value: 1
                });
            }
        }
        yield put(clearAnswers());
        yield put(submitAnswersSuccess());
        resolve && resolve();
    } catch (error) {
        yield handleSagaError(error);
        yield put(submitAnswersFailure());
        reject && reject(error);
    }
}
