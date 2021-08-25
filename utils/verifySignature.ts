import nacl from "tweetnacl";


export const verifySignature = (data: any, signature: any, key: any) => {
    return nacl.sign.detached.verify(data, signature, key.toBuffer())
 }