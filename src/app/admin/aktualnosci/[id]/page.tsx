'use client'

import { properUrl } from '@/components/properUrl'
import { spsIskraAuthAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { changeImage } from '../../utils/changeImage'
import { deleteData } from '../../utils/deleteData'
import { deleteImage } from '../../utils/deleteImage'
import { removeImageLocally } from '../../utils/removeImageLocally'
import { errorSwal, questionSwal, toAdminSuccessSwal } from '../../utils/swals'
import { uploadImage } from '../../utils/uploadImage'

import supabase from '@/app/config/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  const [user] = useAtom(spsIskraAuthAtom)
  const params = useParams()
  const router = useRouter()

  const [data, setData] = useState<News>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(false)

  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [imageToDelete, setImageToDelete] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('aktualnosci')
        .select()
        .eq('id', params.id)

      if (data) {
        setData(data[0])
        setTitle(data[0].title)
        setDescription(data[0].description)
        setImage(data[0].image)
        if (data[0].image) {
          setTempImageUrl(properUrl("aktualnosci", params.id))
        }
      }
    }

    fetchData()
  }, [params.id])

  const handleUpdateChanges = async (e: { preventDefault: VoidFunction }) => {
    e.preventDefault()

    if (!user) { errorSwal("Nie zidentyfikowano użytkownika. Zaloguj się ponownie i spróbuj jeszcze raz.") }

    if (!title || !description) { errorSwal("Nie wypełniłeś właściwych pól poprawnie.") }

    if (title && description) {
      questionSwal(`${file ? "Czy na pewno chcesz zaktualizować tę aktualność i zmienić zdjęcie? W przypadku zmiany zdjęcia na nowe, nie będziesz w stanie odzyskać starego zdjęcia z bazy danych." : "Czy na pewno chcesz zaktualizować tę aktualność?"}`, "Tak", "Wróć", () => {
        updateChanges()
        toAdminSuccessSwal("Aktualność zaktualizowana.", () => router.push('/admin'))
      })
    }
  }

  const updateChanges = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('aktualnosci')
      .update({
        title: title,
        description: description,
        image: image,
      })
      .eq('id', params.id)
      .select()

    if (data) {
      if (imageToDelete) {
        try {
          deleteImage("aktualnosci", params.id)
        } catch (error) {
          console.error(error)
        }
      } else if (file) {
        try {
          await deleteImage("aktualnosci", params.id)
          await uploadImage("aktualnosci", params.id, file)
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

  const handleDeleteNews = (e: { preventDefault: VoidFunction }) => {
    e.preventDefault()

    if (!user) { errorSwal("Nie zidentyfikowano użytkownika. Zaloguj się ponownie i spróbuj jeszcze raz.") }

    questionSwal("Czy na pewno chcesz usunąć tę aktualność?", "Tak", "Nie", () => {
      deleteData("aktualnosci", params.id)
      deleteImage("aktualnosci", params.id)
      toAdminSuccessSwal("Aktualność usunięta pomyślnie.", () => router.push('/admin'))
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

  if (user) {
    return (
      <main className="pt-[300px] min-h-screen flex items-start justify-center bg-gray-800 p-6 text-white text-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md w-[95%] flex flex-col items-center justify-center gap-5">
          <Link href="/admin" className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center">Wróć do panelu administratora</Link>
          <span>Id: {params.id}</span>
          {data && (
            <>
              <input className="w-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł aktualności" />
              <textarea className="w-[350px] min-h-[350px] p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 scrollbar_hidden" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis aktualności" />
              <Image src={tempImageUrl || `/sps-iskra-logo.jpg`} alt="Zdjęcie aktualności" width={350} height={350} className="rounded-lg" />
              <p>Wybierz inne zdjęcie klikając poniżej:</p>
              <input type="file" className="w-[350px] flex items-center justify-center text-center" onChange={handleChangeImage} />
              <button className="w-[350px] p-3 rounded-md bg-slate-600 text-white hover:bg-slate-700 focus:outline-none text-center" onClick={() => handleRemoveImage()}>Usuń zdjęcie z tej aktualności</button>
              <button className="w-[350px] p-3 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none text-center" onClick={(e) => handleUpdateChanges(e)}>Zapisz zmiany</button>
              <button className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" onClick={() => abortChanges()}>Odrzuć zmiany</button>
              <button className="w-[350px] p-3 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none text-center" onClick={(e) => handleDeleteNews(e)}>Usuń aktualność</button>
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
