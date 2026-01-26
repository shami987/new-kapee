import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateText, setAnimateText] = useState(false);
  
  const slides = [
    {
      image: 'https://images.pexels.com/photos/8427641/pexels-photo-8427641.jpeg',
      subtitle: 'NEW COLLECTIONS 2019',
      title: 'MEN FASHION',
      offer: 'Lorem ipsum dolor sit amet',
      price: '$39'
    },
    {
      image: 'https://media.istockphoto.com/id/905997400/photo/beautiful-woman.jpg?s=612x612&w=0&k=20&c=tdWKEEsmVQ9diojN1UPmAndXmEQbltmDx54PTcZBrxA=',
      subtitle: 'NEW ARRIVALS',
      title: 'SUMMER SALE',
      offer: 'MIN.40% OFF',
      price: '$45'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEEB-WV5Jg23_A6tKxNT5UGokfk0SQdB9DQ&s',
      subtitle: 'New Arrivals',
      title: 'Men\'s Style',
      offer: 'Starting from $29',
      price: '$29'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setAnimateText(false);
    const timer = setTimeout(() => {
      setAnimateText(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentSlide]);

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
          <div className="lg:col-span-2 relative rounded-lg overflow-hidden">
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
                  
                  <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
                    <div className="max-w-2xl">
                      <div className={`transform transition-all duration-1000 ${animateText && index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                        <h3 className="text-lg md:text-2xl lg:text-3xl font-light mb-2 md:mb-4">
                          {slide.subtitle}
                        </h3>
                      </div>
                      
                      <div className={`transform transition-all duration-1000 delay-300 ${animateText && index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
                          {slide.title}
                        </h1>
                      </div>
                      
                      <div className={`transform transition-all duration-1000 delay-600 ${animateText && index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8">
                          {slide.offer}
                        </h2>
                      </div>
                      
                      <div className={`transform transition-all duration-1000 delay-900 ${animateText && index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                        <button className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium hover:bg-white hover:text-gray-900 transition-colors">
                          SHOP NOW
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs md:text-sm">$</div>
                      <div className="text-lg md:text-xl font-bold">{slide.price.replace('$', '')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 md:p-3 backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 md:p-3 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side banners */}
          <div className="space-y-4 md:space-y-6">
            {/* White Sneakers Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 md:p-6 relative overflow-hidden h-40 md:h-48">
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0uYEAJX3b7hCbmYefUHBO9kAs82KvHK2Y0A&s)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="relative z-10">
                <div className="text-blue-200 font-semibold mb-2 text-sm md:text-base">WHITE SNEAKERS</div>
                <div className="text-xl md:text-2xl font-bold text-white mb-2">MIN. 30% OFF</div>
                <div className="text-gray-100 mb-4 text-sm md:text-base">Men Fashionable Shoes</div>
                <button className="bg-blue-500 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-600 transition-colors text-sm md:text-base">
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* Women's Fashion Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 md:p-6 relative overflow-hidden h-40 md:h-48">
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundImage: 'url(https://img.freepik.com/premium-photo/elegant-woman-accessories-hand-bag-high-heel-shoes_72402-2392.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="relative z-10">
                <div className="text-blue-200 font-semibold mb-2 text-sm md:text-base">WOMEN'S FASHION</div>
                <div className="text-xl md:text-2xl font-bold text-white mb-2">UP TO 65% OFF</div>
                <div className="text-gray-100 mb-4 text-sm md:text-base">Shoes & Backpacks</div>
                <button className="bg-blue-500 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-600 transition-colors text-sm md:text-base">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};