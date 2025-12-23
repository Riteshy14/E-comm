import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "cart.jpeg",
  "cart3.jpg",
  "cart4.jpg",
  "cart2.jpg",
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
          >
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-fill"
            />
          </div>
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Shop the Latest Trends
          </h1>
          <p className="mb-6 text-sm md:text-lg">
            Premium quality products at best prices
          </p>
        <Link to={'/collection'}>
          <button className="bg-white cursor-pointer text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
