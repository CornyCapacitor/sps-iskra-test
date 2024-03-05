
import supabase from "@/app/config/supabaseClient"

export const createData = async (databaseName: string, updateValue: any, successCallback: VoidFunction) => {
  const { data, error } = await supabase
    .from(databaseName)
    .insert(updateValue)
    .select()

  if (data) {
    successCallback()
  }

  if (error) {
    console.error(error)
  }
}