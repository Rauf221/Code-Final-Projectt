import ContactForm from "@/components/Contact Us_Companents/Contact Section Inputs/ContactInput";
import LocationMapIframe from "@/components/Contact Us_Companents/GoogleMapsIframe/Iframe";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Header/headerSticky";
import Header from "@/components/Header/HeaderTop/header";

export default function Contactus() {
 return( 
    <>
    <Header/>
    <NavBar/>
    <div>
     <LocationMapIframe/>
     <ContactForm/>
    </div>
    <Footer/>
  </>
 )

}