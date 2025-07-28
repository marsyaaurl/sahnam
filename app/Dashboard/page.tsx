import AIInsights from "../components/Dashboard/AIInsights";
import Chart from "../components/Dashboard/Chart";
import Numbers from "../components/Dashboard/Numbers";
import LogoutButton from "../components/LogoutButton";
import NavbarLoggedin from "../components/NavbarLoggedin";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Dashboard(){
    return (
        <>
            <ProtectedRoute>
                <div className="flex flex-row md:gap-x-48 px-5 md:px-0">
                    <NavbarLoggedin />
                    <div className="md:py-4 py-24">
                        <h1 className="font-semibold text-4xl">Dashboard</h1>
                        <Numbers />
                        <Chart />
                        <AIInsights />
                        <LogoutButton />
                    </div>
                </div>
            </ProtectedRoute>
        </>
    )
}