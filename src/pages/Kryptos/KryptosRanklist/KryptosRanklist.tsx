import React, { useEffect, useState } from 'react';
import './KryptosRanklist.scss';
import { fetchKryptosLeaderboard } from '../KryptosApi/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { rootType } from '../../../store/Reducers/rootReducer';
import {setRankList} from "../../../store/KryptosReducer/Kryptos.actions";
import { ListElm } from "../../../store/KryptosReducer/Kryptos.types";
import {selectKryptosRankList} from "../../../store/KryptosReducer/Kryptos.selectors";


const KryptosRanklist = (props: ListElm) => {
  // =====FOR TEMPORARY DUMMY DATA====== //

  // Uncomment below line when removing dummy data and using backend.
  // const {ranklist} = useSelector((state: rootType) => state.Kryptos);
  const dispatch = useDispatch();
  const token = useSelector((store: rootType )=> store.auth.token);
  const ranklist = useSelector(selectKryptosRankList);

  useEffect(() => {
    fetchKryptosLeaderboard(token)
    .then(data => dispatch(setRankList(data)));
  }, [dispatch, token]);


  const RankListRows = ({ ranklist }: { ranklist: ListElm[] }) => (
    <>
      {ranklist.map((curr: ListElm, index) => (
        <tr key={index}>
          <td>
            <img src={curr.profile_pic} alt="" className="propic" />
          </td>
          <td>{curr.name}</td>
          <td className="rank-level">{index + 1}</td>
          <td className="rank-level">{curr.curr_level}</td>
        </tr>
      ))}
    </>
  );

  return (
    <div
      className={` ${props.showRanklist === false && "hide-ranklist"} ${
        (props.showRanklist === true || props.showRanklist === false) &&
        "hidable-ranklist"
      } ranklist w-100`}
    >
      <div className={"text-center heading p-3"}>RANKLIST</div>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Rank</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          <RankListRows ranklist={ranklist} />
        </tbody>
      </table>
    </div>
  );
};

export default KryptosRanklist;
