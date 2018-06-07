export const timeFilter = value => {
  var length = Math.floor(value)
  var minute = Math.floor(value / 60)
  var hours = Math.floor(minute / 60)
  minute = ('' + minute).padStart(2, '0')
  hours = ('' + hours).padStart(2, '0')
  var second = length % 60
  second = ('' + second).padStart(2, '0')
  return hours + ':' + minute + ':' + second
}
