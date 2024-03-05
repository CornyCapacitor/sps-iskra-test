'use client'

import { spsIskraAuthAtom } from "@/state/atoms"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { changeImage } from "../../utils/changeImage"
import { createData } from "../../utils/createData"
import { errorSwal, questionSwal, toAdminSuccessSwal } from "../../utils/swals"
import { uploadImage } from "../../utils/uploadImage"

import Image from "next/image"
import Link from "next/link"

const Page = () => {
  const [user] = useAtom(spsIskraAuthAtom)
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleCreateCompetition = async (e: { preventDefault: VoidFunction }) => {
    e.preventDefault()

    if (!user) { errorSwal("Nie zidentyfikowano użytkownika. Zaloguj się ponownie i spróbuj jeszcze raz.") }

    if (!title || !description) { errorSwal("Nie wypełniłeś właściwych pól poprawnie.") }

    if (title && description && !file) { questionSwal("Czy na pewno nie chcesz załączać zdjęcia do tego komunikatu?", "Tak", "Nie", createCompetition) }

    if (title && description && file) { questionSwal("Czy jesteś pewien, że wszystkie pola wypełniłeś poprawnie? Chcesz opublikować tworzony komunikat?", "Tak", "Nie", createCompetition) }
  }

  const createCompetition = () => {
    if (!user) return

    const shortid = require('shortid')
    const uniqueId = shortid.generate()

    const updateValue = { id: uniqueId, title: title, description: description, who: user.user_metadata?.username, image: file ? true : false }

    const successCallback = () => {
      toAdminSuccessSwal("Opublikowano nowy komunikat pomyślnie.", () => router.push('/admin'))
    }

    createData("zawody", updateValue, successCallback)

    if (file) {
      uploadImage("zawody", uniqueId, file)
    }
  }

  const abortCompetition = () => {
    questionSwal("Czy na pewno chcesz odrzucić wprowadzone zmiany? Jeśli tak, wprowadzone dane zostanę utracone.", "Tak", "Nie", () => { router.push('/admin') })
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeImage(e, setFile, setTempImageUrl)
  }

  if (user) {
    return (
      <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
          <span>Stwórz nowy komunikat z zawodów:</span>
          <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
          <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł komunikatu z zawodów" />
          <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis komunikatu z zawodów" />
          <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie komunikatu z zawodów" width={350} height={350} className="rounded-lg" />
          <p>Wybierz zdjęcie klikając poniżej:</p>
          <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={handleChangeImage} />
          <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={(e) => handleCreateCompetition(e)}>Stwórz komunikat z zawodów</button>
          <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={() => abortCompetition()}>Odrzuć tworzony komunikat z zawodów</button>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
      <span className="text-2xl">Prawdopodobnie nie powinno cię tu być.</span>
    </main>
  )
}

export default Page