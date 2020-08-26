import { SET_STUDENT_INFO, API, FETCH_STUDENT_INFO, SET_STUDENT_TAG } from "./types";
export function addTag(payload) {
  return {
    type: SET_STUDENT_TAG,
    payload: payload,
  };
}
export function fetchStudentInfo() {
  return apiAction({
    url: "https://www.hatchways.io/api/assessment/students",
    onSuccess: setStudentInfo,
    onFailure: () => console.log("Error occured loading articles"),
    label: FETCH_STUDENT_INFO
  });
}

function setStudentInfo(data) {
  return {
    type: SET_STUDENT_INFO,
    payload: data
  };
}

function apiAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headersOverride = null
}) {
  console.log(url)
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}
