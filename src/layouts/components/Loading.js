import Image from "next/image";

export default function Loading () {
    return(
        <div className="flex items-center justify-center w-[100vw] h-[100vh]">
          <Image
            alt="loading"
            src="/images/foundation/loading.gif"
            width={136}
            height={54}
          />
        </div>
    );
}