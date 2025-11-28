import { useState, useEffect } from "react";

const slides = [
  {
    label: "Limited Time Offer 30% Off",
    title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    btn1: "Buy now",
    btn2: "Find more",
    img: "./assets/banner/header_headphone_image.cb07f9d4.png",
  },
  {
    label: "Hurry up only few lefts!",
    title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    btn1: "Shop Now",
    btn2: "Explore Deals",
    img: "./assets/banner/header_playstation_image.f40d654c.png",
  },
  {
    label: "Exclusive Deal 40% Off",
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    btn1: "Order Now",
    btn2: "Learn More",
    img: "./assets/banner/header_macbook_image.2135a26c.png",
  },
];

export default function BannerProduct() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="px-6 md:px-16 lg:px-32">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
            >
              <div className="md:pl-8 mt-10 md:mt-0">
                <p className="md:text-base text-orange-600 pb-1">
                  {slide.label}
                </p>
                <h1 className="max-w-lg md:text-[40px] md:leading-12 text-2xl font-semibold">
                  {slide.title}
                </h1>
                <div className="flex items-center mt-4 md:mt-6 ">
                  <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                    {slide.btn1}
                  </button>
                  <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                    {slide.btn2}
                    <img
                      alt="arrow_icon"
                      loading="lazy"
                      width={15}
                      height={11}
                      decoding="async"
                      data-nimg={1}
                      className="group-hover:translate-x-1 transition"
                      style={{ color: "transparent" }}
                      src="./assets/arrow_right.svg"
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center flex-1 justify-center">
                <img
                  alt={`Slide ${idx + 1}`}
                  loading="lazy"
                  width={idx === 0 ? 852 : idx === 1 ? 654 : 849}
                  height={idx === 0 ? 852 : idx === 1 ? 747 : 654}
                  decoding="async"
                  data-nimg={1}
                  className="md:w-72 w-48"
                  style={{ color: "transparent" }}
                  src={slide.img}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                current === idx ? "bg-orange-600" : "bg-gray-500/30"
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
