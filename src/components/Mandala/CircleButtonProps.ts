import { PublicUser } from "../../types/PublicUser";

export class CircleButtonProps {
    className: string = '';
    color: string = 'white';
    left: number = 0;
    top: number = 0;
    title: string = '';
    isActive: boolean = false;
    activate: () => void;
    publicUser: PublicUser = new PublicUser;
    // canRegister: boolean = false;
    register: () => void;

    constructor(
        className: string,
        color: string,
        left: number,
        top: number,
        title: string,
        isActive?: boolean,
        activate?: () => boolean,
        publicUser?: PublicUser,
        // canRegister?: boolean,
        register?: () => void,
    ) {
        this.className = className;
        this.color = color;
        this.left = left;
        this.top = top;
        this.title = title;
        this.isActive = isActive ? isActive : false;
        this.activate = activate ? activate : () => { };
        this.publicUser = publicUser ? publicUser : new PublicUser;
        // this.canRegister = canRegister ? canRegister : false;
        this.register = register ? register : () => {};
    }
}