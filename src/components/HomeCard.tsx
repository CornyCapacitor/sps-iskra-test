import Link from "next/link"

export const HomeCard = ({ title, description, image, path }: Card) => {
  return (
    <Link href="/[id]" as={`/${path}`} className="relative w-[375px] h-[200px] rounded-lg p-5 text-black bg-slate-100 shadow-1xl hover:bg-slate-200 transition-[0.2s] hover:cursor-pointer hover:shadow-2xl justify-between flex-col">
      <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${image ? `/${image}` : "/sps-iskra-logo.png"})` }}></div>
      <div className="h-full w-full flex flex-col justify-center rounded-lg text-black bg-white opacity-80">
        <h1 className="text-2xl font-bold text-cente">{title}</h1>
        {description && (
          <p className="text-1xl font-bold text-center">{description}</p>
        )}
      </div>
    </Link>
  )
}