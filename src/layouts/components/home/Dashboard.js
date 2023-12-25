
export default function Dashboard() {
    return (
        <section className="animate container mt-10 md:mt-40">
            <div className="flex flex-col md:flex-row justify-between md:mx-10">
                <div className="flex flex-col mt-4 md:mt-0">
                    <div className="font-secondary text-cred text-[30px] md:text-[50px]">ASC-20</div>
                    <div className="font-primary text-white text-[18px] md:text-[24px]">Token Standard</div>
                </div>

                <div className="flex flex-col mt-4 md:mt-0">
                    <div className="font-secondary text-cred text-[30px] md:text-[50px]">21000000 mints</div>
                    <div className="font-primary text-white text-[18px] md:text-[24px]">Total Issuance</div>
                </div>

                <div className="flex flex-col mt-4 md:mt-0">
                    <div className="font-secondary text-cred text-[30px] md:text-[50px]">100%</div>
                    <div className="font-primary text-white text-[18px] md:text-[24px]">Circulatio</div>
                </div>
            </div>
        </section>
    );
}