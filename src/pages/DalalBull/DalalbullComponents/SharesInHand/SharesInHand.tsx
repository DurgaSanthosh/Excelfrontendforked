import React, { useState, useEffect, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { getPotfolioHistory } from '../apicalls/apicalls';

type Props = {
  company : string,
  current : number,
  number:number,
  purchase : number,
  type : string
}
const HistoryItem : FunctionComponent<Props> = ({ company, current, number, purchase, type } : Props) => (
  <tr>
    <td>{company}</td>
    <td>{type}</td>
    <td>{number}</td>
    <td>{purchase}</td>
    <td>{current}</td>
    <td>
      <Link to={`/Dalalbull/${company}`}>
        <button type="button" className="btn btn-success bg-success">
          view
        </button>
      </Link>
    </td>
  </tr>
);

const SharesInHand = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
   getPotfolioHistory().then(res => 
    {
      // console.log(res.stockholdings);
      setHistory(res.stockholdings);
    })
  //  const data:any = getPotfolioHistory();
  //  setHistory(data)
  }, []);
  return (
    <table className="table table-responsive-lg">
      <thead>
        <tr>
          <th scope="col">Shares of</th>
          <th scope="col">Type</th>
          <th scope="col">Shares in Hand</th>
          <th scope="col">Purchase Price</th>
          <th scope="col">Current Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {history?.map((item:any, i:any) => (
          <HistoryItem {...item} key={i} />
        ))}
        {history?.length === 0 ? (
          <tr>
            <td colSpan={6} align="center">
              Currently you don't have any shares
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

export default SharesInHand;
