// let client_id;
// let username;
// let password;
// let grant_type;

import Keycloak from "keycloak-js";

export class ServiceKeycloakVue{

    // user;
    // isAuth;
    //
    serverUrl = 'http://192.168.1.16:8080/realms/authenticate_keycloak/protocol/openid-connect/token';
    // client_id = 'authenticate_keycloak_api';
    // grant_type = 'password';

    body = {
        client_id: 'authenticate_keycloak_api',
        username: 'test3@test.com',
        password: 'test3',
        grant_type: 'password'
    }

    http = new XMLHttpRequest();

    getUser(login){
        // this.body.client_id = this.client_id;
        // this.body.username = login.username;
        // this.body.password = login.password;
        // this.body.grant_type = this.grant_type;
        //this.http.open('POST', this.serverUrl)

        console.log(login);

        let initOptions = {
            url: 'http://192.168.1.16:8080/',
            realm: 'authenticate_keycloak',
            clientId: 'authenticate_keycloak_api',
            username: 'test3@test.com',
            password: 'test3',
            grant_type: 'password'
        }

        console.log(initOptions);

        let keycloak = Keycloak(initOptions);

        keycloak.authServerUrl= "http://192.168.1.16:8080/"
        keycloak.realm = "authenticate_keycloak";
        keycloak.clientId = "authenticate_keycloak_api";

        let promise = keycloak.login(initOptions);
        // console.log(login)
        // let promise = fetch(this.serverUrl, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: this.body,
        //     referrer: "about:client", //ou "" (pas de réferanr) ou une url de l'origine
        //     referrerPolicy: "no-referrer-when-downgrade", //ou no-referrer, origin, same-origin...
        //     mode: "no-cors", //ou same-origin, no-cors
        //     credentials: "same-origin", //ou omit, include
        //     cache: "default", //ou no-store, reload, no-cache, force-cache, ou only-if-cached
        //     redirect: "follow", //ou manual ou error
        //     integrity: "", //ou un hash comme "sha256-abcdef1234567890"
        //     keepalive: false, //ou true pour que la requête survive à la page
        //     signal: undefined //ou AbortController pour annuler la requête
        // });
        return promise;
    }

    loginKeycloak(login){
        try{
            let promise = this.getUser(login);
            console.log(promise);
            return true;
        }catch (ex) {
            return false;
        }

    }

}