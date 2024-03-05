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
  const [aspect, setAspect] = useState("")

  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleCreateTraining = async (e: { preventDefault: VoidFunction }) => {
    e.preventDefault()

    if (!user) { errorSwal("Nie zidentyfikowano użytkownika. Zaloguj się ponownie i spróbuj jeszcze raz.") }

    if (!title || !description || aspect) { errorSwal("Nie wypełniłeś właściwych pól poprawnie.") }

    if (title && description && aspect && !file) { questionSwal("Czy na pewno nie chcesz załączać zdjęcia do tego szkolenia?", "Tak", "Nie", createTraining) }

    if (title && description && aspect && file) { questionSwal("Czy jesteś pewien, że wszystkie pola wypełniłeś poprawnie? Chcesz opublikować tworzone szkolenie?", "Tak", "Nie", createTraining) }
  }

  const createTraining = () => {
    if (!user) return

    const shortid = require('shortid')
    const uniqueId = shortid.generate()

    const updateValue = { id: uniqueId, title: title, description: description, who: user.user_metadata?.username, image: file ? true : false, aspect: aspect }

    const successCallback = () => {
      toAdminSuccessSwal("Opublikowano nowe szkolenie pomyślnie.", () => router.push('/admin'))
    }

    createData("szkolenia", updateValue, successCallback)

    if (file) {
      uploadImage("szkolenia", uniqueId, file)
    }
  }

  const abortTraining = () => {
    questionSwal("Czy na pewno chcesz odrzucić wprowadzone zmiany? Jeśli tak, wprowadzone dane zostanę utracone.", "Tak", "Nie", () => { router.push('/admin') })
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeImage(e, setFile, setTempImageUrl)
  }

  if (user) {
    return (
      <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
          <span>Stwórz nowe szkolenie:</span>
          <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
          <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł szkolenie" />
          <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis szkolenia" />
          <select className="custom_select" value={aspect} onChange={(e) => setAspect(e.target.value)}>
            <option value="" disabled className="text-gray">Wybierz rodzaj szkolenia</option>
            <option value="cywilne" className="text-black">Szkolenie dla osób cywilnych</option>
            <option value="mundurowe" className="text-black">Szkolenie dla służb mundurowych</option>
            <option value="proobronne" className="text-black">Szkolenie proobronne</option>
            <option value="dlaczlonkow" className="text-black">Szkolenie dla członków stowarzyszenia</option>
          </select>
          <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie szkolenia" width={350} height={350} className="rounded-lg" />
          <p>Wybierz zdjęcie klikając poniżej:</p>
          <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={handleChangeImage} />
          <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={(e) => handleCreateTraining(e)}>Stwórz szkolenie</button>
          <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={() => abortTraining()}>Odrzuć tworzone szkolenie</button>
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