import { useReducer, useEffect, useRef } from 'react';
import { init, reducer } from '../../reducers/get-array';
import * as type from '../../reducers/action-type';
import { Repositories } from '../../services/api';

function Request() {
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: type.CLOSE_ALERT });
  };

  const [state, dispatch] = useReducer(reducer, init);

  const mounted = useRef(true);
  useEffect((): any => {
    dispatch({ type: type.LOADING });
    Repositories().then(
      (res) => {
        if (mounted.current) {
          if (res.status === 200) {
            dispatch({ type: type.SUCCESS, payload: res.data });
          } else {
            dispatch({ type: type.FAILED, message: res });
          }
        }
      },
      () => {
        if (mounted.current) {
          dispatch({ type: type.ERROR, message: 'Something went wrong' });
        }
      }
    );
    return () => (mounted.current = false);
  }, []);

  return { state, handleClose };
}

export default Request;
