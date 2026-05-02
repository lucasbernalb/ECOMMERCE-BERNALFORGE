import Image from 'next/image'
import Link from 'next/link'

export function FooterBranding() {
  return (
    <Link
      href="https://bernydev.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-muted-foreground opacity-75 transition-all duration-200 hover:opacity-100"
      aria-label="Desarrollado por Berny Dev - Abrir sitio"
    >
      <Image
        src="/bernydev/logosinfondo.png"
        alt="Berny Dev logo"
        width={24}
        height={24}
        className="h-6 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
      />
      <span className="text-xs font-medium tracking-wide whitespace-nowrap">
        Desarrollado por{' '}
        <span className="font-semibold text-[var(--brand-berny)] transition-colors duration-200 group-hover:underline group-hover:underline-offset-2">
          BERNY DEV
        </span>
      </span>
    </Link>
  )
}
