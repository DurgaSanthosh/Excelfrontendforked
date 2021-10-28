import { ApiRoot } from '../../../config/api';
import * as http from '../../../config/http';
// import Cookies from 'js-cookie';
export const fetchQuestion = async(refresh_token:string) => {
  // const token = refresh_token;
  // if((!Cookies.get('jwt_token')) || Cookies.get('jwt_token') === undefined){
  //   var refresh={"refreshToken" :token};
  //   let result=await http.post(`${AuthRoot}/api/Auth/refresh`,JSON.stringify(refresh));
  //   Cookies.set('jwt_token',result.accessToken, {expires: (1 / 1440) *12 });
  // }
  await http.generateJwtToken(refresh_token);
  return http.get(`${ApiRoot}/kryptos/api/question`);
};

export const fetchRank = () => {
  return http.get(`${ApiRoot}/auth/leaderboard/rank`);
};

export const submitKryptosAnswer = async(ans: string,refresh_token:string) => {
  await http.generateJwtToken(refresh_token);
  const body = JSON.stringify({
    answer: ans
  });
  console.log(body);
  return http.post(`${ApiRoot}/kryptos/api/submit`, body);
};

export const fetchKryptosLeaderboard = async(refresh_token:string) => {
  await http.generateJwtToken(refresh_token);
  return http.get(`${ApiRoot}/kryptos/api/leaderboard`);
};


export const getStaticAsset = (filename: string) => {
  return `${ApiRoot}${filename}`;
};
