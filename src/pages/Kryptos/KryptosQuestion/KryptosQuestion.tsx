import React, { useState } from 'react';
import './KryptosQuestion.scss';
import { IMAGE_FAILED_TO_LOAD } from '../../../components/common/Constants';

type Props = {
  imgUrl:string
  sourceHint: string
  onSubmit: any
  image_level: boolean
  loading: boolean
}

const KryptosQuestion = (props: Props) => {
  const [text, setText] = useState('');
  const { imgUrl, sourceHint, onSubmit, image_level } = props;

  return (
    <div className="questionWrapper pb-5">
      {image_level ? (
        <img
          src={imgUrl}
          alt={IMAGE_FAILED_TO_LOAD}
          className="img img-fluid"
        />
      ) : null}
      <div className="sourceHint">{sourceHint}</div>
      <div className="answerWrapper">
        <input
          className="answer"
          placeholder="YOUR ANSWER..."
          style={{ textTransform: "lowercase" }}
          onChange={(txt: { target: { value: string; }; }) => setText(txt.target.value.toLowerCase())}
        />
        <button
          disabled={props.loading}
          type="button"
          className="btn btn-primary"
          onClick={() => onSubmit(text)}
        >
          SUBMIT
        </button>
      </div>
      <button
        type="button"
        className="btn font-weight-bold border-0 mt-5 btn-outline-primary"
        data-toggle="modal"
        data-target="#hint-modal"
      >
        View Hints
      </button>
    </div>
  );
};

export default KryptosQuestion;
