import clsx from "clsx";

const Paginations = ({pageCount, currentPage, navigate}) => {

    const getPageNumbers = () => {
        if (pageCount <= 4) {
            return [...Array(pageCount + 1).keys()].slice(1);
        } else if (currentPage < 3) {
            return [1, 2, 3, 4, 5];
        } else if (currentPage > pageCount - 4) {
            return [...Array(5).keys()].reverse().map(v=>pageCount-v);
        } else {
            return [currentPage, currentPage + 1, currentPage + 2];
        }
    }

    return (
        <div className="flex flex-row justify-between space-x-[10px] my-2 text-base">
            <button disabled={currentPage == 0} className={clsx("w-[30px] h-[30px] rounded-sm", 
            currentPage > 0 && "bg-[url('/images/pagination/arrow_left_nor.svg')]",
            currentPage == 0 && "bg-[url('/images/pagination/arrow_left_dis.svg')]")}
            onClick={()=>navigate(currentPage-1)}
            />
        { pageCount > 5 && currentPage > 2 && 
        <>
            <button className={clsx("w-[30px] h-[30px] rounded-sm bg-[#0f0f0f] text-text")} 
            onClick={()=>navigate(0)}>1</button>
            <button className="w-[30px] h-[30px] rounded-sm bg-[#0f0f0f] text-text" disabled={true}>
                ...
            </button>
        </>
        }
        {
            getPageNumbers().map(num=>
                <button className={clsx("w-[30px] h-[30px] rounded-sm", 
                    num - 1 == currentPage && "bg-cred text-white",
                    num -1 != currentPage && "bg-[#0f0f0f] text-text")} 
                    onClick={()=>navigate(num-1)} key={num}>
                        {num}
                    </button>
                )
        }
        { pageCount > 5 && currentPage  < (pageCount - 3) && 
            <>
                <button className="w-[24px] h-[24px] rounded-sm bg-[#0f0f0f] text-text" disabled={true}>
                ...
            </button>
                <button className="w-[24px] h-[24px] rounded-sm bg-[#0f0f0f] text-text" 
                    onClick={()=>navigate(pageCount-1)}>
                        {pageCount}
                    </button>
            </>
        }
          <button disabled={currentPage == pageCount-1} className={clsx("w-[30px] h-[30px] rounded-sm",
            currentPage < pageCount - 1 && "bg-[url('/images/pagination/arrow_right_nor.svg')]",
            currentPage == pageCount - 1 && "bg-[url('/images/pagination/arrow_right_dis.svg')]")}
            onClick={()=>navigate(currentPage+1)}
            />
        </div>
    );

}

export default Paginations;