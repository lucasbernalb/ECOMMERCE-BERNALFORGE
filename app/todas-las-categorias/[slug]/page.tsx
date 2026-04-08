export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryTestPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold text-orange-500">CATEGORY TEST PAGE</h1>
      <p className="text-muted-foreground mt-2">Slug: {slug}</p>
    </div>
  )
}
