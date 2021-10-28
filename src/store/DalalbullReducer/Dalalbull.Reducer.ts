import {
  DalalbullActionType,
  DalalbullReducerType,
  SET_COMPANIES,
  SET_USER_DETAILS,
  SET_SHARE_DETAILS,
  SET_GRAPH_DATA,
  SET_DASHBOARD_DETAILS,
  SET_PORTFOLIO_DETAILS,
  SET_LEADER_BOARD,
} from "./Dalalbull.types";

const initialState: DalalbullReducerType = {
  companies: [],
  userDetails: {
    name: '',
    picture: '',
  },
  shareDetails: {},
  graphData: [],
  dashboardDetails: {
    total_users: 0,
  },
  portfolioDetails: {},
  leaderBoard: [],
};

const DalalbullReducer = 
(state = initialState, action: DalalbullActionType): DalalbullReducerType => {
  switch (action.type) {
    case SET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case SET_SHARE_DETAILS:
      return {
        ...state,
        shareDetails: action.payload,
      };
    case SET_GRAPH_DATA:
      return {
        ...state,
        graphData: action.payload,
      };
    case SET_DASHBOARD_DETAILS:
      return {
        ...state,
        dashboardDetails: {
          ...state.dashboardDetails,
          ...action.payload
        },
      };
    case SET_PORTFOLIO_DETAILS:
      return {
        ...state,
        portfolioDetails: action.payload,
      };
    case SET_LEADER_BOARD:
      return {
        ...state,
        leaderBoard: action.payload,
      };
    default:
      return state;
  }
};

export default DalalbullReducer;