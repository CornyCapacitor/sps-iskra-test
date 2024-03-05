'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export const PageImage = ({ imageUrl }: { imageUrl: string }) => {
  const [viewportWidth, setViewPortWidth] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setViewPortWidth(window.innerWidth)
    };

    handleResize();

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="w-full max-h-[800px] overflow-hidden bg-gray-300">
      <Image src={imageUrl} alt="Żołnierz w dziczy" width={viewportWidth} height={800} priority={true} onLoad={() => setImageLoaded(true)} className="object-contain" />
    </div>
  )
}