export class User{
    username;
    firstname;
    lastname;
    role;
    token;

    constructor(username, firstname, lastname, role, token) {
        this.username= username;
        this.firstname= firstname;
        this.lastname= lastname;
        this.role= role;
        this.token= token;
    }

}