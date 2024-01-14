import Base from "@/layouts/Baseof";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { getTokenList } from "@/api/dex";

export default function DexIndex() {
  const [payAmount, setPayAmount] = useState(0);
  const [isValidPayNum, setValidPayNum] = useState(true);
  const [isAllowanceMsgShow, setAllowanceMsgShow] = useState(false);
  const [isSelTokenDlgShow, setSelTokenDlgShow] = useState(false);
  const [tokenList, setTokenList] = useState(null);
  const [selectedTokenId, setSelectedTokenId] = useState(null);

  // Function: process payment value is changed.
  const onPayAmountChanged = (e) => {
    const t_amount = Number(e.target.value);
    if (isNaN(t_amount)) {
      setValidPayNum(false);
      return;
    }

    setPayAmount(t_amount);
    setValidPayNum(true);
  };

  // Function: process search text change
  const onTokenSearch = async (e) => {
    const search_text = e.target.value;
    if (search_text.length == 0) {
      setTokenList(null);
      return;
    }

    const fetchData = await getTokenList(search_text);
    if (fetchData.success == true) {
      setTokenList(fetchData.data);
    }
  };

  // Function: process select token id
  const onSelectTokenId = (id) => {
    setSelectedTokenId(id);
    setSelTokenDlgShow(false);
  }

  // Function: process Swap button click
  const onSwapClicked = () => {
    //process

    // if allowance problem
    setAllowanceMsgShow(true);
  };

  // Function: process Increase Allowance click
  const onIncreaseAllowanceClicked = () => {
    // process

    // proceeded?
    setAllowanceMsgShow(false);
  };

  useEffect(() => {}, []);

  return (
    <Base>
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden -z-10">
        <Image
          alt="background"
          src="/images/bg/bg_top_pic.svg"
          width={1921}
          height={1080}
          className="w-full"
        />
      </div>
      <section className={clsx("container mt-[100px] md:mt-[180px] mb-[50px] md:mb-[112px]")}>
        <div className="flex flex-col w-full h-full items-center jsutify-center gap-3">
          <div className="flex flex-col w-full max-w-[480px] mx-auto my-0 bg-[#1A1C1F]">
            <div className="w-full px-7 py-5 relative">
              <p className="text-white text-[16px]">You pay</p>
              <div className="flex flex-row gap-2">
                <div className="flex flex-grow flex-col">
                  <input
                    type="text"
                    name="name"
                    className={clsx(
                      "w-full pl-0 text-[50px] bg-[#1A1C1F] font-secondary border-none",
                      isValidPayNum && "text-white",
                      !isValidPayNum && "text-cred"
                    )}
                    placeholder="0"
                    onChange={onPayAmountChanged}
                  />
                  <p className="text-[16px]">$0</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-[10px]">
                  <div className="w-[72px] h-[34px] bg-[#222528] font-secondary text-[18px] leading-[34px] text-white text-center">
                    FETH
                  </div>
                  <p className="text-[16px]">Balance: 0</p>
                </div>
              </div>
              <div className="absolute w-[42px] h-[42px] bottom-[-21px] left-[calc(50%-21px)] bg-[url('/images/dex/arrow_nor.svg')] hover:bg-[url('/images/dex/arrow_hover.svg')]" />
            </div>
            <div className="w-[90%] mx-auto bg-[#242424] min-h-[2px]" />
            <div className="w-full px-7 py-5">
              <p className="text-white text-[16px]">You receive</p>
              <div className="flex flex-row gap-2 items-center justify-between">
                <p className="pl-0 text-[50px] font-secondary text-white">0</p>
                <button
                  className="h-[32px] text-white bg-[#301d20] border-cred border text-center px-3"
                  onClick={() => setSelTokenDlgShow(true)}
                >
                  <span className="pr-1">SELECT TOKEN</span>
                  <Image
                    alt="unfold"
                    src="/images/dex/nav_ic_arrow_unfold.svg"
                    width={8}
                    height={8}
                    className="inline-block"
                  />
                </button>
              </div>
              <button
                className="w-full h-[50px] text-center bg-[#5e2023] hover:bg-cred active:bg-cred hover:border-cred hover:border active:border-cred active:border hover:text-white active:text-white"
                onClick={onSwapClicked}
              >
                Swap
              </button>
            </div>
          </div>
          <div
            className={clsx(
              "flex flex-col w-full max-w-[480px] mx-auto my-0 bg-[#1A1C1F] px-7 py-5 gap-4 opacity-0 transition-opacity duration-100",
              isAllowanceMsgShow && "opacity-100"
            )}
          >
            <p className="text-cred text-[14px]">
              Insufficient allowance. You must give the router permission to
              transfer your Eths Token.
            </p>
            <button
              className="w-full h-[40px] text-center bg-cred active:border text-white"
              onClick={onIncreaseAllowanceClicked}
            >
              Increase Allowance
            </button>
          </div>
        </div>
        <div
          className={clsx(
            "absolute w-full h-[100vh] top-0 left-0 opacity-0 bg-black bg-opacity-40 -z-50 transition-all duration-100 ease-linear overflow-hidden",
            isSelTokenDlgShow && "opacity-100 z-50"
          )}
        >
          <div className="flex w-full h-full items-end md:items-center justify-center">
            <div className="flex flex-col max-w-[571px] w-[570px] h-[364px] bg-[#1a1c1f] py-5">
              <div className="flex flex-row w-full items-center justify-between px-5">
                <p className="text-white text-[18px]">Select a Token</p>
                <button
                  className="border-none w-[24px] h-[24px] bg-[url('/images/dex/popup_ic_close_nor.svg')] hover:bg-[url('/images/dex/popup_ic_close_hover.svg')] active:bg-[url('/images/dex/popup_ic_close_hover.svg')]"
                  onClick={() => setSelTokenDlgShow(false)}
                />
              </div>
              <div className="w-full md:mt-5 mt-8 px-7">
                {/* search */}
                <div className="w-full h-[50px] border border-[#272829] relative">
                  <input
                    type="text"
                    name="name"
                    className={clsx(
                      "w-full h-full pl-8 text-[16px] bg-[#1A1C1F] border border-[#1A1C1F] text-white"
                    )}
                    placeholder="Search name or paste address."
                    onChange={onTokenSearch}
                  />
                  <Image
                    alt="icon-search"
                    src="/images/dex/pop_ic_search_nor.svg"
                    width={16}
                    height={16}
                    className="absolute left-2 top-[17px]"
                  />
                </div>
                {/* Search Result */}
                <div className="w-full h-[130px] mt-5 md:mt-8">
                  <ul>
                    {tokenList ?
                      tokenList.map((token) => {
                        return (
                          <li
                            key={token.id}
                            onClick={()=>onSelectTokenId(token.id)}
                            className="flex flex-row cursor-pointer h-[65px] text-white hover:text-cred active:text-cred"
                          >
                            <div className="flex flex-col w-[40%]">
                              <p className="text-[14px]">{token.name}</p>
                              <p className="text-[14px]">{token.type}</p>
                            </div>
                            <div className="flex flex-col w-[60%]">
                              <p className="text-[14px]">
                                Lquidity: {token.Liquidity.toLocaleString("en-US")} {token.cash}
                              </p>
                              <p className="text-[14px]">Balance: {token.balance.toLocaleString("en-US")}</p>
                            </div>
                          </li>
                        );
                      }) : (
                        <li className="w-full flex items-center">Token result not found.</li>
                      )}
                  </ul>
                </div>
                <div className="mt-3 w-full">
                  <button
                    className="h-[50px] px-9 float-right bg-cred text-white"
                    onClick={() => setSelTokenDlgShow(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
