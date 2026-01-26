import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface WomenShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const WomenShowcase = ({ products, onAddToCart }: WomenShowcaseProps) => {
  // Customize these banner images (3 slides) as needed
  const bannerSlides = [
    'https://kapee.presslayouts.com/wp-content/uploads/2019/07/Product-box-banner-1.jpg',
    'https://kapee.presslayouts.com/wp-content/uploads/2019/06/Product-box-banner-3.jpg',
    'https://kapee.presslayouts.com/wp-content/uploads/2019/07/Product-box-banner-1.jpg'
  ];

  // pick the first banner by default
  const bannerImage = bannerSlides[0];

  // take only women's fashion products
  const womenProducts = products.filter(p => (p.category || '').toLowerCase() === "women's fashion");
  const displayProducts = womenProducts.slice(0, 6);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
          {/* Left sidebar small (just a label) */}
          <div className="lg:col-span-1 hidden lg:block">
            <h3 className="text-lg font-semibold text-pink-400">Women' Fashion</h3>
            <ul className="mt-8 space-y-4 text-sm text-gray-600">
              <li>Trousers & Capris</li>
              <li>Tops</li>
              <li>Shorts & Skirts</li>
              <li>Lingerie & Nightwear</li>
              <li>Jeans</li>
              <li>Dresses</li>
            </ul>

            <div className="mt-12">
              <div className="bg-green-500 text-white rounded-full w-20 h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs">$</div>
                  <div className="text-2xl font-bold">39</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center banner */}
          <div className="lg:col-span-3">
            <div
              className="relative rounded-lg overflow-hidden h-96 bg-center bg-cover"
              style={{ backgroundImage: `url(${bannerImage})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">NEW ARRIVAL</h2>
                  <p className="text-xl">UP TO 70% Off</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right products grid (6 items) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenShowcase;
