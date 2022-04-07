export class CircleButtonProps {
    className: string = '';
    color: string = 'white';
    left: string = '0';
    top: string = '0';
    title: string = '';
    isActive: boolean = false;

    constructor(
        className: string,
        color: string,
        left: string,
        top: string,
        title: string,
        isActive?: boolean,
    ) {
        this.className = className;
        this.color = color;
        this.left = left;
        this.top = top;
        this.title = title;
        this.isActive = isActive ? isActive : false;
    }
}