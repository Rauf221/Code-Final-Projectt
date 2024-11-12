import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/HeaderTop/header";

import NavBar from "@/components/Header/headerSticky";
import MarqueeText from "@/components/Home_Components/Animated Text/animated";
import TrendingProducts from "@/components/Home_Components/Hot Trending Products/TrendingProducts";
import NewsletterModal from "@/components/Home_Components/NewsLetters/NewslettersModal";
import PopularCategories from "@/components/Home_Components/Popular Catagories/popularcatagories";
import ProductBanner from "@/components/Home_Components/Product Banner/Productbanner";
import FeaturedProducts from "@/components/Home_Components/Top Featured Products/TopFeaturedProducts";
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
     <ProductBanner/>
     <FeaturedProducts/>
     <NewsletterModal/>
     <MarqueeText/>
     </div>
      <Footer/>
    </div>
  );
} 
export default Homelayout;