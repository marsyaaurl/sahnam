import SignUpForm from "../components/Signup/SignupForm";
import NavbarLandingPage from "../components/LandingPage/NavbarLandingPage";
import Footer from "../components/LandingPage/Footer";

export default function SignupPage() {
    return (
        <>
            <div>
                <NavbarLandingPage />
                <SignUpForm />
                <Footer />
            </div>
        </>
    )
}