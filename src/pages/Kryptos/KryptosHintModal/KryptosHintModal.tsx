import React, {FunctionComponent} from 'react';
import './KryptosHintModal.scss';
//import { any } from 'prop-types';

type Props = {
  hintText: string[]
}

const KryptosHintModal : FunctionComponent<Props> = (props) => {
  const { hintText } = props;

  const hints = () => {
    const hintList: JSX.Element[] = [];
    hintText?.forEach((h, i) => {
      hintList.push(<li key={i}>{h}</li>);
    });
    return (
      <div>
        <ul>{hintList.length > 0 ? hintList : <li>Stay tuned for hints!</li>}</ul>
      </div>
    );
  };

  return (
    <div id="hint-modal" className="modal fade" role="dialog">
      {/* Modal triggered by view hint button in KryptosQuestion */}
      <div className="modal-dialog">
        <div className="modal-content">{hints()}</div>
      </div>
    </div>
  );
};

export default KryptosHintModal;
