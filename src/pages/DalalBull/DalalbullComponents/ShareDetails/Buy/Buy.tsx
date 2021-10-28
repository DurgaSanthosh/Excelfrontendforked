import React, { useState, useEffect, FunctionComponent } from 'react';
import Trade, { TradeProps } from '../Trade/Trade';
import './Buy.scss';
import {
  submitBuyOrShortSell,
  getPortfolio,
  getDashboard,
  getIsGoodTime,
} from '../../apicalls/apicalls';
import { setPortfolioDetails, setDashboardDetails } from '../../../../../store/DalalbullReducer/Dalalbull.Actions';
import { useDispatch } from 'react-redux';

type Props = {
  symbol : any,
  current_price : any,
  total_transactions : any,
  cash_bal : any,
  marketOpen: boolean;
}

const Buy : FunctionComponent<Props> = ({
  symbol,
  current_price,
  total_transactions,
  cash_bal,
  marketOpen
} : Props) => {
  let props = TradeProps('BUY');
  const [base, setBase] = useState(0.0);
  const [brokerage, setBrokerage] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [isGoodTime, setIsGoodTime] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getIsGoodTime().then((res:any) => {
      setIsGoodTime(res.response);
    });
    // setIsGoodTime(true)
  }, []);

  const propsObj = {
    ...props,
    setBase,
    setBrokerage,
    setTotal,
    current_price,
    total_transactions,
  };

  const updateValues = () => {
    propsObj.setBase(0.0);
    propsObj.setBrokerage(0.0);
    propsObj.setTotal(0.0);
  };
  const updateAfterTrade = (res:any) => {
    propsObj.setQuantity(0);
    updateValues();
    getPortfolio()
      .then(portDetails => {
        dispatch(setPortfolioDetails(portDetails));
        getDashboard()
          .then(dashDetails => {
            dispatch(setDashboardDetails(dashDetails));
            window.alert(res.msg);
          })
          .catch(err => window.alert(err));
      })
      .catch(err => window.alert(err));
    // const data:any = getPortfolio();
    // setPortfolioDetails(data)
  };
  return (
    <div className="buy">
      {isGoodTime ? (
        <div className="quantity-wrapper">
          <div className="row">
            <div className="col-lg-6">
              <div>Buy {symbol}</div>
              <br />
              <Trade {...propsObj} />
              <div className="row">
                <div className="col-lg-6">
                  <button
                    disabled={!marketOpen}
                    type="button"
                    className="btn btn-success btn-lg btn-block my-2"
                    onClick={e => {
                      e.preventDefault();
                      if (!(propsObj.quantity === 0))
                        if (propsObj.pendingDisabled) {
                          submitBuyOrShortSell(
                            propsObj.quantity,
                            symbol,
                            null,
                            true,
                          )
                            .then(res => {
                              updateAfterTrade(res);
                            })
                            .catch(err => window.alert(err));
                        } else {
                          submitBuyOrShortSell(
                            propsObj.quantity,
                            symbol,
                            propsObj.price,
                            true,
                          )
                            .then(res => {
                              updateAfterTrade(res);
                            })
                            .catch(err => window.alert(err));
                        }
                    }}
                  >
                    BUY
                  </button>
                </div>
                <div className="col-lg-6">
                  <button
                    disabled={!marketOpen}
                    type="button"
                    className="btn btn-success btn-lg btn-block my-2"
                    onClick={e => {
                      e.preventDefault();
                      if (propsObj.pendingDisabled) {
                        submitBuyOrShortSell(
                          propsObj.quantity,
                          symbol,
                          null,
                          false,
                        )
                          .then(res => {
                            updateAfterTrade(res);
                          })
                          .catch(err => window.alert(err));
                      } else {
                        submitBuyOrShortSell(
                          propsObj.quantity,
                          symbol,
                          propsObj.price,
                          false,
                        )
                          .then(res => {
                            updateAfterTrade(res);
                          })
                          .catch(err => window.alert(err));
                      }
                    }}
                  >
                    Short Sell
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 details">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th>Stock Price</th>
                    <td>{current_price}</td>
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

export default Buy;
