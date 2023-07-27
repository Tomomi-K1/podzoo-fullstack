import fallbackImg from "../image/default.jpg"


/**  handle when image src comes back as error.
 * It provides fallback image
*/
const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImg;
}

/** Some podcast description has HTML tag in sentences
 * this function will remove that. 
 * got info from:
 * https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/
 */
function removeTags(str) {
    if ((str===null) || (str===''))
        return "";
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}
export {
    removeTags,
    handleImageError
};