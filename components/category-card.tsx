import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Wrench } from 'lucide-react'
import type { Category } from '@/lib/types'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/todas-las-categorias/${category.slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-md">
        <div className="relative aspect-[4/3] bg-muted">
          {category.image_url ? (
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Wrench className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {category.description}
            </p>
          )}
          <div className="flex items-center gap-1 text-sm font-medium text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Ver productos <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
