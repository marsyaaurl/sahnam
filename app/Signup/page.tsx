import SignUpForm from "../components/Signup/SignupForm";
import Footer from "../components/LandingPage/Footer";
import { Suspense } from 'react';
import NavbarSignup from "../components/Signup/NavbarSignup";

export default function SignupPage() {
    return (
        <>
            <div>
                <NavbarSignup />
                <Suspense>
                    <SignUpForm />
                </Suspense>
                <Footer />
            </div>
        </>
    )
}