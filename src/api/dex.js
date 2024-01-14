import faketokenlist from "../../.fake/dex-tokenlist.json";

export const getTokenList = async (search_text) => {
    // post to api service

    // fake
    const data = faketokenlist;
    return {data: data, success: true};
}