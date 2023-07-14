function removeTags(str) {
    if ((str===null) || (str===''))
        return "";
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}
//  used from https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/
export default removeTags;