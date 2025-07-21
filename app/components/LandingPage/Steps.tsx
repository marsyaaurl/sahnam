export default function Steps() {
    return(
        <>
            <div className="flex flex-col gap-y-10 mt-20" id="steps">
                <h1 className='font-bold text-2xl text-center bg-transparent'>How It Works</h1>
                <div className="flex flex-col gap-y-5">
                    {[
                        {
                            step: "1",
                            title: "Choose a Commodity",
                            description: "Browse farming projects with clear details, timelines, and returns."
                        },
                        {
                            step: "2",
                            title: "Invest Your Funds",
                            description: "Select plants and invest securely through the platform."
                        },
                        {
                            step: "3",
                            title: "Track the Journey",
                            description: "Follow real-time updates on planting, growth, and harvest directly from the farmers."
                        },
                        {
                            step: "4",
                            title: "Earn & Reinvest",
                            description: "Receive your share of the profit after harvest. Withdraw or reinvest—your choice."
                        }
                    ].map(({ step, title, description }) => (
                        <div key={step} className="items-center justify-center flex flex-row gap-x-5 hover:scale-105" data-aos="fade-left">
                            <h2 className="bg-primary rounded-full w-fit px-4 py-2 text-background font-bold shadow-md">{step}</h2>
                            <div className="bg-primary rounded-2xl md:w-[500px] w-[270px] h-28 pl-2 shadow-md">
                                <div className="bg-background h-28 md:w-[500px] w-[270px] px-5 flex rounded-2xl flex-col justify-center border-primary border-[1px]">
                                    <h2 className="font-semibold text-lg">{title}</h2>
                                    <p>{description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}