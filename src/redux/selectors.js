export const sort = (tutor) => {
  // try default (for now)
  return tutor.sort((a, b) => {
    return b.stars - a.stars
  })
}