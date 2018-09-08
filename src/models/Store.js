import { observable } from 'mobx';
import Apartments from './Apartments';

export default class Store {
    @observable greeting = 'hello world';

    constructor() {
        this.apartments = new Apartments();
    }
}
