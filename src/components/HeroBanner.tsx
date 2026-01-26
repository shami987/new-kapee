import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateText, setAnimateText] = useState(false);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      subtitle: 'Festive Feast',
      title: 'Fashion Accessories',
      offer: 'Minimum 50% Off'
    },
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop',
      subtitle: 'Summer Collection',
      title: 'Women\'s Fashion',
      offer: 'Up to 70% Off'
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
      subtitle: 'New Arrivals',
      title: 'Men\'s Style',
      offer: 'Starting from $29'
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
    <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
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
              <div className="max-w-4xl">
                <div className={`transform transition-all duration-1000 ${animateText && index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-light mb-2 md:mb-4">
                    {slide.subtitle}
                  </h3>
                </div>
                
                <div className={`transform transition-all duration-1000 delay-300 ${animateText && index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
                    {slide.title}
                  </h1>
                </div>
                
                <div className={`transform transition-all duration-1000 delay-600 ${animateText && index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8">
                    {slide.offer}
                  </h2>
                </div>
                
                <div className={`transform transition-all duration-1000 delay-900 ${animateText && index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <button className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium hover:bg-white hover:text-gray-900 transition-colors">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 md:p-3 backdrop-blur-sm"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 md:p-3 backdrop-blur-sm"
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
  );
};