'use client'

import { PageImage } from "@/components/PageImage"
import { useEffect, useState } from "react"

import AppCard from "@/components/AppCard"
import Link from "next/link"
import supabase from "../config/supabaseClient"

const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('zawody')
        .select()

      if (data) {
        // Sorting by timestamp
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime()
          const dateB = new Date(b.created_at).getTime();
          return dateA - dateB
        })
        setCompetitions(sortedData.slice(0, 10))
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/competitions.jpg"} />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Komunikaty z zawodów</h1>
        <section className="flex flex-wrap gap-5 items-start justify-center p-10">
          {competitions.map((competitions) => (
            <AppCard key={competitions.id} {...competitions} type="zawody" />
          ))}
        </section>
        {competitions.length >= 10 && (
          <Link href="/zawody/historia" className="w-[350px] p-3 rounded-md bg-gray-600 text-white hover:bg-gray-500 focus:outline-none text-center">Zobacz więcej komunikatów z zawodów</Link>
        )}
      </section>
    </main>
  )
}

export default CompetitionsPage
