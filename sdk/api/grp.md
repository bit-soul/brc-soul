## GET /api/grp/:grp?mydid=xxx
```
get group info

return {
    code: number,
    mess: string,
    data: {
        grp: number,        //group number
        creator: number,    //creator did number
        admin: number,      //administrator did number
        addr: string,       //administrator address
        time: number,       //group last modify time
        name: "group-name",         //optional group name
        desc: "group-description",  //optional group description
        icon: "ordi://53098586"     //optional group icon, may be stored in ipfs, http, ordi and so on 
        members: number,    //group members number,
        joined: boolean,    //whether mydid joined this group
    }
}
```


## GET /api/grps?mydid=xxx&size=xxx&page=xxx
```
get all groups info

return {
    code: number,
    mess: string,
    data: [{
        grp: number,        //group number
        creator: number,    //creator did number
        admin: number,      //administrator did number
        addr: string,       //administrator address
        time: number,       //group last modify time
        name: "group-name",         //optional group name
        desc: "group-description",  //optional group description
        icon: "ordi://53098586"     //optional group icon, may be stored in ipfs, http, ordi and so on 
        members: number,    //group members number,
    }, ...]
}
```


## GET /api/mygrps?mydid=xxx&size=xxx&page=xxx
```
get my(administrator) groups info

return {
    code: number,
    mess: string,
    data: [{
        grp: number,        //group number
        creator: number,    //creator did number
        admin: number,      //administrator did number
        addr: string,       //administrator address
        time: number,       //group last modify time
        name: "group-name",         //optional group name
        desc: "group-description",  //optional group description
        icon: "ordi://53098586"     //optional group icon, may be stored in ipfs, http, ordi and so on 
        members: number,    //group members number,
    }, ...]
}
```


## GET /api/batchgrps?grps=[grp1,grp2,...,grpn]&mydid=xxx
```
get batch groups info

return {
    code: number,
    mess: string,
    data: [{
        grp: number,        //group number
        creator: number,    //creator did number
        admin: number,      //administrator did number
        addr: string,       //administrator address
        time: number,       //group last modify time
        name: "group-name",         //optional group name
        desc: "group-description",  //optional group description
        icon: "ordi://53098586"     //optional group icon, may be stored in ipfs, http, ordi and so on 
        members: number,    //group members number,
    }, ...]
}
```


## GET /api/members?vcc=xxx&mydid=xxx&size=xxx&page=xxx
```
get all members of the group

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


## GET /api/leavesbt?grp=xxx&mydid=xxx
```
get the sbt should be burn when leave the group

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
