import ToggleButton from './toggle-button'
import Logo from './logo'
import Menu from './menu'

export default function Sidebar() {
  return (
    <div className="relative w-80 p-6 border-r-primary border text-secondary font-medium">
      <Logo />
      <ToggleButton />
      <Menu />
    </div>
  )
}
