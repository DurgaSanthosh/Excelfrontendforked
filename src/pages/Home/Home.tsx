import React, { useState, useEffect } from "react";
import HomeHeader from "../../components/common/HomeHeader/HomeHeader";
import Games from "../../components/Home/Games/Games";
import "./Home.scss";
import dalal from "../../assets/dalalBull_500.png";
import kryp from "../../assets/kryptos_500.png";
import hash from "../../assets/lordofcode.png";
import circ from "../../assets/circuimstance_500.png";
import Cookies from "js-cookie";
import * as http from "../../config/http";
import { ApiRoot } from "../../config/api";
import { useSelector } from "react-redux";
import { getDalalbullRank } from '../DalalBull/DalalbullComponents/apicalls/apicalls';

export const fetchUserRank = async (refresh_token: string) => {
  await http.generateJwtToken(refresh_token);
  if (refresh_token) {
    return http.get(`${ApiRoot}/kryptos/api/getrank`);
  }
};

const Home = () => {
  const [kryptosRank, setKryptosRank] = useState(0);
  const [dalalbullRank, setDalalbullRank] = useState(0);
  const [circuimstanceRank, setCircuimstanRank] = useState(0);
  const [userPic, setUserPic] = useState("");
  const [username, setUserName] = useState("");

  const token = useSelector((store: any) => store.auth.token);

  useEffect(() => {
    fetchUserRank(token).then((data) => {
      if (typeof data === "number" && data >= 0) {
        setKryptosRank(data);
      }
    });
    getDalalbullRank().then(data => {
      if (data) {
        if (typeof data.rank === 'number' && data.rank >= 0) {
          setDalalbullRank(data.rank);
        }
      }
    });
    http.getUser(token).then((data) => {
      setUserPic(data.picture);
      setUserName(data.name)
    });
  }, [token]);


  return (
    <div style={{
      background: 'radial-gradient(49.39% 49.39% at 50% 65.04%, rgba(54, 3, 132, 0.4) 0%, #262626 100%)',

    }} className="row">
      <div className="col-lg-12">
        <HomeHeader username={username} userPic={userPic} />
      </div>
      <div style={
        { paddingTop: '10rem' }
      } className="container">
        <div className="events">
          <div className="row">
            <div className="col-lg-12 center-block text-center cell">
              <Games
                name="KRYPTOS"
                rank={kryptosRank}
                logo=""
                type="ranked"
                href="Kryptos"
                status="Play Now"
                index={1}
              />
            </div>
            <div className="col-lg-12 center-block text-center cell">
              <Games
                name="DALALBULL"
                rank={dalalbullRank}
                logo=""
                type="ranked"
                // type="notRanked"
                // status="Play Now"
                status="Coming Soon!"
                index={2}
                href="Dalalbull"
              // isDisabled={true}
              />
            </div>
            <div className="w-full" />
            <div className="col-lg-12 center-block text-center cell">
              <Games
                name="LORD OF CODE"
                logo=""
                type="notRanked"
                // status="Play Now"
                status="Coming Soon!"
                index={2}
                isDisabled={false}
                href="https://www.hackerearth.com/lordofcode-prelims"
              />
            </div>
            {/* <div className="col-lg-6 center-block text-center cell">
              <Games
                name="CIRCUIMSTANCE"
                rank={circuimstanceRank}
                logo={circ}
                type="notRanked"
                status="Coming Soon"
                index={4}
                isDisabled={true}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
