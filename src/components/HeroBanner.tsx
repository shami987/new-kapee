export const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Shop the latest trends with unbeatable prices
          </p>
          <button 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => {
              try {
                const productsSection = document.querySelector('[data-products-section]');
                if (!productsSection) {
                  console.warn('Products section not found');
                  return;
                }
                productsSection.scrollIntoView({ behavior: 'smooth' });
              } catch (error) {
                console.error('Error scrolling to products section:', error);
              }
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};