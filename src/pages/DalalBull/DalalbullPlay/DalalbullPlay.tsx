import React, { useEffect, useState, FunctionComponent } from "react";
import Ticker from "../DalalbullComponents/Ticker/Ticker";
import ListCompanies from "../DalalbullComponents/ListCompanies/ListCompanies";
import ShareDetails from "../DalalbullComponents/ShareDetails/ShareDetails";
import GraphAndStatus from "../DalalbullComponents/GraphAndStatus/GraphAndStatus";
import Modal from "../DalalbullComponents/Modal/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { setShareDetails, 
         setGraphData,
         setDashboardDetails,
         setPortfolioDetails } from '../../../store/DalalbullReducer/Dalalbull.Actions';
import { selectShareDetails, 
         selectGraphData,
         selectDashboardDetails,
         selectPortfolioDetails } from '../../../store/DalalbullReducer/Dalalbull.Selectors';
import "./DalalbullPlay.scss";
import {
  getCompanyDetails,
  getPortfolio,
  getDashboard,
  getGraphData,
  getGraphSock ,
  getPortfolioSock
} from "../DalalbullComponents/apicalls/apicalls";

type Props = {
  match: any;
};

const DalalbullPlay: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const shareDetails = useSelector(selectShareDetails);
  // const [shareDetails, setShareDetail] = useState(null);
  const [modalVisibility, setModalVisibility] = useState("visible");
  const portfolioDetails = useSelector(selectPortfolioDetails);
  // const [portfolioDetails, setPortfolioDetails] = useState(null);
  const dashboard = useSelector(selectDashboardDetails);
  // const [dashboard, setDashboardDetail] = useState([]);
  const graphData = useSelector(selectGraphData);
  // const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    getCompanyDetails(props.match.params.cid).then((res) => {
      // setShareDetail(res);
      dispatch(setShareDetails(res));
      setModalVisibility("visible");
      getGraphData(res.symbol).then((res) => {
        // console.log(res.graph_data);
        dispatch(setGraphData(res.graph_data));
        // setGraphData(res.graph_data)
      });
    });
    // const data:any = getCompanyDetails();
    // setShareDetails(data);
    // setModalVisibility("visible")

  }, [dispatch, props.match.params.cid]);
  // TODO : Don't delete comments
  useEffect(() => {
    const graphSock = getGraphSock();
    graphSock.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      // console.log(data);
    });
    return () => {
      graphSock.close();
    }
  }, [props.match.params.cid]);
  useEffect(() => {
    getPortfolio().then((res) => {
      // console.log(res);
      // setPortfolioDetails(res);
      dispatch(setPortfolioDetails(res));
    });
    // const data : any = getPortfolio();
    // setPortfolioDetails(data)
  }, [dispatch]);
  // TODO : Don't delete comments
  useEffect(() => {
    const portSock = getPortfolioSock();
    portSock.addEventListener('message', e => {
      console.log('Message from server ', e.data);
    });
    return () => {
      portSock.close();
    };
  }, []);

  useEffect(() => {
    getDashboard().then((res) => {
      // console.log(res);
      // setDashboardDetail(res);
      dispatch(setDashboardDetails(res));
    });
  }, [dispatch]);
  return (
    <div className="dalalbull-play">
      <Ticker />
      <div className="content">
        <div className="row">
          <div className="col-lg-3">
            <ListCompanies />
          </div>
          <div className="col-lg-5 d-none d-lg-block">
            <ShareDetails
              {...shareDetails}
              {...portfolioDetails}
              {...dashboard}
              // setPortfolioDetails={setPortfolioDetails}
              // setDashboardDetails={setDashboardDetail}
            />
          </div>
          <div className="mobile-share-details">
            <Modal
              visibility={modalVisibility}
              setVisibility={setModalVisibility}
            >
              <ShareDetails
                {...shareDetails}
                {...portfolioDetails}
                {...dashboard}
                // setPortfolioDetails={setPortfolioDetails}
                // setDashboardDetails={setDashboardDetail}
              />
            </Modal>
          </div>
          <div className="col-lg-4">
            <GraphAndStatus {...shareDetails} graphData={graphData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DalalbullPlay;
