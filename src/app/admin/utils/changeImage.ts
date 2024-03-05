export const changeImage = (
  e: React.ChangeEvent<HTMLInputElement>,
  fileSetter: React.Dispatch<React.SetStateAction<File | null>>,
  tempImageUrlSetter: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const file = e.target.files?.[0]
  if (!file) return

  fileSetter(file)

  const reader = new FileReader()
  reader.onload = (event) => {
    if (event.target) {
      tempImageUrlSetter(event.target.result as string)
    }
  }
  reader.readAsDataURL(file)
}