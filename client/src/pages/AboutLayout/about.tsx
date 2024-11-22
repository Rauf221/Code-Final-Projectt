import AccordionSection from "@/components/About Us_Companents/AccordionLogic/Accordion";
import HappyCustomers from "@/components/About Us_Companents/Happy Customer/HappyCustomers";
import TestimonialCarousel from "@/components/About Us_Companents/Happy Customer/HappyCustomers";
import HeroSection from "@/components/About Us_Companents/Hero Section/HeroSection";
import CompanyLogos from "@/components/About Us_Companents/Logo Section/LogoSection";
import OfficeFeatures from "@/components/About Us_Companents/OfficeFeatures/OficeFeatures";
import TeamSection from "@/components/About Us_Companents/Our Perfect Team/OurPerfectTeam";
import StatsSection from "@/components/About Us_Companents/Stats/stats";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Header/headerSticky";
import Header from "@/components/Header/HeaderTop/header";

export default function About() {
    return (
      <div className="container mx-auto">
        <>
        <Header/>
        <NavBar/>
        <div>
        <HeroSection/>
        <StatsSection/>
        <OfficeFeatures/>
        <AccordionSection/>
        <TeamSection/>
        <HappyCustomers/>
        <CompanyLogos/>
        </div>
        <Footer/>
        </>
      </div>
    );
  }