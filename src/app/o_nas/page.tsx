'use client'

import { PageImage } from "@/components/PageImage"

import Image from "next/image"
import Swal from "sweetalert2"

const Page = () => {
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
          link.href = 'deklaracja-czlonkowska-zatwierdzona.docx'
          link.setAttribute('download', 'deklaracja-czlonkowska-zatwierdzona.docx')
          document.body.appendChild(link)
          link.click();
          document.body.removeChild(link);
        }
      })
    } else if (type === "statut") {
      Swal.fire({
        color: "#fff",
        background: "#111827",
        title: 'Czy na pewno chcesz pobrać statut?',
        showConfirmButton: true,
        confirmButtonText: "Tak",
        confirmButtonColor: "#000fe2",
        showCancelButton: true,
        cancelButtonText: "Nie",
      }).then((result) => {
        if (result.isConfirmed) {
          const link = document.createElement('a');
          link.href = 'statut-sps-iskra-zatwierdzony.pdf'
          link.setAttribute('download', 'statut-sps-iskra-zatwierdzony.pdf')
          document.body.appendChild(link)
          link.click();
          document.body.removeChild(link);
        }
      })
    }
  }

  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/about.jpg"} />
      <section className="flex flex-col gap-10 max-w-[800px] mx-auto p-10 min-h-[500px] text-justify">
        <h1 className="text-3xl text-center">Stowarzyszenie Proobronno-Szkoleniowe &#x201E;ISKRA&#x201D;</h1>
        <p>Stowarzyszenie Proobronno-Szkoleniowe „ISKRA” jest dedykowane propagowaniu strzelectwa, strzelectwa sportowego, oraz kolekcjonerstwa broni i amunicji zgodnie z przepisami Ustawy o broni i amunicji z dnia 21 maja 1999 r. Realizujemy swoje cele poprzez szkolenia, edukację dzieci, młodzieży i dorosłych, oraz działania na rzecz obronności państwa i bezpieczeństwa publicznego. Ponadto angażujemy się w ochronę dziedzictwa narodowego, promowanie kultury fizycznej, oraz działania wspomagające rozwój społeczności lokalnych.</p>
        <h2 className="text-2xl text-center">Nasza działalność</h2>
        <p>Organizujemy różnorodne programy szkoleń, ćwiczeń, kursów, zawodów, oraz konferencji i seminariów. Współpracujemy z organami administracji publicznej, jednostkami wojskowymi, oraz innymi podmiotami w celu efektywnego realizowania naszych celów. Nasze szkolenia są prowadzone przez wykwalifikowanych instruktorów, z poszanowaniem obowiązujących przepisów prawa z zakresu bezpieczeństwa i porządku publicznego.</p>
        <h2 className="text-2xl text-center">Członkowstwo</h2>
        <p>Zapraszamy do członkostwa osoby, które podzielają nasze cele i chcą aktywnie uczestniczyć w naszej działalności. Warunkiem ubiegania się o członkostwo jest złożenie deklaracji członkowskiej oraz aktywne uczestnictwo w życiu stowarzyszenia.</p>
        <p className="self-center">Kliknij w obrazek poniżej w celu pobrania deklaracji:</p>
        <Image src="/document.svg" alt="File download icon" width={80} height={80} className="self-center border border-black rounded-full p-2 hover:cursor-pointer hover:shadow-2xl transition-[0.2s]" onClick={() => handleDocumentClick("deklaracja")} />
        <h2 className="text-2xl text-center">Składki</h2>
        <p>Składka członkowska roczna wynosi - 100 zł dla członków pełnoletnich, a dla uczniów do ukończenia 18 lat 25zł płatne jednorazowo do 30 marca roku kalendarzowego (w przypadku nowych członków przyjętych po 30 marca w ciągu trzech miesięcy od dołączenia).</p>
        <div className="bg-green-200 p-10 rounded-xl border border-green-600 flex flex-col gap-2">
          <p>Przy wpłatach pieniężnych na cele statutowe stowarzyszenia proszę wyraźnie:</p>
          <p>wpisywać imię, nazwisko oraz na co przeznaczona jest wpłata</p>
          <p>Nazwa i adres odbiorcy:</p>
          <p>STOWARZYSZENIE PROOBRONNO - SZKOLENIOWE ISKRA</p>
          <p>ul. Wiejska41/1, 85-458 Bydgoszcz</p>
          <p>Numer Konta mBank Oddz. Bydgoszcz: 32 1140 2004 0000 3702 8448 1044</p>
        </div>
        <h2 className="text-2xl text-center font-bold">Jeśli chcesz dodatkowo wesprzeć działalność możesz zwiększyć kwotę przelewu oraz dopisać w tytule „+ekstra”</h2>
        <p className="self-center">Kliknij w obrazek poniżej w celu pobrania statutu:</p>
        <Image src="/document.svg" alt="File download icon" width={80} height={80} className="self-center border border-black rounded-full p-2 hover:cursor-pointer hover:shadow-2xl transition-[0.2s]" onClick={() => handleDocumentClick("statut")} />
        <p>STOWARZYSZENIE PROOBRONNO - SZKOLENIOWE ISKRA, BYDGOSZCZ wpisane jest do Rejestru Stowarzyszeń, Innych Organizacji Społecznych i Zawodowych, Fundacji Oraz Samodzielnych Publicznych Zakładów Opieki Zdrowotnej pod numerem KRS: 0001077903  z dnia 09.01.2024 08:15.14  , nr NIP: 9671472469  nr REGON: 527439340</p>
        <h1 className="text-3xl text-center font-bold">Dołącz do nas już dziś i wspólnie działajmy na rzecz bezpieczeństwa i rozwoju społeczności lokalnych!</h1>
      </section>
    </main>
  )
}

export default Page
