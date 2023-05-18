


const API_SECRET = "ZgjbxrL-GJ3WgIrTwjx7yuh5NhU";
const crypto = require('crypto');
export function createSignature(params) {

    const signature = crypto
        .createHash('sha1')
        .update(`${params}${API_SECRET}`)
        .digest('hex');


    return signature;

}

