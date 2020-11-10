import fetch from "isomorphic-fetch";

export const getAllClasses = async (id = "") => {
  const queryParam = id && `id=${id}`;
  // console.log('queryParam', queryParam)
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