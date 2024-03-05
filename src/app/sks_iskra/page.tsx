'use client'

import { PageImage } from "@/components/PageImage"

import Image from "next/image"
import Swal from "sweetalert2"

const page = () => {
  const handleDocumentClick = (type: string) => {
    if (type === "deklaracja") {
      Swal.fire({
        color: "#fff",
        background: "#111827",
        title: 'Czy na pewno chcesz pobrać deklarację członkowską?',
        showConfirmButton: true,
        confirmButtonText: "Tak",
        confirmButtonColor: "#000fe2",
        showCancelButton: true,
        cancelButtonText: "Nie",
      }).then((result) => {
        if (result.isConfirmed) {
          const link = document.createElement('a');
          link.href = 'deklaracja-czlonkowska-sks-iskra-zatwierdzona.docx'
          link.setAttribute('download', 'deklaracja-czlonkowska-sks-iskra-zatwierdzona.docx')
          document.body.appendChild(link)
          link.click();
          document.body.removeChild(link);
        }
      })
    } else if (type === "regulamin") {
      Swal.fire({
        color: "#fff",
        background: "#111827",
        title: 'Czy na pewno chcesz pobrać regulamin?',
        showConfirmButton: true,
        confirmButtonText: "Tak",
        confirmButtonColor: "#000fe2",
        showCancelButton: true,
        cancelButtonText: "Nie",
      }).then((result) => {
        if (result.isConfirmed) {
          const link = document.createElement('a');
          link.href = 'regulamin-stowarzyszenia-sks-iskra.pdf'
          link.setAttribute('download', 'regulamin-stowarzyszenia-sks-iskra.pdf')
          document.body.appendChild(link)
          link.click();
          document.body.removeChild(link);
        }
      })
    }
  }

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/sks-iskra.jpg"} />
      <section className="flex flex-col gap-10 max-w-[800px] mx-auto p-10 min-h-[500px] text-justify">
        <h1 className="text-3xl text-center">Sportowy Klub Strzelecki &#x201E;ISKRA&#x201D;</h1>
        <p>Działalność klubu opiera się na przepisach PZSS odnośnie zawodów strzeleckich oraz praktykuje wojskowe zasady oparte na PSBS podczas treningów strzeleckich.</p>
        <h2 className="text-2xl text-center">Klub ogranizuje zajęcia takie jak:</h2>
        <ul className="list-disc">
          <li>Treningi strzeleckie</li>
          <li>Przygotowanie do egzaminu na Patent strzelecki PZSS</li>
          <li>Przygotowanie do egzaminu na Prowadzącego strzelanie PZSS</li>
          <li>Przygotowanie do egzaminu na sędziego PZSS</li>
          <li>Zawody Strzeleckie wewnątrzklubowe.</li>
          <li>Zawody Strzeleckie zewnętrzne.</li>
        </ul>
        <p className="self-center">Kliknij w obrazek poniżej w celu pobrania deklaracji członkowskiej klubu strzleckiego:</p>
        <Image src="/document.svg" alt="File download icon" width={80} height={80} className="self-center border border-black rounded-full p-2 hover:cursor-pointer hover:shadow-2xl transition-[0.2s]" onClick={() => handleDocumentClick("deklaracja")} />
        <p className="self-center">Kliknij w obrazek poniżej w celu pobrania regulaminu klubu strzeleckiego:</p>
        <Image src="/document.svg" alt="File download icon" width={80} height={80} className="self-center border border-black rounded-full p-2 hover:cursor-pointer hover:shadow-2xl transition-[0.2s]" onClick={() => handleDocumentClick("regulamin")} />
      </section>
    </main>
  )
}

export default page
