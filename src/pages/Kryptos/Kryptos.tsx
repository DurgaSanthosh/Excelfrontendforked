import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import {
  GameHeader,
  MItem,
} from "../../components/common/GameHeader/GameHeader";
//import withLogin from '../HOC/withLogin';
import "../../App.scss";
import kryptosLogo from "../../assets/kryptosc_500.png";
import KryptosPlay from "./KryptosPlay/KryptosPlay";
import KryptosRules from "./KryptosRules/KryptosRules";
import KryptosRanklist from "./KryptosRanklist/KryptosRanklist";

type Props = {
  match: any;
};

function detectMob() {
  return window.innerWidth <= 1000;
}

const Kryptos: FunctionComponent<Props> = (props) => {
  const [showRanklist, setShowRanklist] = React.useState(false);

  const { match } = props;
  return (
    <div>
      <GameHeader gName="KRYPTOS" icon={kryptosLogo}>
        <MItem text="Rules" link="/Kryptos/rules" />
        <MItem text="Play" link="/Kryptos" />
        {detectMob() ? (
          <MItem text="Ranklist" link="/Kryptos/ranklist" />
        ) : (
          <li className="nav-item">
            <a
              className="nav-link active"
              onClick={(e) => {
                setShowRanklist(!showRanklist);
              }}
            >
              <span className="link-rotate">{"Ranklist"}</span>
            </a>
          </li>
        )}
      </GameHeader>
      <Switch>
        <Route exact path={`${match.url}/`} render={() => <KryptosPlay showRanklist={showRanklist} />} />
        <Route exact path={`${match.url}/rules`} component={KryptosRules} />
        <Route
          exact
          path={`${match.url}/ranklist`}
          component={KryptosRanklist}
        />
      </Switch>
    </div>
  );
};

//export default withLogin(Kryptos);
export default Kryptos;
