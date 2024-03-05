import supabase from "@/app/config/supabaseClient"

export const deleteData = async (databaseName: string, id: string | string[]) => {
  const { data, error } = await supabase
    .from(databaseName)
    .delete()
    .eq('id', id)

  if (data) {
    return data
  }

  if (error) {
    console.error(error)
  }
}