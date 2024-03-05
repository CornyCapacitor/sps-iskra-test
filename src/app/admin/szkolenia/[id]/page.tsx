'use client'

import { properUrl } from '@/components/properUrl'
import { spsIskraAuthAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import supabase from '@/app/config/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { changeImage } from '../../utils/changeImage'
import { deleteData } from '../../utils/deleteData'
import { deleteImage } from '../../utils/deleteImage'
import { removeImageLocally } from '../../utils/removeImageLocally'
import { errorSwal, questionSwal, toAdminSuccessSwal } from '../../utils/swals'
import { uploadImage } from '../../utils/uploadImage'

const Page = () => {
  const [user] = useAtom(spsIskraAuthAtom)
  const params = useParams()
  const router = useRouter()

  const [data, setData] = useState<Training>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [aspect, setAspect] = useState("")
  const [image, setImage] = useState(false)

  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [imageToDelete, setImageToDelete] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('szkolenia')
        .select()
        .eq('id', params.id)

      if (data) {
        setData(data[0])
        setTitle(data[0].title)
        setDescription(data[0].description)
        setImage(data[0].image)
        setAspect(data[0].aspect)
        if (data[0].image) {
          setTempImageUrl(properUrl("szkolenia", params.id))
        }
      }
    }

    fetchData()
  }, [params.id])

  const handleUpdateChanges = async (e: { preventDefault: VoidFunction }) => {
    e.preventDefault()

    if (!user) { errorSwal("Nie zidentyfikowano użytkownika. Zaloguj się ponownie i spróbuj jeszcze raz.") }

    if (!title || !description || !aspect) { errorSwal("Nie wypełniłeś właściwych pól poprawnie.") }

    if (title && description && aspect) {
      questionSwal(`${file ? "Czy na pewno chcesz zaktualizować to szkolenie i zmienić zdjęcie? Nie będziesz w stanie odzyskać z bazy danych starego zdjęcia." : "Czy na pewno chcesz zaktualizować to szkolenie?"}`, "Tak", "Wróć", () => {
        updateChanges()
        toAdminSuccessSwal("Aktualnośc zaktualizowana.", () => router.push('/admin'))
      })
    }
  }

  const updateChanges = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('szkolenia')
      .update({
        title: title,
        description: description,
        image: image,
        aspect: aspect,
      })
      .eq('id', params.id)
      .select()

    if (data) {
      if (imageToDelete) {
        try {
          deleteImage("szkolenia", params.id)
        } catch (error) {
          console.error(error)
        }
      } else if (file) {
        try {
          await deleteImage("szkolenia", params.id)
          await uploadImage("szkolenia", params.id, file)
        } catch (error) {
          console.error(error)
        }
      }

      return
    }

    if (error) {
      console.error(error)
    }
  }

  const abortChanges = () => {
    questionSwal("Czy na pewno chcesz odrzucić wprowadzone zmiany? Jeśli tak, wprowadzone dane zostanę utracone.", "Tak", "Nie", () => { router.push('/admin') })
  }

  const handleDeleteTraining = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault()

    if (!user) { errorSwal("Nie zidentyfikowano użytkownika. Zaloguj się ponownie i spróbuj jeszcze raz.") }

    questionSwal("Czy na pewno chcesz usunąć to szkolenie?", "Tak", "Nie", () => {
      deleteData("szkolenia", params.id)
      deleteImage("szkolenia", params.id)
      toAdminSuccessSwal("Szkolenie usunięte pomyślnie.", () => router.push('/admin'))
    })
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeImage(e, setFile, setTempImageUrl)
    setImage(true)
  }

  const handleRemoveImage = () => {
    removeImageLocally(() => {
      setTempImageUrl("")
      setImageToDelete(true)
      setImage(false)
    })
  }

  <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
    <span className="text-2xl">Prawdopodobnie nie powinno cię tu być.</span>
  </main>

  if (user) {
    return (
      <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
          <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
          <span>Id: {params.id}</span>
          {data && (
            <>
              <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł szkolenia" />
              <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis szkolenia" />
              <select className="custom_select" value={aspect} onChange={(e) => setAspect(e.target.value)}>
                <option value="" disabled className="text-gray">Wybierz rodzaj szkolenia</option>
                <option value="cywilne" className="text-black">Szkolenie dla osób cywilnych</option>
                <option value="mundurowe" className="text-black">Szkolenie dla służb mundurowych</option>
                <option value="proobronne" className="text-black">Szkolenie proobronne</option>
                <option value="dlaczlonkow" className="text-black">Szkolenie dla członków stowarzyszenia</option>
              </select>
              <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie szkolenia" width={350} height={350} className="rounded-lg" />
              <p>Wybierz inne zdjęcie klikając poniżej:</p>
              <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={handleChangeImage} />
              <button className="w-[350px] p-3 rounded-md bg-slate-600 text-white hover:bg-slate-700 focus:outline-none text-center" onClick={() => handleRemoveImage()}>Usuń zdjęcie z tego szkolenia</button>
              <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={(e) => handleUpdateChanges(e)}>Zapisz zmiany</button>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => abortChanges()}>Odrzuć zmiany</button>
              <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={(e) => handleDeleteTraining(e)}>Usuń szkolenie</button>
            </>
          )}
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
