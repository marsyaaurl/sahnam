import CatalogCard from "../components/Catalog/CatalogCard";
import NavbarLoggedin from "../components/NavbarLoggedin";

export default function Catalog() {
    return (
        <>
            <div className="flex flex-row md:gap-x-48 px-5 md:px-0">
                <NavbarLoggedin />
                <div className="md:py-4 py-24">
                    <h1 className="font-semibold text-4xl">Catalog</h1>
                    <CatalogCard />
                </div>
            </div>
        </>
    )
}