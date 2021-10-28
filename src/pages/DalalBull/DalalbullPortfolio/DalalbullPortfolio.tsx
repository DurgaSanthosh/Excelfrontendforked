import React, { useState, useEffect } from 'react';
import Ticker from '../DalalbullComponents/Ticker/Ticker';
import ListCompanies from '../DalalbullComponents/ListCompanies/ListCompanies';
import Portfolio from '../DalalbullComponents/Portfolio/Portfolio';
import Status from '../DalalbullComponents/Status/Status';
import './DalalbullPortfolio.scss';
import { getPortfolio } from '../DalalbullComponents/apicalls/apicalls';

interface Props {
  portfolioDetails : any
}

const HomeView = ({ portfolioDetails } : Props) => {
  return (
    <div className="dalalbullPortfolio">
      <Ticker />
      <div className="content">
        <div className="row">
          <div className="col-lg-3">
            <ListCompanies />
          </div>
          <div className="col-lg-5 d-none d-lg-block history">
            <h2 className="h2">Portfolio</h2>
            <Portfolio />
          </div>
          <div className="col-lg-4 d-none d-lg-block">
            <Status {...portfolioDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ExclusiveView = ({ portfolioDetails } : Props) => {
  return (
    <div className="dalalbullPortfolio">
      <Ticker />
      <div className="content" style={{ padding: '1em' }}>
        <div className="row">
          <div className="col-lg-6 d-sm-block history">
            <h3 className="h2">Portfolio</h3>
            <Portfolio />
          </div>
          <div className="col-lg-6">
            <Status {...portfolioDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DalalbullPortfolio = (props:any) => {
  const [portfolioDetails, setPortfolioDetails] = useState(null);
  useEffect(() => {
    getPortfolio().then((res : any) => {
      setPortfolioDetails(res);
    });
  }, []);
  if (props.match.url.includes('Portfolio'))
    return <ExclusiveView portfolioDetails={portfolioDetails} />;
  else return <HomeView portfolioDetails={portfolioDetails} />;
};

export default DalalbullPortfolio;
