import React , {FunctionComponent} from 'react';
import './SharesInHand.scss';
import { tablist } from '../ShareDetails';

type Props = {
  stockholdings : any,
  symbol : any,
  setActiveTab : any
}

const SharesInHand = ({ stockholdings, symbol, setActiveTab } : Props) => {
  // const stockholdings:any = [{company:"TSLA",type:"bonds",number:20,current:200,purchase:50},{company:"ALBT",type:"bonds",number:20,current:200,purchase:50}]
  // const symbol:any = "TSLA"
  return (
    <div className="sharesInHand">
      <div className="head">Shares In Hand</div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Shares in Hand</th>
            <th scope="col">Current Price</th>
            <th scope="col">Gain</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {stockholdings !== []
            ? stockholdings?.map((holding:any, i:any) => {
                if (holding.company === symbol)
                  return (
                    <tr key={i}>
                      <td>{holding.type}</td>
                      <td>{holding.number}</td>
                      <td>{(holding.current * holding.number).toFixed(2)}</td>
                      <td>
                        {(
                          ((holding.current * holding.number -
                            holding.purchase * holding.number) *
                            100) /
                          (holding.purchase * holding.number)
                        ).toFixed(2)}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn"
                          onClick={e => {
                            e.preventDefault();
                            setActiveTab(tablist.sell);
                          }}
                        >
                          {holding.type === 'BUY' ? 'Sell' : 'Short Cover'}
                        </button>
                      </td>
                    </tr>
                  );
                return null;
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default SharesInHand;
