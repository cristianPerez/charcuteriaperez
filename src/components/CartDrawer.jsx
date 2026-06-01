import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'

function formatCop(value) {
  return `$${value.toLocaleString('es-CO')}`
}

export default function CartDrawer({ isOpen, onOpenChange, items, subtotal, onIncrease, onDecrease, onRemove, onCheckout }) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-[#f8f3eb]">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold"><ShoppingBag size={20} />Carrito</h2>
        <div className="space-y-3 overflow-y-auto pr-1">
          {items.length === 0 && <p className="text-muted-foreground">Tu carrito está vacío.</p>}
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between">
                <div><h3 className="font-semibold">{product.name}</h3><p className="text-sm text-muted-foreground">{formatCop(product.price)}</p></div>
                <Button variant="outline" size="icon" onClick={() => onRemove(product.id)}><Trash2 size={16} /></Button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => onDecrease(product.id)}><Minus size={16} /></Button>
                <span className="min-w-6 text-center font-semibold">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => onIncrease(product.id)}><Plus size={16} /></Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t pt-4">
          <div className="mb-3 flex justify-between"><span>Subtotal</span><span className="font-bold">{formatCop(subtotal)}</span></div>
          <Button className="w-full" onClick={onCheckout} disabled={items.length===0}>Confirmar Pedido</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
