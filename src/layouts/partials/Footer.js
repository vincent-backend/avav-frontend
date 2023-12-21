import clsx from "clsx";
import config from "@config/config.json";
import Logo from "@layouts/components/Logo";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "@hooks/useTranslation";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const { locale, setLocale } = useTranslation();

  useEffect(() => {
    if (locale === "cn") {
      setTitle(title_cn);
    } else {
      setTitle(title_en);
    }
  }, [locale]);

  return (
    <footer className="bg-black">
      <div className="container">
        Footer
      </div>
    </footer>
  );
};

export default Footer;
