interface H3Props {
  children: React.ReactNode
  id?: string
}

export default function H3({ children, id }: H3Props) {
  return (
    <h3
      id={id}
      className="font-heading text-2xl font-semibold text-foreground mt-12 mb-4"
    >
      {children}
    </h3>
  )
}
