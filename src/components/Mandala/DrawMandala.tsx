import { useEffect } from 'react';
import { Line } from 'react-lineto';
import { Mandala } from '../../types/Mandala';
import { PublicUser } from '../../types/PublicUser';
import CircleButton from './CircleButton';
import { CircleButtonProps } from './CircleButtonProps'
import { LineProps } from './LineProps';

interface drawMandalaProps {
    mandala: Mandala;
    publicUser: PublicUser;
    handleActivate: (index: number) => void;
}

function DrawMandala({ mandala, publicUser, handleActivate }: drawMandalaProps) {

    const style = {
        className: 'line',
        delay: 0,
        borderColor: "yellow",
        borderWidth: 5,
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

    const circlesInitLeft = [425, 605, 695, 695, 695, 845, 695, 845, 240, 150, 150, 150, 0, 150, 0,];
    const circlesInitTop = [320, 320, 175, 465, 0, 80, 620, 560, 320, 175, 465, 0, 80, 620, 560,];
    const circlesLeft = circlesInitLeft.map(value=>(value*0.5));
    const circlesTop = circlesInitTop.map(value=>(value*0.5));

    const circleRadius = 32;

    const initLeft = 10;
    const initTop = 60;

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

    // const circles = [
    //     new CircleButtonProps('0', 'yellow', initLeft + 425, initTop + 320, 'מדריכה',),
    //     new CircleButtonProps('1', 'pink', initLeft + 605, initTop + 320, 'תומכת',),
    //     new CircleButtonProps('2', 'skyblue', initLeft + 695, initTop + 175, 'תומכת רגשית',),
    //     new CircleButtonProps('3', 'skyblue', initLeft + 695, initTop + 465, 'תומכת רגשית',),
    //     new CircleButtonProps('4', 'green', initLeft + 695, initTop + 0, 'תומכת טכנית',),
    //     new CircleButtonProps('5', 'green', initLeft + 845, initTop + 80, 'תומכת טכנית',),
    //     new CircleButtonProps('6', 'green', initLeft + 695, initTop + 620, 'תומכת טכנית',),
    //     new CircleButtonProps('7', 'green', initLeft + 845, initTop + 560, 'תומכת טכנית',),
    //     new CircleButtonProps('8', 'pink', initLeft + 240, initTop + 320, 'תומכת',),
    //     new CircleButtonProps('9', 'skyblue', initLeft + 150, initTop + 175, 'תומכת רגשית',),
    //     new CircleButtonProps('10', 'skyblue', initLeft + 150, initTop + 465, 'תומכת רגשית',),
    //     new CircleButtonProps('11', 'green', initLeft + 150, initTop + 0, 'תומכת טכנית',),
    //     new CircleButtonProps('12', 'green', initLeft + 0, initTop + 80, 'תומכת טכנית',),
    //     new CircleButtonProps('13', 'green', initLeft + 150, initTop + 620, 'תומכת טכנית',),
    //     new CircleButtonProps('14', 'green', initLeft + 0, initTop + 560, 'תומכת טכנית',),
    // ]

    // const circles = [
    //     new CircleButtonProps('0', 'yellow', 440, 380, 'מדריכה',),
    //     new CircleButtonProps('1', 'pink', 620, 380, 'תומכת',),
    //     new CircleButtonProps('2', 'skyblue', 710, 235, 'תומכת רגשית',),
    //     new CircleButtonProps('3', 'skyblue', 710, 525, 'תומכת רגשית',),
    //     new CircleButtonProps('4', 'green', 710, 60, 'תומכת טכנית',),
    //     new CircleButtonProps('5', 'green', 860, 140, 'תומכת טכנית',),
    //     new CircleButtonProps('6', 'green', 710, 700, 'תומכת טכנית',),
    //     new CircleButtonProps('7', 'green', 860, 620, 'תומכת טכנית',),
    //     new CircleButtonProps('8', 'pink', 255, 380, 'תומכת',),
    //     new CircleButtonProps('9', 'skyblue', 165, 235, 'תומכת רגשית',),
    //     new CircleButtonProps('10', 'skyblue', 165, 525, 'תומכת רגשית',),
    //     new CircleButtonProps('11', 'green', 165, 60, 'תומכת טכנית',),
    //     new CircleButtonProps('12', 'green', 15, 140, 'תומכת טכנית',),
    //     new CircleButtonProps('13', 'green', 165, 700, 'תומכת טכנית',),
    //     new CircleButtonProps('14', 'green', 15, 620, 'תומכת טכנית',),
    // ]

    // const circles = [
    //     new CircleButtonProps('0', 'yellow', '440px', '380px', 'מדריכה',),
    //     new CircleButtonProps('1', 'pink', '620px', '380px', 'תומכת',),
    //     new CircleButtonProps('2', 'skyblue', '710px', '235px', 'תומכת רגשית',),
    //     new CircleButtonProps('3', 'skyblue', '710px', '525px', 'תומכת רגשית',),
    //     new CircleButtonProps('4', 'green', '710px', '60px', 'תומכת טכנית',),
    //     new CircleButtonProps('5', 'green', '860px', '140px', 'תומכת טכנית',),
    //     new CircleButtonProps('6', 'green', '710px', '700px', 'תומכת טכנית',),
    //     new CircleButtonProps('7', 'green', '860px', '620px', 'תומכת טכנית',),
    //     new CircleButtonProps('8', 'pink', '255px', '380px', 'תומכת',),
    //     new CircleButtonProps('9', 'skyblue', '165px', '235px', 'תומכת רגשית',),
    //     new CircleButtonProps('10', 'skyblue', '165px', '525px', 'תומכת רגשית',),
    //     new CircleButtonProps('11', 'green', '165px', '60px', 'תומכת טכנית',),
    //     new CircleButtonProps('12', 'green', '15px', '140px', 'תומכת טכנית',),
    //     new CircleButtonProps('13', 'green', '165px', '700px', 'תומכת טכנית',),
    //     new CircleButtonProps('14', 'green', '15px', '620px', 'תומכת טכנית',),
    // ]

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
    // const lines = [
    //     drawLine(circles[0], circles[1], 48),
    //     drawLine(circles[1], circles[2], 48),
    //     drawLine(circles[1], circles[3], 48),
    //     drawLine(circles[2], circles[4], 48),
    //     drawLine(circles[2], circles[5], 48),
    //     drawLine(circles[3], circles[6], 48),
    //     drawLine(circles[3], circles[7], 48),
    //     drawLine(circles[0], circles[8], 48),
    //     drawLine(circles[8], circles[9], 48),
    //     drawLine(circles[8], circles[10], 48),
    //     drawLine(circles[9], circles[11], 48),
    //     drawLine(circles[9], circles[12], 48),
    //     drawLine(circles[10], circles[13], 48),
    //     drawLine(circles[10], circles[14], 48),
    // ]

    return (
        <>
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
                    activate={() => handleActivate(i.className as unknown as number)}
                    publicUser={mandala.publicUsers[i.className as unknown as number]}
                />
            ))}
        </>
    )
}

export default DrawMandala