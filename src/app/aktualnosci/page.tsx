'use client'

import { PageImage } from "@/components/PageImage"
import { useEffect, useState } from "react"

import AppCard from "@/components/AppCard"
import Link from "next/link"
import supabase from "../config/supabaseClient"

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('aktualnosci')
        .select()

      if (data) {
        // Sorting by timestamp
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime()
          const dateB = new Date(b.created_at).getTime();
          return dateA - dateB
        })
        setNews(sortedData.slice(0, 10))
      }

      if (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/news.jpg"} />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Ostatnie aktualności</h1>
        <section className="flex flex-wrap gap-5 items-start justify-center p-10">
          {news.map((news) => (
            <AppCard key={news.id} {...news} type="aktualnosci" />
          ))}
        </section>
        {news.length >= 10 && (
          <Link href="/aktualnosci/historia" className="w-[350px] p-3 rounded-md bg-gray-600 text-white hover:bg-gray-500 focus:outline-none text-center">Zobacz więcej aktualności</Link>
        )}
      </section>
    </main>
  )
}

export default NewsPage
