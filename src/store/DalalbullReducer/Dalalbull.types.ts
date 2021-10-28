import ShareDetails from "../../pages/DalalBull/DalalbullComponents/ShareDetails/ShareDetails";

// reducer type
export type Company = {
  name: string;
  symbol: string;
  current_price: string;
  change_per: string;
}
export type UserDetails = {
  name: string;
  email?: string;
  picture: string;
  role?: string;
  user_id?: string;
  nbf?: number;
  iss?: string;
  isPaid?: string;
  ait?: number;
  exp?: number;
}
export type ShareDetails = {
  change?: number;
  change_per?: number;
  current_price?: number;
  hig?: number;
  low?: number;
  name?: string;
  open_price?: number;
  symbol?: string;
  trade_Value?: number;
  trade_Qty?: number;
}
export type GraphData = (string | number)[];
export type DashboardDetails = {
  mostActiveVal?: any[];
  mostActiveVol?: any[];
  stockholdings?: any[];
  topGainers?: any[];
  topLosers?: any[];
  total_users: number;
};
export type PortfolioDetails = {
  cash_bal?: number;
  net_worth?: number;
  rank?: number;
  total_users?: number;
  total_transactions?: number;
  margin?: number;
}
export type LeaderBoard = {
  cash_bal: number;
  email: string;
  name: string;
  net_worth: string;
  no_trans: number;
  picture: string;
  user_id: string;
}

export type DalalbullReducerType = {
  companies: Company[];
  userDetails: UserDetails;
  shareDetails: ShareDetails;
  graphData: GraphData[];
  dashboardDetails: DashboardDetails;
  portfolioDetails: PortfolioDetails;
  leaderBoard: LeaderBoard[];
}

// constants
export const SET_COMPANIES = 'SET_COMPANIES';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_SHARE_DETAILS = 'SET_SHARE_DETAILS';
export const SET_GRAPH_DATA = 'SET_GRAPH_DATA';
export const SET_DASHBOARD_DETAILS = 'SET_DASHBOARD_DETAILS';
export const SET_PORTFOLIO_DETAILS = 'SET_PORTFOLIO_DETAILS';
export const SET_LEADER_BOARD = 'SET_LEADER_BOARD';

// actions type
type SetCompanies = {
  type: typeof SET_COMPANIES;
  payload: Company[];
}
type SetUserDetails = {
  type: typeof SET_USER_DETAILS;
  payload: UserDetails;
}
type SetShareDetails = {
  type: typeof SET_SHARE_DETAILS;
  payload: ShareDetails;
}
type SetGraphData = {
  type: typeof SET_GRAPH_DATA;
  payload: GraphData[];
}
type SetDashboardDetails = {
  type: typeof SET_DASHBOARD_DETAILS;
  payload: DashboardDetails;
}
type SetPortfolioDetails = {
  type: typeof SET_PORTFOLIO_DETAILS;
  payload: PortfolioDetails;
}
type SetLeaderBoard = {
  type: typeof SET_LEADER_BOARD;
  payload: LeaderBoard[];
}

export type DalalbullActionType = 
  | SetCompanies
  | SetUserDetails
  | SetShareDetails
  | SetGraphData
  | SetDashboardDetails
  | SetPortfolioDetails
  | SetLeaderBoard;
