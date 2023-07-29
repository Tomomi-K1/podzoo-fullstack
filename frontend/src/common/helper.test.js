import { Experimental_CssVarsProvider } from "@mui/material";
import { handleImageError } from "./helper"
import { removeTags } from "./helper"

it('removesTags works fine with sentence with tag', () => {
    const str = '<h1>test<h1>'
    const result = removeTags(str);
    expect(result).toEqual('test');  
}) 

it('removesTags works fine with empty string', () => {
    const str = ''
    const result = removeTags(str);
    expect(result).toEqual('');  
})
