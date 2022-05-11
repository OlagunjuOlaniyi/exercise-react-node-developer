import * as type from '.';

interface StateProps {
  loading: boolean;
  open: boolean;
  message: string;
  payload: [] | any;
  success: boolean;
}

type TypeProps =
  | 'REQUEST_LOADING'
  | 'CLOSE_ALERT'
  | 'REQUEST_SUCCESS'
  | 'REQUEST_FAILED'
  | 'REQUEST_ERROR';

interface ActionProps {
  type: TypeProps;
  payload?: [];
  message?: any;
}

export const init: StateProps = {
  loading: false,
  open: false,
  message: '',
  payload: [],
  success: false,
};

export const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case type.LOADING:
      return { ...state, open: false };
    case type.SUCCESS:
      return {
        loading: false,
        open: false,
        message: 'success',
        payload: action.payload,
        success: true,
      };
    case type.FAILED:
      return {
        ...state,
        loading: false,
        open: true,
        message: action.message.data.message,
      };
    case type.ERROR:
      return {
        ...state,
        loading: false,
        open: true,
        message: action.message,
      };
    case type.CLOSE_ALERT:
      return { ...state, open: false };
    default:
      return state;
  }
};
