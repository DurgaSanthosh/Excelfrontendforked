import React ,{FunctionComponent} from 'react';
import { Link } from 'react-router-dom';
import PercentageChange from '../PercentageChange/PercentageChange';
import './CompanyItem.scss';

type Props = {
  name :string,
  current_price:number,
  change_per : number,
  symbol : number
}

const CompanyItem : FunctionComponent<Props> = ({ name, current_price, change_per, symbol } : Props) => {
  return (
    <div className="company-item">
      <Link to={`/Dalalbull/${symbol}`}>
        <div className="row">
          <div className="c-details">
            <div className="float-left">
              <h1>{symbol}</h1>
              <p className="company-name">{name}</p>
            </div>
            <div className="float-right">
              <div className="data">
                <span className="current-price">{current_price}</span>
                <PercentageChange change_per={change_per} />
                <br />
                <i className="fa fa-arrow-circle-right" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CompanyItem;
