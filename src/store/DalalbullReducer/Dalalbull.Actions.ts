import {DalalbullActionType,
        Company, 
        UserDetails,
        ShareDetails,
        GraphData,
        DashboardDetails,
        PortfolioDetails,
        LeaderBoard,
        SET_COMPANIES,
        SET_USER_DETAILS,
        SET_SHARE_DETAILS,
        SET_GRAPH_DATA,
        SET_DASHBOARD_DETAILS,
        SET_PORTFOLIO_DETAILS,
        SET_LEADER_BOARD,
    } from './Dalalbull.types';

export const setCompanies = (payload: Company[]): DalalbullActionType => ({
    type: SET_COMPANIES,
    payload
});

export const setUserDetails = (payload: UserDetails): DalalbullActionType => ({
    type: SET_USER_DETAILS,
    payload
});

export const setShareDetails = (payload: ShareDetails): DalalbullActionType => ({
    type: SET_SHARE_DETAILS,
    payload
});

export const setGraphData = (payload: GraphData[]): DalalbullActionType => ({
    type: SET_GRAPH_DATA,
    payload
});

export const setDashboardDetails = (payload: DashboardDetails): DalalbullActionType => ({
    type: SET_DASHBOARD_DETAILS,
    payload
});

export const setPortfolioDetails = (payload: PortfolioDetails): DalalbullActionType => ({
    type: SET_PORTFOLIO_DETAILS,
    payload
});

export const setLeaderBoard = (payload: LeaderBoard[]): DalalbullActionType => ({
    type: SET_LEADER_BOARD,
    payload
});