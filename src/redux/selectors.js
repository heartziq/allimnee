import moment from "moment";

export const sort = (tutor, filter) => {
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
      const regex = /\d+(:)\d+[a|p]m/g;
      // filterClass.time
      const found = eachClass.datetime.match(regex);
      const [startTime, endTime] = found;

      if (filterClass.isBefore) {
        return moment(startTime, "h:mma").isBefore(
          moment(filterClass.time, "H:mma")
        );
      } else {
        return moment(startTime, "H:mma").isAfter(
          moment(filterClass.time, "h:mma")
        );
      }
    })
    .filter(eachClass => {
      /* BY SUBJECT(S) */
      if (filterClass.subject.length === 0) return true;

      return filterClass.subject.includes(eachClass.subject);
    })
    .filter(eachClass => {
      /* BY Day */
      if (filterClass.day !== "") {
        const targetString = eachClass.datetime;

        const regex = /[A-Z][a-z]{2}/g;

        const day = targetString.match(regex)[0];

        return day === filterClass.day;
      }

      // if no day filter, return all days
      return true;
    })
    .filter(eachClass => {
      /* BY Level */
      if (filterClass.level > 0) {
        return eachClass.level.includes(filterClass.level);
      }

      return true;
    });

  return sortedClasslist;
};
