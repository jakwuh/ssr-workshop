import axios from 'axios';
import toCamelCase from 'camelcase-keys';
import { stringify } from 'qs';

const client = axios.create({
    paramsSerializer: params => stringify(params, { arrayFormat: 'brackets' }),
    baseURL: ONLINER_API_BASE_URL,
});

export default {
    fetchApartments: (location, page = 1) => {
        return client.get('/search/apartments', {
            params: {
                bounds: location,
                order: 'created_at:desc',
                page,
            },
        }).then(response => toCamelCase(response.data, { deep: true }))
    }
}
