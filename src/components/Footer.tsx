import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center p-5 bg-black">
      <div className="flex gap-10 items-center justify-center">
        <Link href="https://www.youtube.com/" target="_blank" className="bg-white p-2 rounded-full hover:scale-110 transition-[0.2s]">
          <Image src="/youtube-icon.svg" alt="Youtube icon" width={75} height={75} />
        </Link>
        <Link href="https://www.facebook.com/profile.php?id=61551801553096" target="_blank" className="bg-white p-2 rounded-full hover:scale-110 transition-[0.2s]">
          <Image src="/facebook-icon.svg" alt="Facebook icon" width={75} height={75} />
        </Link>
        <Link href="https://www.instagram.com/" target="_blank" className="bg-white p-2 rounded-full hover:scale-110 transition-[0.2s]">
          <Image src="/instagram-icon.svg" alt="Instagram icon" width={75} height={75} />
        </Link>
      </div>
      <p className="text-white">Wykonanie: <Link className="text-orange-400 font-bold" href="https://mateusz-minder-portfolio.vercel.app/" target="_blank">Mateusz Minder</Link></p>
    </div>
  )
}