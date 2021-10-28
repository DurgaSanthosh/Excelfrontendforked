import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import configs from '../../config/auth_config';
const config = configs();

const Authorisation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function receiveMessage(event: any) {
      if (typeof event.data == 'string' && event.data.length !== 0) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { token: event.data },
        });
      } else if (event.data === null) {
        dispatch({
          type: 'AUTH_FAIL',
          payload: { token: null },
        });
      };
    };
    window.addEventListener("message", receiveMessage);
  }, []);

  return (
    <iframe
      title="authorize"
      style={{ display: "none" }}
      id="content"
      src={config.AUTH_ROOT + "auth/authorize"}
      width="0"
      height="0"
    >
    </iframe>
  );
};

export default Authorisation;
