import ChooseRole from "../components/Signup/ChooseRole";
import Footer from "../components/LandingPage/Footer";
import NavbarLandingPage from "../components/LandingPage/NavbarLandingPage";

export default function ChooseRolePage() {
    return (
        <>
            <div>
                <NavbarLandingPage />
                <ChooseRole />
                <Footer />
            </div>
        </>
    )
}