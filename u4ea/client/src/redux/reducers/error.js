import { GET_ERRORS } from "../ActionTypes";

const initialState = {};

export default function (state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
