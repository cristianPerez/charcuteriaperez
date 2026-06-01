import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ProductCard({ product, onAdd }) {
  return (
    <Card className="rounded-2xl">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full rounded-t-2xl object-cover"
        />
      )}
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{product.category}</span>
          <span className="text-sm text-muted-foreground">{product.weight}</span>
        </div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold">${product.price.toLocaleString('es-CO')}</p>
          <Button onClick={() => onAdd(product)} size="sm"><Plus size={16} />Agregar</Button>
        </div>
      </CardContent>
    </Card>
  )
}
