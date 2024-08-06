# brc-soul

## What
brc-soul is the first Bitcoin Social Protocol, it's decentralized, shareable, and safe,
which will be the basis of many DApps on Bitcoin.

**DID(decentralized identifier)** is a decentralized identity system that stores
your profile information on Bitcoin and remains under your control forever. 

**DSN(Decentralized Social Network)** when DIDs follow and certificate each other, then 
the DSN is established, it allows you to build your social network and reputation continuously.

**VC(verifiable credentials)** are digital certificates that help prove an individual's or 
system's identity, similar to a physical passport or driver's license.

**CA(Certificate Authority)** is the entity that issues VC, everyone can be a CA, and 
the CA authority can also be certified by other CAs.

**SBT(soulbond tokens)** are VCs minted on the chain, they are permanently tied to
the address that first inscribes them, non-transferable, ensuring the credibility of
the corresponding address identity.

![](docs/img/brc-soul-entity-relationship.jpg)


## Why
The lack of regulation in the crypto space brings freedom but also comes with scams.
Addressing trust issues in anonymous scenarios becomes crucial. This can significantly
reduce trust costs and, consequently, increase productivity in the crypto world.
brc-soul can effectively solve decentralized trust issues and have important
applications in scenarios such as:

1. Lending platforms can adjust corresponding collateral ratios based on the credibility of addresses, thereby improving capital utilization efficiency.
2. Individuals can assess the credibility of a project based on the reputation of the project initiator's address and decide whether to invest or not.
3. Individuals can develop their social circles in the crypto world based on the credibility of addresses.
4. The decentralized relationship can be stored on the chain forever, without restriction of any centralized app.
5. Every app use the same data, we would never need build our social network and reputation again and again.
6. and so on...

Why should use the Bitcoin chain?
1. Applications on Bitcoin are just emerging, and there is currently no related protocol for a DID identity system. This is an important area in the crypto community.
2. Bitcoin is currently the most secure chain, and personal identity information is the most important information for everyone, so it should be stored on the most secure chain.
3. The various DID identity systems on different chains have caused severe fragmentation in the ecosystem. Bitcoin's position is the most hopeful for standardizing DID identity systems.


## How

![](docs/img/brc-soul-operations.jpg)


### DID Profile opration

**add/update did attribute**

    {
      "p": "brc-soul",                  //protocol
      "op": "did",                      //create/update did option
      "opid": number,                   //option id, should be identity in the same address, to avoid replay attack, timestamp seconds from 1970-01-01 00:00:00 UTC can be used
      "attr": {                         //optional did attributes
        "name": "did-name",             //optional did name
        "biog": "did-biography",        //optional did biography
        "icon": "ordi://53098586",      //optional did icon, may be stored in ipfs, http, ordi and so on
        "xuri": "external json"         //optional extended did attribute, may be stored in ipfs, http, ordi and so on
      },
      "sign": "IClzsZoHbyZuC0+H6D4WCAOSRA3Jm6YZQr9aB/ebI4PPKkw+82zvxI+6/jBv5Xa5nWT1C6L6rplU8f3oE1co7Oo=" //BIP137Signature of all the above message with creator private key
    }

**delete did attribute**

    {
      "p": "brc-soul",
      "op": "did",
      "opid": number,
      "attr": {                         //set attr to be null to delete all the field
        "icon": null,                   //set any field to be null to delete the field
        "xuri": null                    //set any field to be null to delete the field
      },
      "sign": "xxx"                 
    }


### Social Network operation

**follow/unfollow did**

    {
      "p": "brc-soul",
      "op": "net",                       //follow/unfollow option
      "opid": number,
      "fol": [did11, did12, ..., did1n], //new follow did list
      "unf": [did21, did22, ..., did2n], //unfollow did list
      "sign": "xxx"
    }

**group operations**

    group related operation can be realized by CV related operation, with coid_flag 0x01
    "vcc"   : group manager create or update group infomation
    "issue" : group manager sign and issue CV to allow user join the group
    "mint"  : user mint the CV as SBT to join the group
    "burn"  : user burn the CV to leave the group
    "cancel": group manager can cancel the CV to remove a member


### Certificate Authority operation
**create/update VC collection**

    {
      "p": "brc-soul",
      "op": "vcc",                    //create/update VC collection option
      "opid": number,
      "coid": number,                 //VC collection id, should be identity global, ((CA_did<<24)|8bit_flag|16bit_number) 
      "attr": {                       //optional VC collection attributes
        "name": "vc-collection-name", //optional VC collection name
        "desc": "vc-collection-desc", //optional VC collection description
        "icon": "ordi://53098586",    //optional VC collection icon, may be stored in ipfs, http, ordi and so on
        "xuri": "external json"       //optional extended VC collection attribute, may be stored in ipfs, http, ordi and so on
      },
      "sign": "xxx"
    } //vcc should be inscribed to CA's address

**issue Verifiable Credential**

    {
      "vc": {
        "coid": number,                 //VC collection id, should be identity global, ((CA_did<<24)|8bit_flag|16bit_number) 
        "vcid": number,                 //VC id, should be identity in the same collection
        "flag": number,                 //flag to use by CA itself
        "time": 1706146997,             //sign and issue time, must before mint time (+7200s)
        "attr": {                       //optional VC attributes
          "name": "vc-name",            //optional VC name
          "desc": "vc-desc",            //optional VC description
          "icon": "ordi://53098586",    //optional VC icon, may be stored in ipfs, http, ordi and so on
          "xuri": "external json"       //optional extended VC attribute, may be stored in ipfs, http, ordi and so on
          "level": 5,                   //optional VC level
          "score": 100,                 //optional VC score
          "todid": number,              //optional only allow specified did to mint
          "expire": 1706146997,         //optional expire timestamp seconds from 1970-01-01 00:00:00 UTC
          "limitnum": number,           //optional limit to the first limitnum number minter
          "limitutc": 1706146997,       //optional limit to the minter before the limitutc time
        },
        "sign": "xxx"                   //BIP137Signature of all the above messages in vc with CA's private key
      }   
    } //VC is issued by CA through CA's private web server

**cancel Verifiable Credential**

    {
      "p": "brc-soul",
      "op": "cancel",                   //cancel VC option
      "vcs": [[1, coid],                             //type_1, cancel VC in coid all (not allowed here! to avoid destroy all collection)
              [2, coid, [vcid1, vcid2, ..., vcidn]], //type_2, cancel VC by vcid
              [3, coid, flag],                       //type_3, cancel VC by flag
              [4, coid, time_start, time_end],       //type_4, cancel VC by time [start, end], time must before mint time (+7200s)
              [5, coid, flag, time_start, time_end], //type_5, cancel VC by flag and time [start, end], must before mint time (+7200s)
              ...],  
      "sign": "xxx"
    } //cancel should be inscribed to CA's address


### Certificate Receiver operation

**mint SoulBound Token**

    {
      "p": "brc-soul",
      "op": "mint",                     //mint SBT option
      "opid": number,
      "vc": {
        "coid": number,
        "vcid": number,
        "flag": number,
        "time": 1706146997,
        "attr": {
          "name": "vc-name",
          "desc": "vc-desc",
          "icon": "ordi://53098586",
          "xuri": "external json",
          ...
        },
        "sign": "xxx"                   //sign of VC
      },
      "sign": "xxx"                     //sign of option
    }

**burn SoulBound Token**

    {
      "p": "brc-soul",
      "op": "burn",                     //burn SBT option
      "opid": number,
      "vcs": [[1, coid],                             //type_1, burn SBT in coid all
              [2, coid, [vcid1, vcid2, ..., vcidn]], //type_2, burn SBT by vcid
              [3, coid, flag],                       //type_3, burn SBT by flag
              [4, coid, time_start, time_end],       //type_4, burn SBT by time [start, end], time must before mint time (+7200s)
              [5, coid, flag, time_start, time_end], //type_5, burn SBT by flag and time [start, end], must before mint time (+7200s)
              ...],  
      "sign": "xxx"
    }


## Note
* DID number is allocated at the first time people use "did" operation of the brc-soul protocol validly, it is start from one, zero used as reserved number.
* All of the id field shouldn't be zero, or it will be considered as invalid.
* All of the string field is case sensitive, empty string should be considered as valid.
* The inscription is only valid to its creator, Once effective, the transferability of inscriptions does not correlate with the inscribed information.
* The sign must be from the creator, to avoid others' poison.
* vc issue and cancel opration have no "opid" field, because issue is out-link operation and canceled vcid should be invalid forever.
* "opid" shouldn't be zero, should be identity in the same address, to avoid replay attack, timestamp seconds from 1970-01-01 00:00:00 UTC can be used.
* "attr" field can be extended by the application itself, but there should be some standard fields.
* "time" field should use UTC timestamp, and accurate to seconds.
* "coid" must be identity global, ((CA_did<<24)|8bit_flag|16bit_number).
* "vcid" shouldn't be zero, must be identity in the same collection.
* "coid" and "vcid", together, they ensured the uniqueness of the CV.
* "sign" message field should be sorted alphabetically, then serialized, and remove formatting whitespace.
* "xuri" is optional extended attribute, may be stored in ipfs, http, ordi and so on.


## Official Links
1. issues: <https://github.com/bit-soul/brc-soul/issues>
2. email: <coffeeking001@outlook.com>
3. medium: <https://bitsoul.medium.com>
4. telegram: <https://t.me/bitsoul_xyz>
5. discord: <https://discord.gg/3MjNRBhuRv>
6. twitter: <https://twitter.com/bitsoul_xyz>