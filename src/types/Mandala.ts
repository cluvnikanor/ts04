import { PublicUser } from "./PublicUser";

export class Mandala {
    id: string | null = null;
    publicUsers: PublicUser[] = [];

    constructor(
        id?: string | null,
        publicUsers?: PublicUser[],
    ) {
        this.id = id ? id : null;
        this.publicUsers = publicUsers ? publicUsers : [];
    }
}