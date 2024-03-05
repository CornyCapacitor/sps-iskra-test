import { questionSwal } from "./swals"

export const removeImageLocally = (resultFunc: any) => {
  questionSwal("Czy na pewno chcesz usunąć zdjęcie z tej aktualizacji?", "Tak", "Nie", () => { resultFunc })
}