import axios from 'axios';
import config from './config';
import utils from './utils';
import './storage';


//handling asynchronous call through axios
var api = {
    getData: function (baseURL) {
        return new Promise(function (resolve, reject) {
            axios.get(baseURL, config.apiconfig()).then(result => {
                resolve(result.data)
            }).catch(err => utils.alertMessage(err.message))
        })
    },
    setData: function (name, lat, lang, type, phone, baseURL) {
        return new Promise(function (resolve, reject) {
            axios.post(baseURL, {
                name: name,
                lat: lat,
                lang: lang,
                type: type,
                phone: phone
            }, config.apiconfig()).then(result => {
                console.log(result)
                resolve(result.data)
            }).catch(err => utils.alertMessage(err.message))
        })
    }
}

export default api;