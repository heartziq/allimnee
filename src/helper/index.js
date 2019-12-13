export const getRandomImage = async () => {
  const response = await fetch("https://randomuser.me/api/?results=1");
  const result = await response.json();

  const {
    picture: { medium }
  } = result.results[0];

  return medium;
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
