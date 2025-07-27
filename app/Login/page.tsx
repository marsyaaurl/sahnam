import NavbarLandingPage from "../components/LandingPage/NavbarLandingPage";
import Footer from "../components/LandingPage/Footer";
import LoginForm from "../components/Login/LoginForm";

export default function LoginPage() {
    return (
        <>
            <div>
                <NavbarLandingPage />
                <LoginForm />
                <Footer />
            </div>
        </>
    )
}