//import { createApp } from 'vue'
//import App from './App.vue'
import Keycloak from "keycloak-js";

//createApp(App).mount('#app')


let initOptions = {
    url: 'http://192.168.1.16:8080/',
    realm: 'authenticate_keycloak',
    clientId: 'authenticate_keycloak_api',
    onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth) {
        console.log("nom authentifié - creer la vue");
        window.location.reload();
    } else {
        console.log("load ok");
        console.log(keycloak.token);

        //Vue.$log.info("Authenticated");
        // new Vue({
        //     el: '#app',
        //     render: h => h(App, { props: { keycloak: keycloak } })
        // })
    }

//Token Refresh
    setInterval(() => {
        console.log("dans set interval");
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.log("token refresh");
                //Vue.$log.info('Token refreshed' + refreshed);
            } else {
                console.log("token not refresh");
                //Vue.$log.warn('Token not refreshed, valid for '
                //    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).catch(() => {
            console.log("premier catch");
            //Vue.$log.error('Failed to refresh token');
        });
    }, 6000)

}).catch(() => {
    console.log("passage dans catch");
    //Vue.$log.error("Authenticated Failed");
});