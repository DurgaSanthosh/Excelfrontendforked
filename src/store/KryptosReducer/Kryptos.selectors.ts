import {createSelector} from 'reselect';
import {rootType} from '../Reducers/rootReducer';

export const selectKryptosState = (state: rootType) => state.Kryptos;

export const selectKryptosQuestion = createSelector(
    selectKryptosState,
    (kryptos) => kryptos.question
)

export const selectKryptosRankList = createSelector(
    selectKryptosState,
    (kryptos) => kryptos.ranklist
)
