import supabase from "@/app/config/supabaseClient"

export const uploadImage = async (bucketName: string, id: string | string[], file: File) => {

  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .upload(`${id}`, file)

  if (data) {
    return data
  }

  if (error) {
    console.error(error)
  }
}