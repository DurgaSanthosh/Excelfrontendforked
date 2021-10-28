import React, { useState, useEffect, FunctionComponent } from "react";
import "./Ticker.scss";
import { getCompanies, getTickerSock } from "../apicalls/apicalls";
import PercentageChange from "../PercentageChange/PercentageChange";

type Props = {
  name: string;
  current_price: number;
  change_per: number;
};

const TickerItem: FunctionComponent<Props> = ({
  name,
  current_price,
  change_per,
}: Props) => {
  return (
    <span className="tickerCompany">
      <span className="company-name">{name}</span>
      <span className="current-price">{current_price}</span>
      <PercentageChange change_per={change_per} />
    </span>
  );
};

const AllTickers = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies().then((res: any) => {
      setCompanies(res["tickerData"]);
    });
    // const data :any =  [{type:"bonds", value: 300, quantity:50,symbol:"TSLA",name:"Tesla", current_price:250, change_per : 20,},
    // {type:"bonds", value: 500, quantity:30,symbol:"ALBT",name:"Alphabet", current_price:550,change_per : -10,}]
    // setCompanies(data)
  }, []);
  
  useEffect(() => {
    const tickSock = getTickerSock();
    tickSock.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      if (!data.hasOwnProperty("msg")) {
        const tickerData = JSON.parse(data.data).tickerData;
        setCompanies(tickerData);
      }
    });
    return () => {
      tickSock.close();
    };
  }, []);
  return companies?.map((company) => (
    <TickerItem {...company} key={company["symbol"]} />
  ));
};

const Ticker = () => {
  return (
    <div className="ticker">
      {/*<div className="marquee" behavior="scroll" direction="left">*/}
      <div className="marquee">
        <span className="all-companies">{AllTickers()}</span>
      </div>
    </div>
  );
};

export default Ticker;
