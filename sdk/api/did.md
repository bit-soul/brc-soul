
## GET /api/personbydid?did=xxx
```
get personal info by did number

return {
    code: number,   //<0 is error, >=0 is success
    mess: string,   //valid when code<0, error message
    data: {         //valid when code>=0
        did: number,    //did number
        addr: string,   //did address
        time: number,   //did last modify time
        attr: {
            name: "did-name",         //optional did name
            biog: "did-biography",    //optional did biography
            icon: "ordi://53098586",  //optional did icon, may be stored in ipfs, http, ordi and so on
            xuri: "external json",    //optional extended did attribute, may be stored in ipfs, http, ordi and so on
            ...                       //more field extended by the application itself
        }
    }
}
```


## GET /api/personbyaddr?addr=xxx
```
get personal info by did address

return {
    code: number,
    mess: string,
    data: {
        did: number,    //did number
        addr: string,   //did address
        time: number,   //did last modify time
        attr: {
            name: "did-name",         //optional did name
            biog: "did-biography",    //optional did biography
            icon: "ordi://53098586",  //optional did icon, may be stored in ipfs, http, ordi and so on
            xuri: "external json",    //optional extended did attribute, may be stored in ipfs, http, ordi and so on
            ...                       //more field extended by the application itself
        }
    }
}
```


## GET /api/did/:did?mydid=xxx
```
get did info

return {
    code: number,
    mess: string,
    data: {
        did: number,    //did number
        addr: string,   //did address
        time: number,   //did last modify time
        name: "did-name",         //optional did name
        biog: "did-biography",    //optional did biography
        icon: "ordi://53098586",  //optional did icon, may be stored in ipfs, http, ordi and so on
        follower:  number,  //follower number
        following: number,  //following number
        followed:  boolean, //mydid followed it
        followme:  boolean, //it followed mydid
    }
}
```


## GET /api/dids?mydid=xxx&size=xxx&page=xxx
```
get all dids info

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
        followed:  boolean, //mydid followed it
        followme:  boolean, //it followed mydid
    }, ...]
}
```


## GET /api/batchdids?dids=[did1,did2,...,didn]&mydid=xxx
```
get batch dids info

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
        followed:  boolean, //mydid followed it
        followme:  boolean, //it followed mydid
    }, ...]
}
```
