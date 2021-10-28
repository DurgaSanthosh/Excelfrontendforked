import {
    SET_RANK_LIST,
    SET_KRYPTOS_QUESTION,
    KryptosActionType,
    ListElm,
    Question
} from './Kryptos.types';

export const setRankList = (payload: ListElm[]): KryptosActionType => ({
    type: SET_RANK_LIST,
    payload
});

export const setKryptosQuestion = (payload: Question): KryptosActionType => ({
    type: SET_KRYPTOS_QUESTION,
    payload
})
