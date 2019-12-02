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
  const sortedClasslist = classList
    .filter(eachClass => {
      if (filterClass.beforeOrAfter === "before") {
        return moment(filterClass.time, "H:mma").isBefore(
          moment(eachClass.time, "h:mma")
        );
      } else {
        return moment(filterClass.time, "H:mma").isAfter(
          moment(eachClass.time, "h:mma")
        );
      }
    })
    .filter(eachClass =>
      eachClass.subject.toLowerCase().includes(filterClass.subject)
    );

  return sortedClasslist;
};
