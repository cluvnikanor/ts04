export class User {
    id: string | null = null;
    name = '';
    site = '';
    mandalaId = '';
    roll = -1;
    email = '';
    password = '';

    constructor(
        id?: string | null,
        name?: string,
        site?: string,
        mandalaId?: string,
        roll?: number,
        email?: string,
        password?: string,
    ) {
        this.id = id ? id : null;
        this.name = name ? name : '';
        this.site = site ? site : '';
        this.mandalaId = mandalaId ? mandalaId : '';
        this.roll = roll ? roll : -1;
        this.email = email ? email : '';
        this.password = password ? password : '';
    }
}