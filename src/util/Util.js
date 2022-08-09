export const extractNCTiName = (url) => {
    const index = url.indexOf("NCIT");
    if (index > -1) {
        return url.substring(index);
    }
    return "N/A";
};