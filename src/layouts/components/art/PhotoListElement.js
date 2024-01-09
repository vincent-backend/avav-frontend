import clsx from "clsx";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import { useState } from "react";
import React from "react";

export default function PhotoListElement({ name, src }) {
  const [loading, setLoading] = useState(true);

  function onImageLoad() {
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div
        className={clsx(
          "w-[calc(50vw-30px)] aspect-square md:w-[256px] md:h-[256px] flex items-center justify-center bg-white bg-opacity-5",
          !loading && "hidden"
        )}
      >
        <Image
          alt="Loading..."
          src="/images/art/photo-logo.svg"
          width={100}
          height={100}
          priority = {true}
        />
      </div>
      <Zoom>
      <Image
          alt={name}
          src={src}
          width={256}
          height={256}
          onLoad={onImageLoad}
          priority
          className={clsx(
            "max-w-[calc(50vw-30px)] aspect-auto md:h-[256px]", loading && "hidden"
          )}
        />
    </Zoom>
    </React.Fragment>
    
  );
}
