import * as http from '../../../../config/http';
import { ApiRoot, WSRoot } from '../../../../config/api';
import Cookies from 'js-cookie';

export const dalalbullLogin = async(refresh_token:string) => {
  await http.generateJwtToken(refresh_token);
  const token = Cookies.get('jwt_token');
  const body = JSON.stringify({
    access_token: token
  })
  return http.postWithCred(`${ApiRoot}auth/v1/signin`, body);
}

export const dalalbullLogout = async () => {
  await http.getWithCred(`${ApiRoot}dalalbull/api/logout/`);
  return http.getWithCred(`${ApiRoot}auth/v1/signout`);
}

export const handshake = () => {
  return http.getWithCred(`${ApiRoot}dalalbull/api/handshake/`);
};

export const getCompanies = () => {
  return http.getWithCred(`${ApiRoot}dalalbull/api/ticker/`);
};

export const getIsGoodTime = () => {
  return http
    .getWithCred(`${ApiRoot}dalalbull/api/is_share_market_open/`)
    .then((res:object) => res);
};

export const getPortfolio = () => {
  return http.getWithCred(`${ApiRoot}dalalbull/api/portfolioview/`);
  // .then((res:any) => {
  //   return http.getWithCred(`${ApiRoot}/auth/leaderboard/rank`).then((data:any) => {
  //     res.rank = data.dalalbull.rank;
  //     return res;
  //   });
  // });

  // const data:any = {rank : 200 ,net_worth : 20000,cash_bal : 500,margin:200};
  // return data
};

export const getDashboard = () => {
  return http.getWithCred(`${ApiRoot}dalalbull/api/dashboard/`);
};

export const getCompanyDetails = (company:any) => {
  const body = new FormData();
  body.append('company', company);
  return http.postWithCred(`${ApiRoot}dalalbull/api/companydetails/`, body);
  // const data:any = {
  //   open_price:2000,
  //   current_price : 2000,
  //   high : 500,
  //   low : 200,
  //   change : 20
  // }
  // return data
};

export const submitBuyOrShortSell = (qty:any, company:any, pending:any, buy:any) => {
  const body = new FormData();
  body.append('quantity', qty);
  body.append('company', company);
  if (pending != null) {
    body.append('pending', pending);
  }
  const tradeType = buy ? 'buy' : 'short sell';
  body.append('b_ss', tradeType);
  return http.postWithCred(`${ApiRoot}dalalbull/api/submit_buy/`, body);
};

export const submitSellOrShortCover = (qty:any, company:any, pending:any, sell:any) => {
  const body = new FormData();
  body.append('quantity', qty);
  body.append('company', company);
  if (pending != null) {
    body.append('pending', pending);
  }
  const tradeType = sell ? 'sell' : 'short cover';
  body.append('s_sc', tradeType);
  return http.postWithCred(`${ApiRoot}dalalbull/api/submit_sell/`, body);
};

export const getPotfolioHistory = () => {
  return http.getWithCred(`${ApiRoot}dalalbull/api/dashboard/`);
  // const data :any = [
  //   {
  //     company : "GOOGL",
  //     current : 200,
  //     number : 1000,
  //     purchase  : 50,
  //     type : "Tech"
  //   },
  //   {
  //     company : "AAPL",
  //     current : 500,
  //     number : 2000,
  //     purchase  : 100,
  //     type : "Tech"
  //   }
  // ]
  // return data
};

export const getPortfolioSock = () => {
  return new WebSocket(`${WSRoot}dalalbullws/channel/portfolio/`);
};

export const getTickerSock = () => {
  return new WebSocket(`${WSRoot}dalalbullws/channel/ticker/`);
};

export const getGraphSock = () => {
  return new WebSocket(`${WSRoot}dalalbullws/channel/graph/`);
};

export const getGraphData = (company:string) => {
  const body = new FormData();
  body.append('company', company);
  return http.postWithCred(`${ApiRoot}dalalbull/api/graph/`, body);
};

export const getRanklist = () => {
  return http.getWithCred(`${ApiRoot}dalalbull/api/leaderboard/`);
};

// export const getUserDetail = () => {
//   return http.getWithCred(`${ApiRoot}/auth/leaderboard/rank`);
// };

export const getFullHistory = () => {
  return http.getWithCred(`${ApiRoot}/dalalbull/api/history/`);
};

export const getPendingHistory = () => {
  return http.getWithCred(`${ApiRoot}/dalalbull/api/pending/`);
};

export const cancelPending = (id:string) => {
  const body = new FormData();
  body.append('p_id', id);
  return http.postWithCred(`${ApiRoot}dalalbull/api/cancel_pending/`, body);
};

export const getDalalbullRank = () => {
  return http.getWithCred(`${ApiRoot}dalalbull/api/getrank/`);
};

export const getIsShareMarketOpen = () => {
  return http.getWithCred(`${ApiRoot}dalalbull/api/is_share_market_open/`);
}