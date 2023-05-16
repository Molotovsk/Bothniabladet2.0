


const API_SECRET = "MqyeLqqS8jZb-C0eLKBXH5RbQmc";
const crypto = require('crypto');
export function createSignature(params) {

    const signature = crypto
        .createHash('sha1')
        .update(`${params}${API_SECRET}`)
        .digest('hex');


    return signature;

}

