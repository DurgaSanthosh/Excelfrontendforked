import React, { useState, FunctionComponent } from 'react';
import './GameHeader.scss';
import excelPlayLogo from '../../../assets/logo.png';
import SideNav from './SideNav/SideNav';

interface MIprops {
  link?: string;
  text: string;
}

const MItem: FunctionComponent<MIprops> = props => {
  const { link, text } = props;
  return (
    <li className="nav-item">
      <a className="nav-link active" href={link}>
        <span className="link-rotate">{text}</span>
      </a>
    </li>
  );
};

interface GameProps {
  gName: string;
  icon: any;
}

const GameHeader: FunctionComponent<GameProps> = props => {
  const [sideMenuVisibility, setSideMenuVisibility] = useState(false);
  function toggleMenu(): void {
    setSideMenuVisibility(!sideMenuVisibility);
  }
  return (
    <div className="gameHeader">
      {/* <div className="top-banner">
        <div className="row h-100">
          <div className="col-lg-4">
            <div className="d-flex">
              <div className="excel-play-logo">
                <a href="/">
                  <img
                    src={excelPlayLogo}
                    className="img img-fluid play-logo"
                    alt=""
                  />
                </a>
              </div>
              <div>
                <img
                  src={props.icon}
                  className="img img-fluid game-logo"
                  alt=""
                />
              </div>
              <div>
                <h1 className={"gName"}>{props.gName}</h1>
              </div>
            </div>
          </div>
          <div className="menu-icon">
            <i className="fa fa-navicon" onClick={toggleMenu} />
          </div>
          <div className={`${sideMenuVisibility.toString()} sideMenu`}>
            <SideNav
              toggleMenu={toggleMenu}
              sideMenuVisibility={sideMenuVisibility}
            >
              {props.children}
            </SideNav>
          </div>
          <div className="col-lg-8 d-none d-lg-block">
            <ul className="nav justify-content-end nav-main">
              {props.children}
            </ul>
          </div>
        </div>
      </div> */}
/* <div className="top-banner">
        <div className="row h-100">
          <div className="col-lg-4">
            <div className="d-flex">

              </div>
              </div>
              </div>
              </div>


    </div>
  );
};

export { GameHeader, MItem };
