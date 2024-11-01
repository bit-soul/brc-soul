## GET /api/sbt?coid=xxx&vcid=xxx&flag=xxx&time=xxx&owner=xxx
```
get the sbt info

return {
    code: number, //1:NOTMINT; 2:MINTED; 3:BURNED; 4:CANCELED
    mess: string,
    data: {
        coid: number,   //vc collection id
        vcid: number,   //vc id
        owner: number,  //vc owner
        flag: number,   //vc flag
        time: number,   //vc time
        signer: number, //vc signer did
        mtime: number,  //sbt mint time
        ctrl: map,      //optional control
        attr: map,      //optional attribute
        state: number,  //+n:minted n times; -n:burned n times
    }
}
```
