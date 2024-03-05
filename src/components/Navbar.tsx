'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full absolute top-5 2xl:px-16 md:px-12 px-6 flex items-start justify-between">
      <Link href="/" className="">
        <Image src="/sps-iskra-logo.png" alt="Logo SPS Iskra" width={200} height={200} className="md:mt-5 shadow-2xl shadow-black rounded-full w-[100px] md:w-[200px]" />
      </Link>
      <div className="hidden xl:flex max-w-[95%] md:py-0 py-0 px-3 items-center justify-center text-white gap-3 bg-black opacity-80 rounded-xl text_20px">
        <div className="flex h-full flex-wrap items-center justify-center">
          <Link href="/" className="nav_link">Start</Link>
          <Link href="/aktualnosci" className="nav_link">Aktualności</Link>
          <Link href="/kalendarz" className="nav_link">Kalendarz</Link>
          <Link href="/zawody" className="nav_link">Zawody</Link>
          <Link href="/szkolenia" className="nav_link">Szkolenia</Link>
          <Link href="/sks_iskra" className="nav_link">SKS ISKRA</Link>
          <Link href="/o_nas" className="nav_link">O nas</Link>
          <Link href="/kontakt" className="nav_link">Kontakt</Link>
        </div>
      </div>
      <div ref={dropdownRef} className="xl:hidden p-3 bg-gray-900 rounded-xl opacity-100 relative inline-block">
        <Image src="/hamburger.svg" alt="Dropdown menu" width={50} height={50} className={`hover:cursor-pointer border rounded-md p-2 ${toggleDropdown ? 'border-green-800' : 'border-transparent'}`} onClick={() => setToggleDropdown(prev => !prev)} />
        {toggleDropdown &&
          <ul className="absolute flex flex-col gap-3 rounded-md bg-gray-900 z-10 min-w-[250px] p-3 mt-2 right-0 text-center dropdown_reveal overflow-hidden">
            <Link className="w-full p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/"}>Strona główna</Link>
            <Link className="w-full p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/aktualnosci"}>Aktualności</Link>
            <Link className="w-full p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/kalendarz"}>Kalendarz</Link>
            <Link className="w-full p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/zawody"}>Zawody</Link>
            <Link className="w-full p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/szkolenia"}>Szkolenia</Link>
            <Link className="w-full p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/sks_iskra"}>SKS Iskra</Link>
            <Link className="w-full p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/o_nas"}>O nas</Link>
            <Link className="w-full p-3 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none text-center" href={"/kontakt"}>Kontakt</Link>
          </ul>
        }
      </div>
    </nav>
  )
}