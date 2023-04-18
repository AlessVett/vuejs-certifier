import { Buffer } from 'buffer';
import * as crypto from "crypto";
import Axios from "axios";
export default {
    checker: {
        response: (response) => {
            const { config, data, headers, request, status, statusText } = response;

            if (typeof data.status !== "undefined") {
                if (data.status) {
                    if (typeof data.logged !== "undefined") {
                        if (!data.logged) {
                            localStorage.removeItem('token-acb06ddc-8fc5-4c56-ad6c-b51046c5cc5c');
                            localStorage.removeItem('user-acb06ddc-8fc5-4c56-ad6c-b51046c5cc5c');
                        } else {
                            if (typeof data.checked !== "undefined") {
                                if (data.checked) {
                                    return true
                                }
                            }
                            if (typeof data.token !== "undefined" && data.user !== "undefined") {
                                localStorage.setItem('token-acb06ddc-8fc5-4c56-ad6c-b51046c5cc5c', data.token);
                                localStorage.setItem('user-acb06ddc-8fc5-4c56-ad6c-b51046c5cc5c', JSON.stringify(data.user))
                            }
                        }
                    }
                }
            }
        },
        csrf: () => {
            Axios.get('http://csrf.localhost:3000/').then((response) => {
                console.log(response.data.csrfToken)
                Axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken
            }, (error) => console.log(error));
        }
    },
    argo: {
        authorization: {
            build: () => {
                const user = JSON.parse(localStorage.getItem('user-acb06ddc-8fc5-4c56-ad6c-b51046c5cc5c'));
                const serverPublicKey = Buffer.from(user.serverPublicKey, 'base64').toString('ascii'),
                    privateKey = Buffer.from(user.privateKey, 'base64'),
                    content = Buffer.from('access-to-argo-acb06ddc-8fc5-4c56-ad6c-b51046c5cc5c'),
                    encodedContent = crypto.publicEncrypt({
                        key: serverPublicKey,
                        padding: crypto.constants.RSA_PKCS1_PADDING,
                        oaepHash: 'sha256'
                    }, content);

                const sign = crypto.createSign('sha256');
                sign.update(content);
                sign.end();

                const signature = sign.sign(Buffer.from(privateKey));

                return {
                    content: encodedContent.toString('base64'),
                    signature: signature.toString('base64')
                }
            }
        }
    }
}