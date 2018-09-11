export const A = 'A';


const initialState = {
    name: 'mamad'
};

export default function reducer(state = initialState, action = {}) {
    switch ( action.type ) {
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