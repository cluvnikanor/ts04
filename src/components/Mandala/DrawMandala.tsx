import { useEffect, useState } from 'react';
import { Line } from 'react-lineto';
import { Mandala } from '../../types/Mandala';
import { PublicUser } from '../../types/PublicUser';
import CircleButton from './CircleButton';
import { CircleButtonProps } from './CircleButtonProps'
import { LineProps } from './LineProps';
// import TakeRole from './TakeRole';

interface drawMandalaProps {
    mandala: Mandala;
    publicUser: PublicUser;
    register: (className: string) => void;
}

function DrawMandala({ mandala, publicUser, register }: drawMandalaProps) {
    // const [registering, setRegistering] = useState(NaN);

    const style = {
        className: 'line',
        delay: 0,
        borderColor: "yellow",
        borderWidth: 4,
        position: "relative",/*DW*/
    };

    const drawLine = (a: CircleButtonProps, b: CircleButtonProps, rad?: number) => {
        if (!rad) rad = 0;
        const x0 = a.left + rad;
        const y0 = a.top + rad;
        const x1 = b.left + rad;
        const y1 = b.top + rad;
        const length = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
        const dx = rad * (x1 - x0) / length;
        const dy = rad * (y1 - y0) / length;
        return (
            new LineProps(x0 + dx, y0 + dy, x1 - dx, y1 - dy,)
        )
    }

    const zoom = 0.4;

    const circlesInitLeft = [425, 605, 695, 695, 695, 845, 695, 845, 240, 150, 150, 150, 0, 150, 0,];
    const circlesInitTop = [320, 320, 175, 465, 0, 80, 620, 560, 320, 175, 465, 0, 80, 620, 560,];
    const circlesLeft = circlesInitLeft.map(value => (value * zoom));
    const circlesTop = circlesInitTop.map(value => (value * zoom));

    const circleRadius = 64 * zoom;

    const initLeft = 10;
    const initTop = 100;

    const circles = [
        new CircleButtonProps('0', 'yellow', initLeft + circlesLeft[0], initTop + circlesTop[0], 'מדריכה',),
        new CircleButtonProps('1', 'pink', initLeft + circlesLeft[1], initTop + circlesTop[1], 'תומכת',),
        new CircleButtonProps('2', 'skyblue', initLeft + circlesLeft[2], initTop + circlesTop[2], 'תומכת רגשית',),
        new CircleButtonProps('3', 'skyblue', initLeft + circlesLeft[3], initTop + circlesTop[3], 'תומכת רגשית',),
        new CircleButtonProps('4', 'green', initLeft + circlesLeft[4], initTop + circlesTop[4], 'תומכת טכנית',),
        new CircleButtonProps('5', 'green', initLeft + circlesLeft[5], initTop + circlesTop[5], 'תומכת טכנית',),
        new CircleButtonProps('6', 'green', initLeft + circlesLeft[6], initTop + circlesTop[6], 'תומכת טכנית',),
        new CircleButtonProps('7', 'green', initLeft + circlesLeft[7], initTop + circlesTop[7], 'תומכת טכנית',),
        new CircleButtonProps('8', 'pink', initLeft + circlesLeft[8], initTop + circlesTop[8], 'תומכת',),
        new CircleButtonProps('9', 'skyblue', initLeft + circlesLeft[9], initTop + circlesTop[9], 'תומכת רגשית',),
        new CircleButtonProps('10', 'skyblue', initLeft + circlesLeft[10], initTop + circlesTop[10], 'תומכת רגשית',),
        new CircleButtonProps('11', 'green', initLeft + circlesLeft[11], initTop + circlesTop[11], 'תומכת טכנית',),
        new CircleButtonProps('12', 'green', initLeft + circlesLeft[12], initTop + circlesTop[12], 'תומכת טכנית',),
        new CircleButtonProps('13', 'green', initLeft + circlesLeft[13], initTop + circlesTop[13], 'תומכת טכנית',),
        new CircleButtonProps('14', 'green', initLeft + circlesLeft[14], initTop + circlesTop[14], 'תומכת טכנית',),
    ]

    const lines = [
        drawLine(circles[0], circles[1], circleRadius),
        drawLine(circles[1], circles[2], circleRadius),
        drawLine(circles[1], circles[3], circleRadius),
        drawLine(circles[2], circles[4], circleRadius),
        drawLine(circles[2], circles[5], circleRadius),
        drawLine(circles[3], circles[6], circleRadius),
        drawLine(circles[3], circles[7], circleRadius),
        drawLine(circles[0], circles[8], circleRadius),
        drawLine(circles[8], circles[9], circleRadius),
        drawLine(circles[8], circles[10], circleRadius),
        drawLine(circles[9], circles[11], circleRadius),
        drawLine(circles[9], circles[12], circleRadius),
        drawLine(circles[10], circles[13], circleRadius),
        drawLine(circles[10], circles[14], circleRadius),
    ]

    // const register = (className: string) => {
    //     setRegistering(parseInt(className));
    // }

    // const handleCancel = () => {
    //     setRegistering(NaN);
    // }

    return (
        <>
            {/* {registering &&
                <TakeRole
                    title={circles[registering].title}
                    handleCancel={handleCancel}

                />} */}
            {lines.map(i => (
                <Line
                    key={`${i.x0}${i.y0}${i.x1}${i.y1}`}
                    x0={i.x0}
                    y0={i.y0}
                    x1={i.x1}
                    y1={i.y1}
                    {...style}
                />
            ))}

            {circles.map(i => (
                <CircleButton
                    key={i.className}
                    className={i.className}
                    color={i.color}
                    title={i.title}
                    left={i.left}
                    top={i.top}
                    isActive={mandala.publicUsers ?
                        mandala.publicUsers[i.className as unknown as number].name ?
                            true : false
                        : false}
                    // activate={() => handleActivate(i.className)}
                    // activate={() => register(i.className as unknown as number)}
                    publicUser={mandala.publicUsers[i.className as unknown as number]}
                    // canRegister={publicUser.id && (publicUser.mandalaIndex > 14 || publicUser.mandalaIndex < 0) ? true : false}
                    register={register}
                />
            ))}
        </>
    )
}

export default DrawMandala