import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/header";
import NavBar from "@/components/header/headerSticky";


export default function Home() {
  return (
    <div className="container mx-auto">
      <Header/>
      <NavBar/> 
      <Footer/>
    </div>
  );
}