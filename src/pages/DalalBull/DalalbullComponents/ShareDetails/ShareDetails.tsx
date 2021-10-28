/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, FunctionComponent, useEffect } from 'react';
import './ShareDetails.scss';
import Stock from './Stock/Stock';
import Buy from './Buy/Buy';
import Sell from './Sell/Sell';
import SharesInHand from './SharesInHand/SharesInHand';
import { getIsShareMarketOpen } from '../apicalls/apicalls';

export const tablist:any = {
  stock: 'Stock',
  buy: 'Buy/Short Sell',
  sell: 'Sell/Short Cover',
  sharesInHand: 'Shares in hand',
};

type Props = {
  activeTab : any;
  props:any;
  setActiveTab : any;
  marketOpen: boolean;
}

const TabContent = ({ activeTab, props, setActiveTab, marketOpen } : Props) => {
  switch (activeTab) {
    case tablist.stock:
      return <Stock {...props} />;
    case tablist.buy:
      return <Buy {...props} marketOpen={marketOpen} />;
    case tablist.sell:
      return <Sell {...props} marketOpen={marketOpen} />;
    case tablist.sharesInHand:
      return <SharesInHand {...props} setActiveTab={setActiveTab} />;
    default:
      return <Stock {...props} />;
  }
};

const ShareDetails = (props: any) => {
  const [activeTab, setActiveTab] = useState(tablist.stock);
  const [marketOpen, setMarketOpen] = useState(true);
  const isActive = (tab:string) => (activeTab === tablist[tab] ? 'active' : '');

  useEffect(() => {
    getIsShareMarketOpen()
    .then(data => {
      setMarketOpen(data.response);
    });
  }, []);

  return (
    <div className="share-details">
      <h4 className="h2">Stock Info</h4>
      <h1 className="h1">{props.symbol}</h1>
      <ul className="nav nav-tabs">
        {Object.keys(tablist).map((tab, index) => {
          return (
            <li className="nav-item" key={index}>
              <span
                className={`nav-link ${isActive(tab)}`}
                onClick={() => setActiveTab(tablist[tab])}
              >
                {tablist[tab]}
              </span>
            </li>
          );
        })}
      </ul>
      <br />
      <TabContent
        activeTab={activeTab}
        props={props}
        setActiveTab={setActiveTab}
        marketOpen={marketOpen}
      />
    </div>
  );
};

export default ShareDetails;
