export const getRandomImage = async () => {
  const response = await fetch("https://randomuser.me/api/?results=1");
  const result = await response.json();

  const {
    picture: { medium }
  } = result.results[0];

  return medium;
};
