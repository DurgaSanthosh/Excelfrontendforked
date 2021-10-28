import React, { useState, useEffect , FunctionComponent } from 'react';
import Trade, { TradeProps } from '../Trade/Trade';
import './Sell.scss';
import {
  submitSellOrShortCover,
  submitBuyOrShortSell,
  getPortfolio,
  getDashboard,
  getIsGoodTime,
} from '../../apicalls/apicalls';
import { setPortfolioDetails, setDashboardDetails } from '../../../../../store/DalalbullReducer/Dalalbull.Actions';
import { useDispatch } from 'react-redux';

// let symbol = '$';

type Props = {
  current_price : any,
  total_transactions : any,
  cash_bal : any,
  symbol : any,
  marketOpen: boolean
}

const Sell : FunctionComponent<Props> = ({
  symbol,
  current_price,
  total_transactions,
  cash_bal,
  marketOpen
} : Props ) => {
  let props = TradeProps('SELL');
  const [base, setBase] = useState(0.0);
  const [brokerage, setBrokerage] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [isGoodTime, setIsGoodTime] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getIsGoodTime().then((res:any) => {
      setIsGoodTime(res.response);
    });
  }, []);
  const propObj = {
    ...props,
    setBase,
    setBrokerage,
    setTotal,
    current_price,
    total_transactions,
  };
  const updateValues = () => {
    propObj.setBase(0.0);
    propObj.setBrokerage(0.0);
    propObj.setTotal(0.0);
  };
  const updateAfterTrade = (res:any) => {
    propObj.setQuantity(0);
    updateValues();
    // const data : any = getPortfolio();
    // setPortfolioDetails(data)
    getPortfolio()
      .then(portDetails => {
        console.log(portDetails);
        dispatch(setPortfolioDetails(portDetails));
        getDashboard()
          .then(dashDetails => {
            dispatch(setDashboardDetails(dashDetails));
            window.alert(res.msg);
          })
          .catch(err => window.alert(err));
      })
      .catch(err => window.alert(err));
  };
  return (
    <div className="buy">
      {isGoodTime ? (
        <div className="quantity-wrapper">
          <div className="row">
            <div className="col-lg-6">
              <div>Sell {symbol}</div>
              <br />
              <Trade {...propObj} />
              <div className="row">
                <div className="col-lg-6">
                  <button
                    disabled={!marketOpen}
                    type="button"
                    className="btn btn-success btn-lg btn-block my-2"
                    onClick={e => {
                      e.preventDefault();
                      if (!(propObj.quantity === 0))
                        if (propObj.pendingDisabled) {
                          submitSellOrShortCover(
                            propObj.quantity,
                            symbol,
                            null,
                            true,
                          )
                            .then(res => {
                              updateAfterTrade(res);
                            })
                            .catch(err => window.alert(err));
                        } else {
                          submitSellOrShortCover(
                              propObj.quantity,
                            symbol,
                              propObj.price,
                            true,
                          )
                            .then(res => {
                              updateAfterTrade(res);
                            })
                            .catch(err => window.alert(err));
                        }
                    }}
                  >
                    Sell
                  </button>
                </div>
                <div className="col-lg-6">
                  <button
                    disabled={!marketOpen}
                    type="button"
                    className="btn btn-success btn-lg btn-block my-2"
                    onClick={e => {
                      e.preventDefault();
                      if (propObj.pendingDisabled) {
                        submitSellOrShortCover(
                            propObj.quantity,
                          symbol,
                          null,
                          false,
                        )
                          .then(res => {
                            updateAfterTrade(res);
                          })
                          .catch(err => window.alert(err));
                      } else {
                        submitSellOrShortCover(
                            propObj.quantity,
                          symbol,
                            propObj.price,
                          false,
                        )
                          .then(res => {
                            updateAfterTrade(res);
                          })
                          .catch(err => window.alert(err));
                      }
                    }}
                  >
                    Short Cover
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 details">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th>Stock Price</th>
                    <td>{propObj.current_price}</td>
                  </tr>
                  <tr>
                    <th>BASE VALUE</th>
                    <td>{base}</td>
                  </tr>
                  <tr>
                    <th>BROKERAGE</th>
                    <td>{brokerage}</td>
                  </tr>
                  <tr>
                    <th>TOTAL VALUE</th>
                    <td>{total}</td>
                  </tr>
                  <tr>
                    <th>CASH AVAILABLE</th>
                    <td>{cash_bal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h1>Market Closed <br/>(Trading Hours: 8:00 PM - 2:30 AM IST)</h1>
      )}
    </div>
  );
};

export default Sell;
