export const HeroBanner = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Hero Banner */}
          <div className="lg:col-span-2 relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center h-96">
              {/* Left side - Man with glasses */}
              <div className="w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-6xl">👨‍💼</span>
                  </div>
                  {/* Price tag */}
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs">$</div>
                      <div className="text-lg font-bold">39</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Content */}
              <div className="w-1/2 pr-8">
                <div className="text-blue-500 font-semibold mb-2">NEW COLLECTIONS 2019</div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  MEN'S FASHION
                </h1>
                <p className="text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor!
                </p>
                <button className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded hover:bg-blue-500 hover:text-white transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>

          {/* Right side banners */}
          <div className="space-y-6">
            {/* White Sneakers Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-blue-500 font-semibold mb-2">WHITE SNEAKERS</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">MIN. 30% OFF</div>
                <div className="text-gray-600 mb-4">Men Fashionable Shoes</div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                  SHOP NOW
                </button>
              </div>
              <div className="absolute right-0 top-0 w-32 h-full">
                <span className="text-6xl">👟</span>
              </div>
            </div>

            {/* Women's Fashion Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-blue-500 font-semibold mb-2">WOMEN'S FASHION</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">UP TO 65% OFF</div>
                <div className="text-gray-600 mb-4">Shoes & Backpacks</div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                  SHOP NOW
                </button>
              </div>
              <div className="absolute right-0 top-0 w-32 h-full">
                <span className="text-6xl">👜</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};