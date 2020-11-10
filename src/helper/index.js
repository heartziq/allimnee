export const getRandomImage = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=1");
    // console.log('response:' , response.ok)
    if (!response.ok)
      throw Error(response.statusText)
    const result = await response.json();

    const {
      picture: { medium }
    } = result.results[0];

    return medium;
  } catch (error) {
    console.error(error);
  }
};

export const isBrowser = () => {
  try {
    if (window || document)
      return true;
  } catch (error) {
    console.error('Server does not have access to window or document');
    return false;
  }
}
