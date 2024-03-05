import supabase from "@/app/config/supabaseClient"

export const deleteImage = async (databaseName: string, id: string | string[]) => {
  const { data, error } = await supabase
    .storage
    .from(databaseName)
    .remove([`${id}`])

  if (data) {
    return data
  }

  if (error) {
    console.error(error)
  }
}