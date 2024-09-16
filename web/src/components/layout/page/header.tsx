interface HeaderProps {
  children?: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="my-8 flex items-center justify-between">{children}</div>
  )
}
