import Image from 'next/image'

interface ImgProps {
  src?: string
  alt?: string
  width?: number
  height?: number
}

export default function Img({ src, alt = '', width, height }: ImgProps) {
  if (!src) return null

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 500}
        className="rounded-lg shadow-md w-full h-auto"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted italic">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
