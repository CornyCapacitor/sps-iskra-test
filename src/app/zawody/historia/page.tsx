'use client'

import { PageImage } from "@/components/PageImage"
import { getProperDate } from "@/components/getProperDate"
import { useEffect, useState } from "react"

import supabase from "@/app/config/supabaseClient"
import Link from "next/link"

const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([])

  useEffect(() => {
    const header = document.getElementById('scrollTarget')
    if (header) {
      header.scrollIntoView({ behavior: 'smooth' })
    }
  }, [competitions])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('zawody')
        .select()

      if (data) {
        // Sorting by timestamp
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime()
          const dateB = new Date(b.created_at).getTime();
          return dateA - dateB
        })
        setCompetitions(sortedData)
      }

      if (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/competitions.jpg"} />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 id="scrollTarget" className="text-3xl">Wszystkie komunikaty z zawodów</h1>
        <section className="flex w-full xl:w-[50%] flex-col flex-wrap items-start justify-center border-t-2 border-black">
          <div className="flex border-2 w-full border-t-0 border-black">
            <div className="flex items-center justify-center w-[50%] border-r-[1px] p-2 border-black text-wrap text-center">Tytuł komunikatu:</div>
            <div className="flex items-center justify-center w-[50%] border-l-[1px] p-2 border-black text-wrap text-center">Data komunikatu:</div>
          </div>
          {competitions.map((competition) => (
            <Link href="/aktualnosci/[id]" as={`/zawody/${competition.id}`} className="flex border-2 w-full border-t-0 border-black hover:bg-slate-300 transition-[0.2s]" key={competition.id}>
              <div className="flex items-center justify-center w-[50%] border-r-[1px] p-2 border-black text-wrap text-center">{competition.title}</div>
              <div className="flex items-center justify-center w-[50%] border-l-[1px] p-2 border-black text-wrap text-center">{getProperDate(competition.created_at)}</div>
            </Link>
          ))}
        </section>
      </section>
    </main>
  )
}

export default CompetitionsPage
