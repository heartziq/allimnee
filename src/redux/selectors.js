import moment from "moment";

export const sort = (tutor, filter) => {
  // try default (for now)
  const resultList = tutor
    .filter(value =>
      value.name.toLowerCase().includes(filter.tutorName.toLowerCase())
    )
    .filter(value => value.stars >= filter.star)
    .sort((a, b) => {
      return b.stars - a.stars;
    });

  return resultList;
};

export const sortClass = (classList, filterClass) => {
  console.log(`current .subject: ${filterClass.subject}`);
  const sortedClasslist = classList
    .filter(eachClass => {
      if (filterClass.isBefore) {
        return moment(eachClass.time, "h:mma").isBefore(
          moment(filterClass.time, "H:mma")
        );
      } else {
        return moment(filterClass.time, "H:mma").isBefore(
          moment(eachClass.time, "h:mma")
        );
      }
    })
    .filter(eachClass => {
      if (filterClass.subject.length === 0) return true;

      return filterClass.subject.includes(eachClass.subject);
    })
    .filter(eachClass => {
      if (filterClass.day !== "") {
        const targetString = eachClass.datetime;

        const regex = /[A-Z][a-z]{2}/g;

        const day = targetString.match(regex)[0];

        return day === filterClass.day;
      }

      // if no day filter, return all days
      return true;
    });

  return sortedClasslist;
};
