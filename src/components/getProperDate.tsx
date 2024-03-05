export const getProperDate = (timestamp: string) => {
  const date = new Date(timestamp)

  // Extracting date components
  const day = date.getDate()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  // Creating proper string
  const europeanDateFormat = `${day}/${month}/${year} | ${hours}:${minutes}`
  return europeanDateFormat
}