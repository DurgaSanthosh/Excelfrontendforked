import {
    KryptosReducerType,
    KryptosActionType,
    SET_RANK_LIST,
    SET_KRYPTOS_QUESTION
} from "./Kryptos.types";

let initialState: KryptosReducerType = {
    ranklist: [],
    question: {
        question: '',
        number: 0,
        hints: [],
        level_file: '',
        image_level: false,
    }
};

const reducer = (state = initialState, action: KryptosActionType) => {
    switch (action.type) {
        case SET_RANK_LIST:
            return {
                ...state,
                ranklist: action.payload,
            };
        case SET_KRYPTOS_QUESTION:
            return {
                ...state,
                question: {
                    ...action.payload
                }
            }
        default:
            return state;
    }
}

export default reducer;