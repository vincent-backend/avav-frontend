
import Link from "next/link";

export default function AppEntrance() {
    return(
        <>
        {/* Entrance */}
        <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-x-5 gap-y-5">
            <div className="flex flex-col sm:flex-row w-full lg:w-auto justify-center items-center gap-x-5 gap-y-5">
              <Link href="/apps/avavpay" target="_self" className="group apps-entrance bg-[url('/images/apps/entrance/umate-logo.png')]">
                <p className="font-secondary text-text group-hover:text-white text-[24px]">Umate</p>
              </Link>
              <Link href="" target="_self" className="group apps-entrance bg-[url('/images/apps/entrance/maccms-logo.png')]">
                <p className="font-secondary text-text group-hover:text-white text-[24px]">MacCMS</p>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-auto justify-center items-center gap-x-5 gap-y-5">
              <Link href="" target="_self" className="group apps-entrance">
                <p className="font-secondary text-text group-hover:text-white text-[24px]">SeaCMS</p>
              </Link>
              <Link href="" target="_self" className="group apps-entrance bg-[url('/images/apps/entrance/poncms-logo.png')]">
                <p className="font-secondary text-text group-hover:text-white text-[24px]">AVSCMS</p>
              </Link>
            </div>
          </div>
          </>
    );
}