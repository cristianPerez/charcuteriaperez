import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ShieldCheck, ShoppingCart, Truck, UtensilsCrossed } from 'lucide-react'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import CartDrawer from '@/components/CartDrawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const WHATSAPP_NUMBER = '573003526578'
const formatCop = (v) => `$${v.toLocaleString('es-CO')}`

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          (activeCategory === 'Todos' || p.category === activeCategory) &&
          p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [activeCategory, search],
  )

  const cartCount = useMemo(() => cart.reduce((a, i) => a + i.quantity, 0), [cart])
  const subtotal = useMemo(() => cart.reduce((a, i) => a + i.product.price * i.quantity, 0), [cart])

  const addToCart = (product) =>
    setCart((prev) => {
      const hit = prev.find((i) => i.product.id === product.id)
      return hit
        ? prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { product, quantity: 1 }]
    })

  const increase = (id) =>
    setCart((prev) => prev.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)))

  const decrease = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    )

  const remove = (id) => setCart((prev) => prev.filter((i) => i.product.id !== id))

  const onCheckout = () => {
    const lines = cart.map(
      ({ product, quantity }) => `- ${quantity}x ${product.name} (${formatCop(product.price * quantity)})`,
    )
    const msg = [
      '¡Hola! Me gustaría hacer el siguiente pedido en Charcutería Pérez:',
      ...lines,
      `Total: ${formatCop(subtotal)}`,
    ].join('\n')

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="min-h-screen bg-white text-foreground">
      <header className="w-full">
        <div className="w-full bg-[#a41517] px-4 py-3 text-center text-sm font-semibold tracking-wide text-white sm:text-base">
          Bienvenidos a nuestra tienda
        </div>

        <div className="w-full border-b border-zinc-200 bg-white py-4">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4">
            <img src="/logo-main.png" alt="Logo Charcutería Pérez" className="h-28 w-28 object-contain sm:h-32 sm:w-32" />
            <p className="mb-2 text-center text-xl font-bold uppercase tracking-[0.12em] text-[#a41517] sm:text-2xl">
              Charcutería Pérez
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden border-b border-zinc-200">
          <img src="/banner-main.png" alt="Banner charcutería" className="h-[300px] w-full object-cover sm:h-[410px] lg:h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3b090a]/45 via-[#6d1013]/20 to-transparent" />
          <div className="absolute inset-0 flex items-end sm:items-center">
            <div className="w-full px-4 pb-6 sm:px-10 sm:pb-0">
              <div className="max-w-xl">
                <p className="mb-2 inline-block rounded-full border border-white/40 bg-[#a41517]/80 px-3 py-1 text-xs tracking-[0.18em] text-white">
                  SELECCIÓN PREMIUM
                </p>
                <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:text-5xl">
                  Maestros de la Charcutería
                </h1>
                <p className="mt-2 max-w-lg text-sm text-zinc-100 sm:text-base">
                  Cortes premium y embutidos artesanales para una mesa inolvidable.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>
                    Ver catálogo
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/50 bg-white/10 text-white hover:bg-white/20"
                    onClick={() => setCartOpen(true)}
                  >
                    <ShoppingCart size={18} /> Carrito ({cartCount})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5"><ShieldCheck className="mb-2" /><h3 className="font-semibold">Calidad controlada</h3><p className="text-sm text-muted-foreground">Materia prima seleccionada y procesos de curado precisos.</p></div>
          <div className="rounded-2xl border bg-white p-5"><UtensilsCrossed className="mb-2" /><h3 className="font-semibold">Sabor auténtico</h3><p className="text-sm text-muted-foreground">Recetas artesanales con perfil gourmet y carácter propio.</p></div>
          <div className="rounded-2xl border bg-white p-5"><Truck className="mb-2" /><h3 className="font-semibold">Entrega confiable</h3><p className="text-sm text-muted-foreground">Despacho rápido para mantener frescura y calidad de mesa.</p></div>
        </section>

        <section id="catalogo" className="mt-12">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <Button key={c} variant={c === activeCategory ? 'default' : 'outline'} onClick={() => setActiveCategory(c)}>
                {c}
              </Button>
            ))}
            <div className="relative ml-auto w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar producto..." />
            </div>
          </div>

          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredProducts.map((p) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <ProductCard
                    product={p}
                    onAdd={(prod) => {
                      addToCart(prod)
                      setCartOpen(true)
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </section>

      <CartDrawer
        isOpen={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        subtotal={subtotal}
        onIncrease={increase}
        onDecrease={decrease}
        onRemove={remove}
        onCheckout={onCheckout}
      />
    </main>
  )
}
