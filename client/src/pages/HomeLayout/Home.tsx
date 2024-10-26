import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/header";

import NavBar from "@/components/Header/headerSticky";
import TrendingProducts from "@/components/Home_Components/Hot Trending Products/TrendingProducts";
import PopularCategories from "@/components/Home_Components/Popular Catagories/popularcatagories";
import TopDealsOfTheDay from "@/components/Home_Components/TopDealsOfDay/TopDeals";
import CustomSlider from "@/components/Home_Components/TopSections/shop";



const Homelayout = () => {
  return (
    <div className="container mx-auto">
      <Header/>
      <NavBar/> 
     <div className="bg-[#F6F7F9]">
     <CustomSlider/>
     <TrendingProducts/>
     <PopularCategories/>
     <TopDealsOfTheDay/>
     </div>
      <Footer/>
    </div>
  );
} 
export default Homelayout;