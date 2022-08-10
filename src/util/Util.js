export const extractNCTiName = (url) => {
    let name = null;
    if (url) {
        const index = url.indexOf("NCIT");
        if (index > -1) {
            name = url.substring(index);
        }
    }

    return name;
};