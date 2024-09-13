import { CaretLeft } from '@phosphor-icons/react/dist/ssr'

export default function ToggleButton() {
  return (
    <button className="absolute top-20 bg-white right-0 w-8 flex items-center justify-center translate-x-1/2 h-8 rounded-lg border-primary border-2">
      <CaretLeft size={24} />
    </button>
  )
}
