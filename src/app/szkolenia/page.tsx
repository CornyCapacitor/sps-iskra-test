'use client'

import { PageImage } from "@/components/PageImage"
import { SectionSeparator } from "@/components/SectionSeparator"
import { useEffect, useState } from "react"

import AppCard from "@/components/AppCard"
import supabase from "../config/supabaseClient"

const TrainingsPage = () => {
  const [civilTrainings, setCivilTrainings] = useState<Training[]>([])
  const [uniformedTrainings, setUniformedTrainings] = useState<Training[]>([])
  const [proDefenseTrainings, setProDefenseTrainings] = useState<Training[]>([])
  const [memberTrainings, setMemberTrainings] = useState<Training[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('szkolenia')
        .select()

      if (data) {
        const civilTrainingsData = data.filter(training => training.aspect === 'cywilne')
        const uniformedTrainingsData = data.filter(training => training.aspect === 'mundurowe')
        const proDefenseTrainingsData = data.filter(training => training.aspect === 'proobronne')
        const memberTrainingsData = data.filter(training => training.aspect === 'dlaczlonkow')
        setCivilTrainings(civilTrainingsData)
        setUniformedTrainings(uniformedTrainingsData)
        setProDefenseTrainings(proDefenseTrainingsData)
        setMemberTrainings(memberTrainingsData)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/trainings.jpg"} />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Szkolenia dla osób cywilnych</h1>
        <section className="flex flex-wrap gap-5 items-start justify-center p-10">
          {civilTrainings.map((training) => (
            <AppCard key={training.id} {...training} type="szkolenia" />
          ))}
        </section>
      </section>
      <SectionSeparator />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Szkolenia dla służb mundurowych</h1>
        <section className="flex flex-wrap gap-5 items-start justify-center p-10">
          {uniformedTrainings.map((training) => (
            <AppCard key={training.id} {...training} type="szkolenia" />
          ))}
        </section>
      </section>
      <SectionSeparator />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Szkolenia proobronne</h1>
        <section className="flex flex-wrap gap-5 items-start justify-center p-10">
          {proDefenseTrainings.map((training) => (
            <AppCard key={training.id} {...training} type="szkolenia" />
          ))}
        </section>
      </section>
      <SectionSeparator />
      <section className="flex flex-col gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Szkolenia dla członków stowarzyszenia</h1>
        <section className="flex flex-wrap gap-5 items-start justify-center p-10">
          {memberTrainings.map((training) => (
            <AppCard key={training.id} {...training} type="szkolenia" />
          ))}
        </section>
      </section>
    </main>
  )
}

export default TrainingsPage
