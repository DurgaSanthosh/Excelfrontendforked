import React from "react";
import "./HomeHeader.scss";
import logo from "../../../assets/logo.png";
import excelLogo from "../../../assets/excel20_logo.png";
import { dalalbullLogout } from '../../../pages/DalalBull/DalalbullComponents/apicalls/apicalls';
// import {useDispatch} from 'react-redux';
import Cookies from "js-cookie";
import { AuthRoot } from "../../../config/api";

interface Props {
  userPic?: string;
  username?: string;
}

const HomeHeader: React.FunctionComponent<Props> = (props) => {
  const { userPic, username } = props;
  // const dispatch = useDispatch();


  return (
    <div className="big-header-bg">
      <div className="excel-logo-container">
        <a href="http://excelmec.org/#/">
          <img className="excel-logo" src={excelLogo} alt="excel logo" />
        </a>
      </div>
      {/* <div className="logo-container-bg" /> */}
      {/* <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div> */}

      <div className="userDetails">
        <div className={"dropdown"}>
          <button
            type="button"
            className="btn border-0 "
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          // onClick={() => {
          //   // dispatch({
          //   //   type: 'AUTH_FAIL',
          //   //   payload: {token: ''},
          //   // });
          //   Cookies.remove('jwt_token');
          //   // window.location.reload();
          //   // window.location.href = '/Logout';
          //   window.location.replace(`${AuthRoot}auth/logout?redirect_to=${window.location.href}`)
          // }}
          >
            <span className={"pt-1 pr-1 pl-1 d-block"}>
              <img className="propic" alt="profile pic"
                //  src={userPic} 
                src="https://image.freepik.com/free-psd/creative-holography-text-effect_23-2149052398.jpg"
              />{" "}



              {/* <span className={"d-none d-md-inline-block pr-1"}>
                  {username}
                </span> */                    }


              {/* username */}



            </span>
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <a
              onClick={() => {
                // dispatch({
                //   type: 'AUTH_FAIL',
                //   payload: {token: ''},
                // });
                dalalbullLogout()
                  .then(data => console.log(data));
                Cookies.remove("sessionid")
                Cookies.remove("jwt_token");
                // window.location.reload();
                // window.location.href = '/Logout';
                window.location.replace(
                  `${AuthRoot}auth/logout?redirect_to=${window.location.href}`
                );
              }}
              className="dropdown-item"
            >
              Logout
            </a>
          </div>
        </div>
      </div>

      {/* <div className="userDetails" /> */}

    </div>
  );
};

export default HomeHeader;
