export const colors = ['yellow', 'pink', 'skyblue', 'skyblue', 'green', 'green', 'green', 'green',
    'pink', 'skyblue', 'skyblue', 'green', 'green', 'green', 'green',]


export const circlesInitLeft = [425, 605, 695, 695, 695, 845, 695, 845, 240, 150, 150, 150, 0, 150, 0,];
export const circlesInitTop = [320, 320, 175, 465, 0, 80, 620, 560, 320, 175, 465, 0, 80, 620, 560,];

export const roles = colors.map(color => {
    switch (color) {
        case 'yellow':
            return 'מדריכה';
        case 'pink':
            return 'תומכת';
        case 'skyblue':
            return 'תומכת רגשית';
        case 'green':
            return 'תומכת טכנית';
        default:
            return '';
    }

})