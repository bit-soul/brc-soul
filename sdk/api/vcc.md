## GET /api/vcc/:vcc?mydid=xxx
```
get collection info

return {
    code: number,
    mess: string,
    data: {
        vcc: number,        //vc collection number
        creator: number,    //creator did number
        admin: number,      //administrator did number
        addr: string,       //administrator address
        time: number,       //vc collection last modify time
        name: "collection-name",        //optional vc collection name
        desc: "collection-description", //optional vc collection description
        icon: "ordi://53098586"         //optional vc collection icon, may be stored in ipfs, http, ordi and so on 
        members: number,    //vc collection members number,
        joined: boolean,    //whether mydid joined this collection
    }
}
```


## GET /api/vccs?mydid=xxx&size=xxx&page=xxx
```
get all collections info

return {
    code: number,
    mess: string,
    data: [{
        vcc: number,        //vc collection number
        creator: number,    //creator did number
        admin: number,      //administrator did number
        addr: string,       //administrator address
        time: number,       //vc collection last modify time
        name: "collection-name",        //optional vc collection name
        desc: "collection-description", //optional vc collection description
        icon: "ordi://53098586"         //optional vc collection icon, may be stored in ipfs, http, ordi and so on 
        members: number,    //vc collection members number,
    }, ...]
}
```


## GET /api/myvccs?mydid=xxx&size=xxx&page=xxx
```
get my(administrator) collections info

return [{
    code: number,
    mess: string,
    data: [{
        vcc: number,        //vc collection number
        creator: number,    //creator did number
        admin: number,      //administrator did number
        addr: string,       //administrator address
        time: number,       //vc collection last modify time
        name: "collection-name",        //optional vc collection name
        desc: "collection-description", //optional vc collection description
        icon: "ordi://53098586"         //optional vc collection icon, may be stored in ipfs, http, ordi and so on 
        members: number,    //vc collection members number,
    }, ...]
}
```


## GET /api/batchgrps?vccs=[vcc1,vcc2,...,vccn]&mydid=xxx
```
get batch collections info

return [{
    code: number,
    mess: string,
    data: [{
        vcc: number,        //vc collection number
        creator: number,    //creator did number
        admin: number,      //administrator did number
        addr: string,       //administrator address
        time: number,       //vc collection last modify time
        name: "collection-name",        //optional vc collection name
        desc: "collection-description", //optional vc collection description
        icon: "ordi://53098586"         //optional vc collection icon, may be stored in ipfs, http, ordi and so on 
        members: number,    //vc collection members number,
    }, ...]
}
```


## GET /api/members?vcc=xxx&mydid=xxx&size=xxx&page=xxx
```
get all members of the collection

return {
    code: number,
    mess: string,
    data: [{
        did: number,    //did number
        addr: string,   //did address
        time: number,   //did last modify time
        name: "did-name",         //optional did name
        biog: "did-biography",    //optional did biography
        icon: "ordi://53098586",  //optional did icon, may be stored in ipfs, http, ordi and so on
        follower:  number,  //follower number
        following: number,  //following number
    }, ...]
}
```


## GET /api/mycoidseq?mydid=xxx
```
get the collection sequence number when create collection or group

return {
    code: number,
    mess: string,
    data: number, //collection id sequence
}
```


## GET /api/burnsbt?vcc=xxx&mydid=xxx
```
get the sbt should be burn when leave the vc collection

return {
    code: number,
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
    }
}
```
