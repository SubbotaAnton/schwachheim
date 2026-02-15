import Image from 'next/image'

interface ImgProps {
  src?: string
  alt?: string
  width?: number
  height?: number
}

// Uses <span> instead of <figure> because MDX wraps images in <p>,
// and <figure> is not valid inside <p> (only phrasing content allowed).
export default function Img({ src, alt = '', width, height }: ImgProps) {
  if (!src) return null

  return (
    <span className="block my-8">
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 500}
        className="rounded-lg shadow-md w-full h-auto"
      />
      {alt && (
        <span className="block mt-2 text-center text-sm text-muted italic">
          {alt}
        </span>
      )}
    </span>
  )
}
