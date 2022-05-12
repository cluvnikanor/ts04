import { PublicUser } from "./PublicUser";

export class Mandala {
    id: string | null = null;
    publicUsers: PublicUser[] = [];
    userQuantity: number = 0;
    timeOut?: string = '';


    constructor(
        id?: string | null,
        publicUsers?: PublicUser[],
        userQuantity?: number,
        timeOut?: string,
    ) {
        this.id = id ? id : null;
        this.publicUsers = publicUsers ? publicUsers : [];
        this.userQuantity = userQuantity ? userQuantity : 0;
        this.timeOut = timeOut ? timeOut : '';
    }
}