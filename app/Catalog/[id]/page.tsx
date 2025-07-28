import NavbarLoggedin from "@/app/components/NavbarLoggedin";
import InvestForm from "@/app/components/Catalog/InvestForm";

interface PageProps {
  params: { id: string };
}

export default function Invest({ params }: PageProps) {
  return (
    <div className="flex flex-row md:gap-x-48 px-5 md:px-0">
      <NavbarLoggedin />
      <div className="md:py-4 py-24">
        <h1 className="font-semibold text-4xl">Invest</h1>
        <InvestForm plant_id={params.id} />
      </div>
    </div>
  );
}