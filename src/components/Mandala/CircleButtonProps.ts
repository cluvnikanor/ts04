import { PublicUser } from "../../types/PublicUser";

export class CircleButtonProps {
    className: string = '';
    color: string = 'white';
    left: string = '0';
    top: string = '0';
    title: string = '';
    isActive: boolean = false;
    activate: () => void;
    publicUser: PublicUser = new PublicUser;

    constructor(
        className: string,
        color: string,
        left: string,
        top: string,
        title: string,
        isActive?: boolean,
        activate?: () => boolean,
        publicUser?: PublicUser,
    ) {
        this.className = className;
        this.color = color;
        this.left = left;
        this.top = top;
        this.title = title;
        this.isActive = isActive ? isActive : false;
        this.activate = activate ? activate : () => { };
        this.publicUser = publicUser ? publicUser : new PublicUser;
    }
}