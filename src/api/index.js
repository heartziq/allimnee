import fetch from 'isomorphic-fetch';


export const getAllClasses = async () => {
  const resp = await fetch('/api/classes');
  const result = await resp.json();

  return result;
}