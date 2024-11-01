The SDK helps you easily integrate BRC-Soul Protocol into your dapp,
and you don't need to deploy the BRC-Soul indexer yourself, 
but use our official indexer directly.

The entry point of BRC-Soul API is: 
https://brcapi.bitsoul.xyz

The API return value like following:
```
{
    code: number,   //<0 is error, >=0 is success
    mess: string,   //valid when code<0, error message
    data: object,   //valid when code>=0
}
```