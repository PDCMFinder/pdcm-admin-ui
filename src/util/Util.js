export const extractNCTiName = (url) => {
    console.log("url", url);
    const index = url.indexOf("NCIT");
    console.log(index);
    if (index > -1) {
        return url.substring(index);
    }
    return "N/A";
};