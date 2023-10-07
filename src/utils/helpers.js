export function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = months[newDate.getMonth()]

  return `${month} ${day}`
}
