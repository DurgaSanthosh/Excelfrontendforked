import React, { useEffect, FunctionComponent, useState } from "react";
import { getUser } from "../../../../config/http";
// import { getUserDetail } from '../apicalls/apicalls';
import { setUserDetails } from "../../../../store/DalalbullReducer/Dalalbull.Actions";
import { selectUserDetails } from "../../../../store/DalalbullReducer/Dalalbull.Selectors";
import "./Status.scss";
import { getDalalbullRank } from '../apicalls/apicalls';
import { useSelector, useDispatch } from "react-redux";

interface Props {
  rank: number;
  cash_bal: number;
  net_worth: number;
  margin: number;
}

const Status: FunctionComponent<Props> = (props) => {
  const [rank, setRank] = useState(0);
  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetails);
  const token = useSelector((store: any) => store.auth.token);
  useEffect(() => {
    getUser(token).then((res: any) => {
      dispatch(setUserDetails(res));
    });
  }, [dispatch, token]);
  useEffect(() => {
    getDalalbullRank()
    .then(data => {
      if(typeof data.rank === 'number' && data.rank >= 0){
        setRank(data.rank);
      }
    })
  }, []);

  return (
    <div className="userdata">
      <div align-self="center">
        <img
          src={userDetail.picture}
          alt=""
          className="propic ml-auto d-flex mr-auto"
          align-self="center"
        />
      </div>
      <h1 className="h1 name text-center mt-3" text-align="center">
        {userDetail.name}
      </h1>
      <br />
      <div className=" user-data">
        <div className=" row">
          <div className="user-card col-lg-6">
            <h1>{rank}</h1>
            <h3>Rank</h3>
          </div>
          <div className="user-card col-lg-6">
            <h1>{props.net_worth}</h1>
            <h3>Net worth</h3>
          </div>
        </div>
        <div className="row">
          <div className="user-card col-lg-6">
            <h1>{props.cash_bal}</h1>
            <h3>Cash available</h3>
          </div>
          <div className="user-card col-lg-6">
            <h1>{props.margin}</h1>
            <h3>Margin</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
