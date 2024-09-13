import LogoIcon from '@/components/icons/logo'

export default function Logo() {
  return (
    <div className="flex items-center px-3 gap-4">
      <LogoIcon size={40} />
      <h3 className="text-xl font-bold text-primary">Ledger</h3>
    </div>
  )
}
