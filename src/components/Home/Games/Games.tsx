import React from "react";
import "./Games.scss";

interface Props {
  type: string;
  rank?: number;
  status: string;
  logo: string;
  name: string;
  href?: string;
  index: number;
  isDisabled?: boolean;
}

const newCard = () => {
  return <div></div>;
};

const Games: React.FunctionComponent<Props> = (props) => {
  const rank = () => {
    if (props.type === "ranked") {
      return (
        <div className="rankDiv">

          <div className="RankValue">Rank {props.rank}</div>
        </div>
      );
    }
    // return <div className="PlayNow">{props.status}</div>;
  };
  if (props.status == "Play Now") {
    var isclass: Boolean = true;
  }

  return (
    <a style={{ textDecoration: 'none' }} href={props.href}>
      <div className="gamecell__container">
        <div
          className={`games position-relative ${props.isDisabled ? "disabled-game bg-5" : `bg-${props.index}`
            }`}
        >
          <div className="gameCell">
            <div className={"pic-box"}>
              <img src={props.logo} alt="" className="pic" />
            </div>

            <div className="Rankdetail">
              <div className={"title"}>{props.name}</div>
              <div className="rank__container">

                <div className=""> {rank()} </div> <div
                  // className={"play-button"}
                  className={`${props.status == "Play Now" ? "play-button" : "play-button2"}`}


                >{props.status}</div></div>



            </div>
          </div>

        </div>
      </div>
    </a>
  );
};

export default Games;
