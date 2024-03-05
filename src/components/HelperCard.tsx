import { properUrl } from "./properUrl"

import Link from "next/link"

type HelperCardProps = Omit<Helper, 'created_at' | 'who'>

const HelperCard = ({ id, name, path, image }: HelperCardProps) => {
  return (
    <Link href={`${path}`} target="_blank" id={id} className="relative w-[250px] h-[250px] rounded-full p-5 text-black border shadow-1xl hover:cursor-pointer hover:shadow-xl items-center justify-center flex-col transition-[0.2s] overflow-hidden">
      {image ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={`${properUrl("wspierajacy", id)}`} />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col justify-center rounded-lg text-black">
          <h1 className="text-3xl font-bold text-black-500 text-center">{name}</h1>
        </div>
      )}
    </Link>
  )
}

export default HelperCard
