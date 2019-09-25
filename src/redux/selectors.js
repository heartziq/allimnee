export const sort = (tutor, filter) => {
  // try default (for now)
  const resultList = tutor
    .filter(value =>
      value.name.toLowerCase().includes(filter.tutorName.toLowerCase())
    )
    .filter(value => {
      // logging
      console.log(`value.stars: ${value.stars} >= ${filter.star}`)
      console.log(`result: ${value.stars >= filter.star}`)

      // return
      return value.stars >= filter.star
    })
    .sort((a, b) => {
      return b.stars - a.stars;
    });

  console.log(`star > 5: ${filter.star  }`);

  console.log(`resultList: ${JSON.stringify(resultList)}`)
  return resultList;
};
