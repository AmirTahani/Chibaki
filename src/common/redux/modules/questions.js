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
    data: {
        _id: "589d9bc2c38184ca3e38b3d0",
        title: "نصب و تعمیر سیستم تهویه",
        questions: [
            {
                _id: "5965b97c10c5486432c87388",
                updatedAt: "2018-08-05T09:11:49.621Z",
                createdAt: "2017-07-12T05:54:04.567Z",
                type: "stext",
                textOption: "سایر",
                attribute: "نوع مکان",
                title: "برای چه مکانی به تعمیرکار سیستم تهویه نیاز دارید؟ ",
                __v: 1,
                tags: [
                    "تعمیرکار سیستم تهویه"
                ],
                skippable: false,
                options: [
                    "مسکونی",
                    "تجاری",
                    "اداری"
                ]
            },
            {
                _id: "5965b7f910c5486432c87386",
                updatedAt: "2018-09-11T11:13:00.612Z",
                createdAt: "2017-07-12T05:47:37.041Z",
                type: "mtext",
                textOption: "سایر",
                attribute: "نیاز متقاضی",
                title: "برای چه خدمتی به تعمیرکار سیستم تهویه نیاز دارید؟",
                __v: 1,
                tags: [
                    "تعمیرکار سیستم تهویه"
                ],
                skippable: false,
                options: [
                    "نصب و راه اندازی ",
                    "تعمیرات",
                    "سرویس"
                ]
            },
            {
                _id: "596379df10c5486432c87319",
                updatedAt: "2018-09-11T11:16:06.199Z",
                createdAt: "2017-07-10T12:58:07.722Z",
                type: "single",
                attribute: "متراژ",
                title: "فضای مورد نظر چند متر است؟ ",
                __v: 2,
                textOption: null,
                tags: [
                    "نقاش ساختمان",
                    "تعمیرکار سیستم تهویه"
                ],
                skippable: false,
                options: [
                    "کمتر از 30 متر",
                    "بین 31 تا 50 متر",
                    "بین 51 تا 80 متر",
                    "بین 81 تا 100 متر",
                    "بین 101 تا 130 متر",
                    "بین 131 تا 150 متر",
                    "بین 151 تا 180 متر",
                    "بین 181 تا 200 متر",
                    "200 متر به بالا"
                ]
            },
            {
                _id: "5b52fb6682698a24dee7ee5d",
                updatedAt: "2018-09-11T11:43:12.818Z",
                createdAt: "2018-07-21T09:22:46.602Z",
                title: "لطفا طبقه‌ی ساختمان را مشخص نمایید.",
                attribute: "طبقه ساختمان",
                textOption: "سایر",
                type: "stext",
                __v: 5,
                tags: [
                    "لوله بازکنی",
                    "تعمیرکار سیستم تهویه",
                    "راه‌انداز و تعمیر ‌آسانسور"
                ],
                skippable: false,
                options: [
                    "اول",
                    "دوم",
                    "سوم",
                    "چهارم ",
                    "پنجم"
                ]
            }
        ],
        gender: "na"
    },
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