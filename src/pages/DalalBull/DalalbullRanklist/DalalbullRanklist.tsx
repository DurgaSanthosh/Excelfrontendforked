import React, { useState, useEffect, FunctionComponent } from 'react';
import { getRanklist } from '../DalalbullComponents/apicalls/apicalls';
import { setLeaderBoard } from '../../../store/DalalbullReducer/Dalalbull.Actions';
import { selectLeaderBoard } from '../../../store/DalalbullReducer/Dalalbull.Selectors';
import { useDispatch, useSelector } from 'react-redux';
import './DalalbullRanklist.scss';

const Rank  = ({ name, picture, net_worth, rank } : any) => {
  return (
    <tr key={rank}>
      <td>
        <img src={picture} alt="" className="propic" />
      </td>
      <td>{name}</td>
      <td className="rank-level">{rank + 1}</td>
      <td className="rank-level">{net_worth}</td>
    </tr>
  );
};

const DalalbullRanklist = () => {
  const dispatch = useDispatch();
  const ranklist = useSelector(selectLeaderBoard);
  // const [ranklist, setRanklist] = useState([]);
  // const data : any =[{name: "person1", pic:"picture", rank:1,level:50000},{name: "person2", pic:"picture", rank:2,level:25000},{name: "person3", pic:"picture", rank:3,level:10000}];
  useEffect(() => {
    getRanklist()
    .then(res => {
      // console.log(res.leaderboard_data);
      dispatch(setLeaderBoard(res.leaderboard_data));
      // setRanklist(res.leaderboard_data);

    });
    // setRanklist(data);
  }, [dispatch]);
  return (
    <div
    style={{borderTop: "4px solid"}}
      className={`ranklist container mt-5 border-primary w-100`}
    >
      <div className={"text-center heading p-3  m-auto"}>RANKLIST</div>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Rank</th>
            <th>Net Worth</th>
          </tr>
        </thead>
        <tbody>
          {
          ranklist?.map((rank:any, i:any) => (
          <Rank {...rank} rank={i} key={i} />            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DalalbullRanklist;
