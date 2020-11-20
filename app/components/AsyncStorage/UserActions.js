import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT} from './SwitchTypes';

export const fetchusertoken = (userToken) => {
  return {
    type: RESTORE_TOKEN,
    token: userToken,
  };
};

export const fetchsignin = (userToken) => {
  return {
    type: SIGN_IN,
    token: userToken,
  };
};

export const fetchsignout = () => {
  return {
    type: SIGN_OUT,
  };
};
