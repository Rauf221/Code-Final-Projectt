import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Header/headerSticky";
import Header from "@/components/Header/HeaderTop/header";
import LocationGallery from "@/components/Our Team_Components/Locations/Locations";

export default function OurTeam() {
    return(
        <div className="container mx-auto">
            <>
                <Header />
                <NavBar />
                <div>
                <LocationGallery />
                </div>
                <Footer />
            </>
        </div>
    );
}
