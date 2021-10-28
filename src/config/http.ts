import Cookies from 'js-cookie';
import {  AuthRoot } from './api';
import { dalalbullLogin } from '../pages/DalalBull/DalalbullComponents/apicalls/apicalls';

export const post = (url:string, data: any) => {
  let token= Cookies.get('jwt_token')
  return fetch(url, {
    method: 'POST',
    body: data,
    headers: {"Authorization" : 
  `Bearer ${token}`,
  'Accept' : 'application/json',
  'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => err);
};

export const get = (url:string) => {
  let token= Cookies.get('jwt_token')
  return fetch
  (url, 
    {   
    headers: {"Authorization" : 
  `Bearer ${token}`,
  'Accept' : 'application/json',
  'Content-Type': 'application/json'
    } 
})
    .then(res => res.json())
    .catch(err => console.log(err));
};
export const getWithCred = (url:string) => {
  return fetch(url, {
    credentials:'include'
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
export const postWithCred = (url:string, data: any) => {
  return fetch(url, {
    method: 'POST',
    credentials:'include', 
    body: data
  })
    .then(res => res.json())
    .catch(err => err);
};
export const generateJwtToken = async(token:string) => {
  const tok = Cookies.get('jwt_token');
  if((!tok) || tok == undefined || tok == 'undefined'){
    var refresh={"refreshToken" :token};
    if(token){
      let result=await post(`${AuthRoot}/api/Auth/refresh`,JSON.stringify(refresh));
      Cookies.set('jwt_token',result.accessToken, {expires: (1 / 1440)*13 });
    }
    // await dalalbullLogin(result.accessToken);
  }
}

export const getUser = async(token: string) => {
  await generateJwtToken(token);
  const tok = Cookies.get('jwt_token') || '';
  if(tok && tok != undefined && tok != 'undefined'){
    var base64Url = tok.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }else{
    return {};
  }
}
