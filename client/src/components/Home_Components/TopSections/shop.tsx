"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS
import { BiArrowFromBottom } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Slide {
  title: string;
  subtitle: string;
  image: string;
}

const CustomPrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow left-arrow bg-black p-2 rounded-full text-white  z-10`}
      style={{ ...style, display: "block", left: "20px" }} // Adjust position here
      onClick={onClick}
    >
     <IoIosArrowBack />
    </button>
  );
};

const CustomNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow right-arrow bg-black p-2 rounded-full text-white z-10 `}
      style={{ ...style, display: "block", right: "20px" }} 
      onClick={onClick}
    >
     <IoIosArrowForward />
    </button>
  );
};
const CustomSlider: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); 
  }, []);

  const sliderContent: Slide[] = [
    {
      title: "Gaming Headset Brilliant Lighting Effect",
      subtitle: "Wireless Connection With TV, Computer, Laptop...",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/files/banner_1_3.png?v=1697475451&width=3840", 
    },
    {
      title: "Canyon Star Raider",
      subtitle: "Headphone & Audio",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/files/banner_1_1.png?v=1697475450&width=3840", 
    },
    {
      title: "Phone Galaxy S20",
      subtitle: "Cellphone & Tablets",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/files/banner_1_3.png?v=1697475451&width=3840", 
    },
  ];

  const cards = [
    {
      title: "Canyon Star Raider",
      subtitle: "Headphone & Audio",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/files/1_1.png?v=1697473091&width=3840", 
    },
    {
      title: "Phone Galaxy S20",
      subtitle: "Cellphone & Tablets",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/files/1_2.png?v=1697474702&width=3840", 
    },
    {
      title: "Galaxy Buds Plus",
      subtitle: "Wireless Earbuds",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/files/1_3.png?v=1697474702&width=3840", 
    },
    {
      title: "Chair Swoon Lounge",
      subtitle: "Decor & Furniture",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/files/1_4.png?v=1697474702&width=3840", 
    },
  ];

  const settings = {
    dots: true,
  infinite: false,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  fade: true,
  nextArrow: <CustomNextArrow />, 
  prevArrow: <CustomPrevArrow />, 
  };

  return (
    <div className=" container  flex items-center gap-5 p-5">
      <div className="  w-[60%]  ">
        <div className="">
          <Slider {...settings}>
            {sliderContent.map((slide, index) => (
              <div
                key={index}
                className="relative h-[375px] rounded-3xl overflow-hidden bg-gray-200"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[100%] object-cover rounded-3xl"
                />
                <div
                  className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-10 text-white bg-gradient-to-t to-transparent transition-all duration-500 ${
                    animate ? "animate-slide-down" : "opacity-0"
                  }`}
                >
                  <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg">{slide.subtitle}</p>
                  <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
                    Discover Now
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className=" md:w-[40%] grid grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="h-[175px] group flex w-full bg-white shadow-lg rounded-3xl  "
          >
            <div className="w-full overflow-hidden relative rounded-3xl">
              <img
                src={card.image}
                alt=""
                className=" w-full h-full transition-transform duration-500 group-hover:scale-105 "
              />

              <div className=" absolute w-[55%] top-10 left-0 p-4 flex flex-col justify-center">
                <h3 className="text-xl text-white font-semibold mb-2">
                  {card.title}
                </h3>
                <p className="text-white w-[200px]">{card.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-down {
          0% {
            transform: translateY(-50%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 1s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomSlider;
