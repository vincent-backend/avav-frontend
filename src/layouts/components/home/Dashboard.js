import json_dashboard from "@/content/dashboard.json";

export default function Dashboard() {
    
    const {dashboard} = json_dashboard;
    console.log(dashboard);

    return (
        <section className="animate container mt-10 md:mt-40">
            <div className="flex flex-col md:flex-row justify-between md:mx-10">
                {dashboard.map((item, index) => {
                    return (
                        <div className="flex flex-col mt-4 md:mt-0" key={index}>
                        <div className="font-secondary text-cred text-[30px] md:text-[50px]">{item.content}</div>
                        <div className="font-primary text-white text-[18px] md:text-[24px]">{item.description}</div>
                    </div>
                    )
                })}
            </div>
        </section>
    );
}