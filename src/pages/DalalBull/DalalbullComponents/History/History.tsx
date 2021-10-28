import React, { useState, useEffect ,FunctionComponent } from 'react';
import { getFullHistory } from '../apicalls/apicalls';

type Props = {
  buy_ss : any,
  price : number,
  quantity : number,
  symbol : string,
  time : any,
  total : any
}

const HistoryItem : FunctionComponent<Props> = ({ buy_ss, price, quantity, symbol, time, total } : Props) => (
  <tr>
    <td>{time}</td>
    <td>{symbol}</td>
    <td>{buy_ss}</td>
    <td>{price}</td>
    <td>{quantity}</td>
    <td>{total}</td>
  </tr>
);

const History = () => {
  const [fullHistory, setFullHistory] = useState([]);
  // const data :any =  [{  buy_ss : 100, price : 20000, quantity : 200, symbol : "symbol", time : 8, total : 50000},
  // {  buy_ss : 100, price : 20000, quantity : 200, symbol : "symbol", time : 8, total : 50000}]
  useEffect(() => {
    getFullHistory().then(res => {
      setFullHistory(res.history)});
    // setFullHistory(data);
  }, []);
  return (
    <table className="table table-responsive-lg">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Shares of</th>
          <th scope="col">Type</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {fullHistory.map((item, i) => (
          <HistoryItem {...item} key={i} />
        ))}
        {fullHistory.length === 0 ? (
          <tr>
            <td colSpan={6} align="center">
              You haven't done any transactions yet 
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

export default History;
