import fetch from "isomorphic-fetch";
import qs from "query-string";

export const getAllClasses = async (param = {}) => {
  
  const queryParam = qs.stringify(param)
  console.log('queryParam', queryParam)
  const resp = await fetch(`/api/classes?${queryParam}`);
  const result = await resp.json();

  return result;
};

export const getTutorNameAndImage = async ids => {
  const resp = await fetch(`/api/tutor?${queryParam}`);
  const result = await resp.json();

  return result;
}

// findone*