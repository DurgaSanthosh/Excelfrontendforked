import React, { FunctionComponent } from 'react';
import './Modal.scss';

type Props = {
  visibility : any,
  setVisibility : any,
  children : any
}

const Modal : FunctionComponent<Props> = ({ visibility, setVisibility, children } : Props) => {
  return (
    <div className="custom-modal" style={{ visibility: visibility }}>
      <span className="close" onClick={() => setVisibility('hidden')}>
        &times;
      </span>
      <div className="content">{children}</div>
    </div>
  );
};

export default Modal;
