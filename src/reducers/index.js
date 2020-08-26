import {
  SET_STUDENT_INFO,
  SET_STUDENT_TAG,
  API_START,
  API_END,
  FETCH_STUDENT_INFO
} from "../actions/types";

export default function(state = {}, action) {
  console.log("action type => ", action.type);
  switch (action.type) {
    case SET_STUDENT_TAG:
      const {students} = state.data;
      const data = students.map(item => {
        if(item.id === action.payload.id){
          item.tags = item.tags || [];
          item.tags.push(action.payload.text);
          return item;
        }
        else return item;
      })
      return {data: {students: data}}
    case SET_STUDENT_INFO:
      return { data: action.payload };
    case API_START:
      if (action.payload === FETCH_STUDENT_INFO) {
        return {
          ...state,
          isLoadingData: true
        };
      }
      break;
    case API_END:
      if (action.payload === FETCH_STUDENT_INFO) {
        return {
          ...state,
          isLoadingData: false
        };
      }
      break;
    default:
      return state;
  }
}
