import React, { useEffect, FunctionComponent, useState } from "react";
import "./KryptosInfoBar.scss";
import * as http from "../../../config/http";
import { ApiRoot } from "../../../config/api";
import { useSelector } from "react-redux";

type Props = {
  level: number;
  rank: number;
};

export const fetchUserRank = async (refresh_token: string) => {
  await http.generateJwtToken(refresh_token);
  return http.get(`${ApiRoot}/kryptos/api/getrank`);
};

const KryptosInfoBar: FunctionComponent<Props> = (props) => {
  const token = useSelector((store: any) => store.auth.token);

  const [rank, setRank] = useState(0);

  useEffect(() => {
    fetchUserRank(token).then((data) => {
      if (typeof data === "number" && data >= 0) {
        setRank(data);
      }
    });
  }, [token]);

  const { level } = props;
  return (
    <div className="wrapper justify-content-lg-start ml-2 mt-2">
      LEVEL<span className=" ml-2 emphasis">{level}</span>&nbsp;&nbsp; RANK
      <span className="emphasis ml-2">{rank}</span>
    </div>
  );
};

export default KryptosInfoBar;
