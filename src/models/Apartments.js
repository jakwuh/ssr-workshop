import { observable } from 'mobx';
import api from '../http/api';

const fetchApartments = (page) => api.fetchApartments({
    lb: {
        lat: 53.766518528555046,
        long: 27.375513017177585
    },
    rt: {
        lat: 54.0415974913786,
        long: 27.718835771083835,
    }
}, page);

export default class Apartments {
    @observable items = [];

    constructor() {
        this.fetchApartments();
    }

    fetchApartments() {
        const items = [];

        const fetch = (page) => {
            return fetchApartments(page).then(({ apartments, page }) => {
                items.push(...apartments);

                if (page.current !== page.last) {
                    // return fetch(page.current + 1);
                }
            })
        };

       fetch().then(() => {
           this.items = items;
       }).catch(console.error);
    }
}
