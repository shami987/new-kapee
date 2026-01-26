import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      title: "MEN'S FASHION",
      subtitle: 'NEW COLLECTIONS 2019',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor!',
      price: '$39'
    },
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
      title: "WOMEN'S STYLE",
      subtitle: 'SPRING COLLECTION 2024',
      description: 'Discover the latest trends in women fashion with premium quality materials!',
      price: '$45'
    },
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      title: "ACCESSORIES",
      subtitle: 'PREMIUM COLLECTION',
      description: 'Complete your look with our exclusive range of fashion accessories!',
      price: '$29'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Hero Banner with Slider */}
          <div className="lg:col-span-2 relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-64 md:h-96"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  </div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center h-full p-4 md:p-0">
                    <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                      <div className="relative">
                        <div className="w-32 h-32 md:w-64 md:h-64 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-3xl md:text-6xl">👨💼</span>
                        </div>
                        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-green-500 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs">$</div>
                            <div className="text-sm md:text-lg font-bold">{slide.price.replace('$', '')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 md:pr-8 text-white text-center md:text-left">
                      <div className="text-blue-300 font-semibold mb-2 text-sm md:text-base">{slide.subtitle}</div>
                      <h1 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h1>
                      <p className="text-gray-200 mb-6 text-sm md:text-base">{slide.description}</p>
                      <button className="border-2 border-white text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-white hover:text-gray-900 transition-colors text-sm md:text-base">
                        SHOP NOW
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 md:p-2 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1 md:p-2 rounded-full backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side banners */}
          <div className="space-y-4 md:space-y-6">
            {/* White Sneakers Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 md:p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-blue-500 font-semibold mb-2 text-sm md:text-base">WHITE SNEAKERS</div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-2">MIN. 30% OFF</div>
                <div className="text-gray-600 mb-4 text-sm md:text-base">Men Fashionable Shoes</div>
                <button className="bg-blue-500 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-600 transition-colors text-sm md:text-base">
                  SHOP NOW
                </button>
              </div>
              <div className="absolute right-0 top-0 w-24 md:w-32 h-full">
                <span className="text-4xl md:text-6xl">👟</span>
              </div>
            </div>

            {/* Women's Fashion Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 md:p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-blue-500 font-semibold mb-2 text-sm md:text-base">WOMEN'S FASHION</div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-2">UP TO 65% OFF</div>
                <div className="text-gray-600 mb-4 text-sm md:text-base">Shoes & Backpacks</div>
                <button className="bg-blue-500 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-600 transition-colors text-sm md:text-base">
                  SHOP NOW
                </button>
              </div>
              <div className="absolute right-0 top-0 w-24 md:w-32 h-full">
                <span className="text-4xl md:text-6xl">👜</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};