'use client'

import { PageImage } from "@/components/PageImage"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import supabase from "@/app/config/supabaseClient"
import { properUrl } from "@/components/properUrl"
import Link from "next/link"

const Page = () => {
  const params = useParams()
  const [data, setData] = useState<News | null>(null)

  useEffect(() => {
    const header = document.getElementById('scrollTarget')
    if (header) {
      header.scrollIntoView({ behavior: 'smooth' })
    }
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('szkolenia')
        .select()
        .eq('id', params.id)

      if (data) {
        setData(data[0])
      }
    }

    fetchData()
  }, [params.id])

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={`${data?.image ? properUrl("szkolenia", params.id) : "/trainings.jpg"}`} />
      <section className="flex flex-col flex-wrap gap-5 items-center justify-start p-10 min-h-[500px]">
        <Link className="w-full lg:w-[350px] p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/szkolenia"}>Wróć do szkoleń</Link>
        {data && (
          <>
            <h1 id="scrollTarget" className="text-3xl font-bold">{data.title}</h1>
            <h1 className="flex items-center justify-center text-2xl w-[95%] bg-gray-300 rounded-xl min-h-64 text-center p-10 xl:px-64">{data.description}</h1>
          </>
        )}
      </section>
    </main>
  )
}

export default Page
