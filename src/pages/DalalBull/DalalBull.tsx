import React, { FunctionComponent, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import DalalbullHeader from "./DalalbullComponents/DalalbullHeader/DalalbullHeader";
import DalalbullPortfolio from "./DalalbullPortfolio/DalalbullPortfolio";
import DalalbullPlay from "./DalalbullPlay/DalalbullPlay";
import DalalbullRules from "./DalalbullRules/DalalbullRules";
import DalalbullRanklist from "./DalalbullRanklist/DalalbullRanklist";
//import withLogin from '../HOC/withLogin';
import { handshake, dalalbullLogin } from "./DalalbullComponents/apicalls/apicalls";
import { useSelector } from 'react-redux';
import "./DalalBull.scss";

type Props = {
  match: any;
};

const Dalalbull: FunctionComponent<Props> = (props) => {
  const token = useSelector((store: any) => store.auth.token);
  const [set, setSet] = useState(false);
  useEffect(() => {
    (async () => {
      await dalalbullLogin(token);
      await handshake();
      setSet(true);
    })();
  }, [token]);

  const { match } = props;

  return (
    <div className="dalalbull">
      <DalalbullHeader />
      {
        set && (
          <Switch>
            <Route exact path={`${match.url}/`} component={DalalbullPortfolio} />
            <Route exact path={`${match.url}/rules`} component={DalalbullRules} />
            <Route
              exact
              path={`${match.url}/Portfolio`}
              component={DalalbullPortfolio}
            />
            <Route
              exact
              path={`${match.url}/ranklist`}
              component={DalalbullRanklist}
            />
            <Route exact path={`${match.url}/:cid`} component={DalalbullPlay} />
          </Switch>
        )
      }
    </div>
  );
};

//export default withLogin(Dalalbull);
export default Dalalbull;
