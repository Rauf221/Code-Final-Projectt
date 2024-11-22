import FAQS from "@/components/FAQs_Component/HowCaniHelpU";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Header/headerSticky";
import Header from "@/components/Header/HeaderTop/header";

export default function FAQsLayout() {
    return (
     <>
      <Header/>
      <NavBar/>
      <div className="mt-10">
      <FAQS/>
      </div>
      <Footer/>
     </>
    );
    }