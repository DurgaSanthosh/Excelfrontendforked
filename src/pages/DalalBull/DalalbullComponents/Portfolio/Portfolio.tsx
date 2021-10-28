import React, { useState, FunctionComponent } from 'react';
import SharesInHand from '../SharesInHand/SharesInHand';
import History from '../History/History';
import Pending from '../Pending/Pending';
import './Portfolio.scss';

export const tablist:any = {
  sharesInHand: 'Shares in hand',
  history: 'History',
  pending: 'Pending',
};

// const TabContent = ({ activeTab } : any) => {
//   switch (activeTab) {
//     case tablist.sharesInHand:
//       return <SharesInHand />;
//     case tablist.history:
//       return <History />;
//     case tablist.pending:
//       return <Pending />;
//   }
// };

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(tablist.sharesInHand);
  const isActive = (tab:string) => (activeTab === tablist[tab] ? 'active' : '');
  return (
    <div className="sharesInHand">
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
      {
        activeTab === tablist.sharesInHand ? <SharesInHand /> : activeTab === tablist.history ? <History />: <Pending /> 
      }
    </div>
  );
};

export default Portfolio;
