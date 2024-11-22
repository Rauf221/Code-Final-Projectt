// pages/products/[id].tsx
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, Share2, Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/router'

interface ProductImage {
  id: number
  src: string
  alt: string
}

interface ProductVariant {
  id: number
  color: string
  size: string
  price: number
  comparePrice?: number
  inStock: boolean
  sku: string
}

interface ShippingMethod {
  name: string
  price: number
  duration: string
}

interface SizeMeasurement {
  size: string
  chest: string
  waist: string
  hips: string
}

interface Product {
  id: string
  name: string
  description: string
  images: ProductImage[]
  variants: ProductVariant[]
  details: string[]
  shipping: {
    freeShippingThreshold: number
    message: string
    estimatedDays: string
    methods: ShippingMethod[]
  }
  sizeGuide: {
    measurements: SizeMeasurement[]
    notes: string
  }
  sku: string
}

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [activeTab, setActiveTab] = useState('details')

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return

      try {
        setLoading(true)
        const response = await fetch(`http://localhost:2000/api/products/${id}`)
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        setProduct(data)
        // Set initial color and size based on first available variant
        if (data.variants.length > 0) {
          setSelectedColor(data.variants[0].color.toLowerCase())
          setSelectedSize(data.variants[0].size.toLowerCase())
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1)
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const getCurrentVariant = () => {
    if (!product) return null
    return product.variants.find(
      v => v.color.toLowerCase() === selectedColor && v.size.toLowerCase() === selectedSize
    )
  }

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>
  if (error) return <div className="container mx-auto px-4 py-8">Error: {error}</div>
  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>

  const currentVariant = getCurrentVariant()
  const discount = currentVariant ? Math.round(((currentVariant.comparePrice || 0) - currentVariant.price) / (currentVariant.comparePrice || 1) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage].src}
              alt={product.images[selectedImage].alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-[3/4] overflow-hidden rounded-lg ${
                  selectedImage === index ? 'ring-2 ring-black' : ''
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {currentVariant && (
              <div className="mt-4 flex items-center space-x-4">
                <span className="text-2xl font-bold">${currentVariant.price}</span>
                {currentVariant.comparePrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${currentVariant.comparePrice}
                    </span>
                    <span className="text-green-600">{discount}% OFF</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <select 
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {Array.from(new Set(product.variants.map(v => v.color))).map(color => (
                <option key={color} value={color.toLowerCase()}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <select 
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {[...new Set(product.variants
                .filter(v => v.color.toLowerCase() === selectedColor)
                .map(v => v.size))
              ].map(size => (
                <option key={size} value={size.toLowerCase()}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="p-2 border rounded-md hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="p-2 border rounded-md hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <button 
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400"
              disabled={!currentVariant?.inStock}
            >
              {currentVariant?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <div className="flex space-x-4">
              <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
                <Heart className="h-5 w-5" />
                <span>Save</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="pt-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {['details', 'shipping', 'size-guide'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-black text-black'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-4">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-4 space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500">SKU: {currentVariant?.sku || product.sku}</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <p>{product.shipping.message}</p>
                  <div className="space-y-2">
                    {product.shipping.methods.map((method, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{method.name}</span>
                        <span>${method.price} ({method.duration})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'size-guide' && (
                <div className="space-y-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Size</th>
                        <th className="text-left">Chest</th>
                        <th className="text-left">Waist</th>
                        <th className="text-left">Hips</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizeGuide.measurements.map((measurement, index) => (
                        <tr key={index}>
                          <td>{measurement.size}</td>
                          <td>{measurement.chest}"</td>
                          <td>{measurement.waist}"</td>
                          <td>{measurement.hips}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-500">{product.sizeGuide.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}