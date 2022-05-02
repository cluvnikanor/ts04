export class PublicUser {
    id: string | null = null;
    name = '';
    site = '';
    mandalaId = '';
    mandalaIndex = -1;

    constructor(
        id?: string | null,
        name?: string,
        site?: string,
        mandalaId?: string,
        mandalaIndex?: number,

    ) {
        this.id = id ? id : null;
        this.name = name ? name : '';
        this.site = site ? site : '';
        this.mandalaId = mandalaId ? mandalaId : '';
        this.mandalaIndex = mandalaIndex ? mandalaIndex : -1;
    }
}