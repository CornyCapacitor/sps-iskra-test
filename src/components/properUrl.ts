export const properUrl = (type: string, id: string | string[]) => {
  const randomParam = "?_" + new Date().getTime()

  if (type === "aktualnosci") {
    const newsImageUrl = `https://mlgdboblxxbeaippvitv.supabase.co/storage/v1/object/public/aktualnosci/${id}`
    return newsImageUrl + randomParam
  } else if (type === "szkolenia") {
    const trainingsImageUrl = `https://mlgdboblxxbeaippvitv.supabase.co/storage/v1/object/public/szkolenia/${id}`
    return trainingsImageUrl + randomParam
  } else if (type === "zawody") {
    const competitionsImageUrl = `https://mlgdboblxxbeaippvitv.supabase.co/storage/v1/object/public/zawody/${id}`
    return competitionsImageUrl + randomParam
  } else if (type === "wspierajacy") {
    const helpersImageUrl = `https://mlgdboblxxbeaippvitv.supabase.co/storage/v1/object/public/wspierajacy/${id}`
    return helpersImageUrl + randomParam
  }

  return ""
}