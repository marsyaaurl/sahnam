import SignUpForm from "../components/Signup/SignupForm";
import NavbarLandingPage from "../components/LandingPage/NavbarLandingPage";
import Footer from "../components/LandingPage/Footer";
import { Suspense } from 'react';

export default function SignupPage() {
    return (
        <>
            <div>
                <NavbarLandingPage />
                <Suspense>
                    <SignUpForm />
                </Suspense>
                <Footer />
            </div>
        </>
    )
}