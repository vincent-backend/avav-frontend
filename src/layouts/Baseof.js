import config from "@/config/config.json";
import { plainify } from "@/lib/utils/textConverter";
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const Base = ({
  title,
  meta_title,
  description,
  noindex,
  canonical,
  children,
}) => {
  const { meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const main = useRef();
  const router = useRouter();

  return (
    <>
      <Head>
        {/* title */}
        <title>
          {plainify(
            meta_title ? meta_title : title ? title : config.site.title,
          )}
        </title>

        {/* canonical url */}
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* meta-description */}
        <meta
          name="description"
          content={plainify(description ? description : meta_description)}
        />

        {/* og-title */}
        <meta
          property="og:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* og-description */}
        <meta
          property="og:description"
          content={plainify(description ? description : meta_description)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${base_url}/${router.asPath.replace("/", "")}`}
        />

        {/* twitter-title */}
        <meta
          name="twitter:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* twitter-description */}
        <meta
          name="twitter:description"
          content={plainify(description ? description : meta_description)}
        />

        <meta name="twitter:card" content="summary_large_image" />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />
      </Head>
      <Header />
      {/* main site */}
      <main ref={main}>{children}</main>
      <Footer />
    </>
  );
};

export default Base;
