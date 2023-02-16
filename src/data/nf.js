import { post } from './requests.js';

class Nf {
    /**
     * @param {string} nfeId
     * @param {string} currency
     */
    constructor(nfeId, currency) {
        // post('http://localhost:3080', { nfeId });
        this.nfeId = nfeId;
        this.currency = currency;
        this.entries = [];
        this.value = '0,00';
    }

    async save() {
        const response = await post('http://localhost:3080/v1/nf', {
            currency: this.currency,
            value: this.value,
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