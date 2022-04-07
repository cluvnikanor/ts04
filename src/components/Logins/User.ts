export class User {
    name = '';
    site = '';
    email = '';
    password = '';
    id = '';

    constructor(
        name?: string,
        site?: string,
        email?: string,
        password?: string,
        id?: string,
    ) {
        this.name = name ? name : '';
        this.site = site ? site : '';
        this.email = email ? email : '';
        this.password = password ? password : '';
        this.id = id ? id : '';
    }
}