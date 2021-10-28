import React, {FunctionComponent} from 'react';
import './SideNav.scss';

interface Props {
  sideMenuVisibility: boolean;
  toggleMenu: () => void;
}

const SideNav: FunctionComponent<Props> = props => {

  const {sideMenuVisibility, toggleMenu} = props;

  return (
    <div className="sideNav">
      <div className={`${sideMenuVisibility} menu`}>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Home{' '}
          </a>
        </li>
        {props.children}
      </div>
      <div className="backDrop" onClick={toggleMenu} />
    </div>
  );
};

export default SideNav;
