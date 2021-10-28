import React, { FunctionComponent } from 'react';
import './PercentageChange.scss';

type Prop = {
  change_per : number
}

const ChangeInPercentage : FunctionComponent<Prop> = ({ change_per } : Prop) => {
  if (change_per > 0) {
    return (
      <span className="percentage-change positive-change">
        <i className="fa fa-arrow-up" />+{change_per}%
      </span>
    );
  } else {
    return (
      <span className="percentage-change negative-change">
        <i className="fa fa-arrow-down" />
        {change_per}%
      </span>
    );
  }
};

export default ChangeInPercentage;
