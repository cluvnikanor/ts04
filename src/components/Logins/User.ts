export class User {
    id = null;
    name = '';
    site = '';
    email = '';
    password = '';

    constructor(
        id?: any | null,
        name?: string,
        site?: string,
        email?: string,
        password?: string,
    ) {
        this.id = null;
        this.name = name ? name : '';
        this.site = site ? site : '';
        this.email = email ? email : '';
        this.password = password ? password : '';
    }
}