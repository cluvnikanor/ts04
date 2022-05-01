export class PublicUser {
    id: string | null = null;
    name = '';
    site = '';
    mandalaId = '';
    roll = -1;

    constructor(
        id?: string | null,
        name?: string,
        site?: string,
        mandalaId?: string,
        roll?: number,

    ) {
        this.id = id ? id : null;
        this.name = name ? name : '';
        this.site = site ? site : '';
        this.mandalaId = mandalaId ? mandalaId : '';
        this.roll = roll ? roll : -1;
    }
}