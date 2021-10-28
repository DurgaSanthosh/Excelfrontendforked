import React, { useState, useEffect } from 'react';
import { getCompanies, getTickerSock } from '../apicalls/apicalls';
import Company from '../CompanyItem/CompanyItem';
import {setCompanies} from '../../../../store/DalalbullReducer/Dalalbull.Actions';
import { selectCompanies } from '../../../../store/DalalbullReducer/Dalalbull.Selectors';
import { useDispatch, useSelector } from 'react-redux';
import './ListCompanies.scss';
import Fuse from 'fuse.js';


const allCompany = (companies:any) => {
  return companies?.map((company:any) => (
    <Company {...company} key={company['symbol']} />
  ));
};

const ListCompanies = () => {
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<typeof companies>([]);

  useEffect(() => {
    getCompanies().then(res => {
      dispatch(setCompanies(res['tickerData']));
      setResult(res['tickerData']);
    })
  //   const data :any =  [{type:"bonds", value: 300, quantity:50,symbol:"TSLA",name:"Tesla", current_price:250, change_per : 20,},
  // {type:"bonds", value: 500, quantity:30,symbol:"ALBT",name:"Alphabet", current_price:550,change_per : -10,}]

  // setCompanie(data);
  // setResult(data)
  }, [dispatch]);

  useEffect(() => {
    const tickSock = getTickerSock();
    tickSock.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      if (!data.hasOwnProperty('msg')) {
        const tickerData = JSON.parse(data.data).tickerData;
        dispatch(setCompanies(tickerData));
        setResult(tickerData);
      }
    });
    return () => {
      tickSock.close();
    };
  }, [dispatch]);

  const search = () => {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'symbol'],
    };
    const fuse = new Fuse(companies, options);
    setResult(fuse.search(searchTerm).map(x => x.item));
  };

  return (
    <div className="companies-stock-data">
      <div className="search-wrapper">
        <input
          type="search"
          name="search"
          value={searchTerm}
          onChange={e => {
            if (e.target.value === '') {
              setResult(companies);
            }
            setSearchTerm(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              search();
            }
          }}
          id="search"
          className="search-input"
          placeholder="Search"
        />
      </div>
      <div className="companies-list">{allCompany(result)}</div>
    </div>
  );
};

export default ListCompanies;
