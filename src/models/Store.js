import { observable } from 'mobx';
import Apartments from './Apartments';

export default class Store {
    @observable greeting = 'hello world';

    constructor() {
        this.apartments = new Apartments();
    }

    serialize() {
        return {
            items: this.apartments.items,
        };
    }

    deserialize(data) {
        this.apartments.items = data.items;
    }
}
