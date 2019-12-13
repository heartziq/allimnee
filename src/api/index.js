import fetch from "isomorphic-fetch";

export const getAllClasses = async (id = "") => {
  const queryParam = id && `id=${id}`;
  const resp = await fetch(`/api/classes?${queryParam}`);
  const result = await resp.json();

  return result;
};
