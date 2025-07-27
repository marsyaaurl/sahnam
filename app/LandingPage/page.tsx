import HeroSection from "../components/LandingPage/HeroSection";
import NavbarLandingPage from "../components/LandingPage/NavbarLandingPage";
import Benefits from "../components/LandingPage/Benefits";
import Steps from "../components/LandingPage/Steps";
import Footer from "../components/LandingPage/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

export default function LandingPage() {
    return (
        <>
            <div>
                <div>
                    <NavbarLandingPage />
                </div>
                <div>
                    <HeroSection />
                </div>
                <div>
                    <Benefits />
                </div>
                <div>
                    <Steps />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}