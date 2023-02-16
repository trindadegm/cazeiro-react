// @ts-check

/**
 * @param {string} method
 * @param {string} uri
 * @param {any} data
 * @returns {Promise<any>}
 * */
export async function request(method, uri, data) {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.addEventListener('loadend', () => {
            // console.debug('request ended');
            if (request.response == null) {
                reject(Error('XHR request failed'));
            } else {
                // console.debug('Response Type: ' + request.responseType);
                let body = request.response;
                if (request.getResponseHeader('Content-Type')?.includes('application/json')) {
                    body = JSON.parse(body);
                }
                // console.debug('Header Content Type: ' + request.
                resolve({
                    status: request.status,
                    body
                });
            }
        });
        request.open('POST', uri);
        if (typeof(data) != 'string') {
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(data));
        } else {
            request.send(data);
        }
    });
}

/**
 * @param {string} uri
 * @param {any} data
 * @returns {Promise<any>}
*/
export async function post(uri, data) {
    return await request('POST', uri, data);
}

/**
 * @param {string} uri
 * @param {any} data
 * @returns {Promise<any>}
*/
export async function get(uri, data) {
    return await request('GET', uri, data);
}