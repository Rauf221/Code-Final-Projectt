import ErrorPage from "@/components/Error/404error";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Header/headerSticky";
import Header from "@/components/Header/HeaderTop/header";

export default function Page404Layout() {
    return (
        <>
        <Header/>
        <NavBar/>
        <div>
        <ErrorPage/> 
        </div>
        <Footer/>
        </>
    )
}
