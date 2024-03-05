import { PageImage } from "@/components/PageImage"
import Link from "next/link"

const page = () => {
  return (
    <main className="flex-col w-full items-center justify-center text-center max-w-full overflow-x-hidden">
      <PageImage imageUrl={"/calendar.jpg"} />
      <section className="flex flex-col flex-wrap gap-5 items-center justify-start p-10 min-h-[500px]">
        <h1 className="text-3xl">Kalendarz</h1>
        <Link className="w-[350px] p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none text-center" href="https://calendar.google.com/calendar/u/0?cid=MGViYWEzNjQ4MDRmMTFlN2ZhNTIxYTgyYTRmNjRjZDc4NDdmNzFhOWUyYTNkYWU2MzJiZWQxMjRjOTRmNjVkNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t" target="_blank">Przejdź do kalendarza google</Link>
      </section>
    </main>
  )
}

export default page
