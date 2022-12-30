import { createApp } from 'vue'
import App from './App.vue'
import Keycloak from "keycloak-js";

createApp(App).mount('#app')

//hF7FPOfZiyHCew6u0Ru65dWmXsP82qrt

let initOptions = {
    url: 'http://192.168.1.16:8080/',
    realm: 'authenticate_keycloak',
    clientId: 'authenticate_keyclaok_vue',
    clientSecret: 'hF7FPOfZiyHCew6u0Ru65dWmXsP82qrt',
    onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);
let Vue;

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        Vue.$log.info("Authenticated");
        new Vue({
            el: '#app',
            render: h => h(App, { props: { keycloak: keycloak } })
        })
    }


//Token Refresh
    setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                Vue.$log.info('Token refreshed' + refreshed);
            } else {
                Vue.$log.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).catch(() => {
            Vue.$log.error('Failed to refresh token');
        });
    }, 6000)

}).catch(() => {
    Vue.$log.error("Authenticated Failed");
});