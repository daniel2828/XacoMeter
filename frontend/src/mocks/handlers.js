import {rest} from "msw";

export const handlers = [
    rest.get("http://localhost:3977/api/v1/hashtags/getHashtags", (req,res,ctx)=>
    {
        return res(
        ctx.json([
            {_id:"123123", name:"Daniel", active:true},
            
        ]))
    }),
    rest.delete("http://localhost:3977/api/v1/hashtags/deleteHashtag/123123", (req,res,ctx)=>
    {
        return res(
        ctx.json([
            {status: 200},
            
        ]))
    }),
    rest.put("http://localhost:3977/api/v1/hashtags/updateHashtag/123123", (req,res,ctx)=>
    {
        return res(
        ctx.json([
            {status: 200},
            
        ]))
    }),
]