import PlantsCard from "../components/MyPlants/PlantsCard";
import NavbarLoggedin from "../components/NavbarLoggedin";
import ProtectedRoute from "../components/ProtectedRoute";

export default function MyPlants() {
    return (
        <>
            <ProtectedRoute>
                <div className="flex flex-row md:gap-x-48 px-5 md:px-0">
                    <NavbarLoggedin />
                    <div className="md:py-4 py-24">
                        <h1 className="font-semibold text-4xl">My Plants</h1>
                        <PlantsCard />
                    </div>
                </div>
            </ProtectedRoute>
        </>
    )
}