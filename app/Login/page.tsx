import Footer from "../components/LandingPage/Footer";
import LoginForm from "../components/Login/LoginForm";
import NavbarLogin from "../components/Login/NavbarLogin";

export default function LoginPage() {
    return (
        <>
            <div>
                <NavbarLogin />
                <LoginForm />
                <Footer />
            </div>
        </>
    )
}