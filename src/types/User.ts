export class User {
    id: string | null = null;
    name = '';
    site = '';
    mandalaId = '';
    mandalaIndex = -1;
    phone = '';
    email = '';
    password = '';

    constructor(
        id?: string | null,
        name?: string,
        site?: string,
        mandalaId?: string,
        mandalaIndex?: number,
        phone?: string,
        email?: string,
        password?: string,
    ) {
        this.id = id ? id : null;
        this.name = name ? name : '';
        this.site = site ? site : '';
        this.mandalaId = mandalaId ? mandalaId : '';
        this.mandalaIndex = mandalaIndex ? mandalaIndex : -1;
        this.phone = phone ? phone : '';
        this.email = email ? email : '';
        this.password = password ? password : '';
    }
}