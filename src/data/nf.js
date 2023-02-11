// @ts-check
import { post } from './requests.js';

class Nf {
    /**
     * @param {string} nfeId
     */
    constructor(nfeId) {
        // post('http://localhost:3080', { nfeId });
        this.nfeId = nfeId;
        this.entries = [];
    }

    async save() {
        const response = await post('http://localhost:3080/v1/nf', {
            nfeId: this.nfeId,
            entries: this.entries
        });
        // console.debug(JSON.stringify(response));
        if (response.status !== 200) {
            throw Error('Could not save data to database');
        } else {
            return response.body.id;
        }
    }
}

export default Nf;