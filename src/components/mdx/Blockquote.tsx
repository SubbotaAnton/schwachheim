interface BlockquoteProps {
  children: React.ReactNode
}

export default function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 italic text-muted font-body">
      {children}
    </blockquote>
  )
}
