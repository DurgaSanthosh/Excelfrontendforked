import React, { useEffect, useState } from "react";
import "../../../App.scss";
import "./KryptosPlay.scss";
import KryptosInfoBar from "../KryptosInfoBar/KryptosInfoBar";
import KryptosQuestion from "../KryptosQuestion/KryptosQuestion";
import KryptosHintModal from "../KryptosHintModal/KryptosHintModal";
import KryptosRanklist from "../KryptosRanklist/KryptosRanklist";
import {
  MESSAGE_WHEN_CORRECT_ANSWER,
  MESSAGE_WHEN_WRONG_ANSWER,
  //NO_HINTS,
} from "../../../components/common/Constants";
import { fetchQuestion } from "../KryptosApi/ApiCalls";
import { useSelector, useDispatch } from "react-redux";
import { rootType } from "../../../store/Reducers/rootReducer";
import { submitKryptosAnswer } from "../KryptosApi/ApiCalls";
import { selectKryptosQuestion } from "../../../store/KryptosReducer/Kryptos.selectors";
import { setKryptosQuestion } from "../../../store/KryptosReducer/Kryptos.actions";

interface Props {
  showRanklist: boolean;
}

const KryptosPlay = (props: Props) => {
  //=====FOR USING DUMMY DATA==========//
  const [rank, setRank] = useState(0);

  const {
    question: sourceHint,
    level_file: imgUrl,
    image_level,
    hints: hintText,
    number: level,
  } = useSelector(selectKryptosQuestion);

  const dispatch = useDispatch();

  const [gameOver, setGameOver] = useState(false);

  const token = useSelector((store: rootType) => store.auth.token);
  useEffect(() => {
    fetchQuestion(token).then((data) => {
      // console.log(data);
      if (data.number == -1) {
        // window.alert("Congratulations for completing Kryptos 2020");
        // setTimeout(() => {
        //   window.location.replace('/');
        // }, 1000);
        setGameOver(true);
      }
      dispatch(setKryptosQuestion(data));
      // if(data.image_level==true){
      //   setImgUrl(data.level_file);
      //   setSourceHint(data.hints);
      // }
      // else{
      //   setSourceHint(data.hints);
      // }
    });
  }, [dispatch, token]);

  const [loading, setLoading] = useState(false);

  const onSubmit = (ans: string) => {
    setLoading(true);
    submitKryptosAnswer(ans, token).then((data) => {
      // console.log(data);
      if (data.answer === "correct") {
        window.alert(MESSAGE_WHEN_CORRECT_ANSWER);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        window.alert(MESSAGE_WHEN_WRONG_ANSWER);
      }
      setLoading(false);
    });
    //====TEMPORARY, CHECKING IF ANSWER IS CORRECT====//
    // if (ans === "correct") {
    //   window.alert(MESSAGE_WHEN_CORRECT_ANSWER);
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
    // } else {
    //   window.alert(MESSAGE_WHEN_WRONG_ANSWER);
    // }
  };

  if (gameOver) {
    return <GameOverComponent />;
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          {/* <KryptosInfoBar level={level} rank={rank} /> */}
        </div>
      </div>
      <div className="kryptos-page row">
        <div className={"col-lg-4"}>
          <KryptosInfoBar level={level} rank={rank} />
        </div>
        <div className="col-lg-4">
          <KryptosQuestion
            image_level={image_level}
            imgUrl={imgUrl}
            sourceHint={sourceHint}
            onSubmit={(ans: string) => onSubmit(ans)}
            loading={loading}
          />
        </div>
        <div className={"abs-rank"} style={{ width: "30vw" }}>
          <span className="rank">
            <KryptosRanklist showRanklist={props.showRanklist} />
          </span>
        </div>
      </div>
      <KryptosHintModal hintText={hintText} />
    </div>
  );
};

export default KryptosPlay;

const GameOverComponent = () => (
  <div className={"container winner-screen"}>
    <div className={"row"}>
      <div className={"col text-center"}>
        <p className={"font-weight-bold title mt-md-5 pt-5"}>
          Congratulations on Completing Kryptos 2020!
        </p>
        <p className={"caption mt-3 mb-3"}>Thank you for playing!</p>
      </div>
    </div>
    <div className={"row top-blue w-100 ml-0 mt-2"}>
      <KryptosRanklist />
    </div>
  </div>
);
