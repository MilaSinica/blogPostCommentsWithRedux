import axios from 'axios';

export default axios.create({
    headers: {
        Authorization: 'Client-ID kwBc01HChEalu54iAH4DcT8JdoKigfPfp-ZitBo6SfY'
    },
    baseUrl: 'https://api.unsplash.com/'
});