import { createSelector } from 'reselect';
import { rootType } from '../Reducers/rootReducer';

export const selectDalalbullRoot = (state: rootType) => state.Dalalbull;

export const selectCompanies = createSelector(
    selectDalalbullRoot,
    (dalalbull) => dalalbull.companies
);

export const selectUserDetails = createSelector(
    selectDalalbullRoot,
    (dalalbull) => dalalbull.userDetails
);

export const selectShareDetails = createSelector(
    selectDalalbullRoot,
    (dalalbull) => dalalbull.shareDetails
);

export const selectGraphData = createSelector(
    selectDalalbullRoot,
    (dalalbull) => dalalbull.graphData
);

export const selectDashboardDetails = createSelector(
    selectDalalbullRoot,
    (dalalbull) => dalalbull.dashboardDetails
);

export const selectPortfolioDetails = createSelector(
    selectDalalbullRoot,
    (dalalbull) => dalalbull.portfolioDetails
);

export const selectLeaderBoard = createSelector(
    selectDalalbullRoot,
    (dalalbull) => dalalbull.leaderBoard
);