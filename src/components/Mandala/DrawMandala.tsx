import { useEffect } from 'react';
import { Line } from 'react-lineto';
import { Mandala } from '../../types/Mandala';
import CircleButton from './CircleButton';
import { CircleButtonProps } from './CircleButtonProps'
import { LineProps } from './LineProps';
import { circlesInitLeft, circlesInitTop, colors, roles } from './CirclesData';

interface drawMandalaProps {
    mandala: Mandala;
    register: (className: string) => void;
}

function DrawMandala({ mandala, register }: drawMandalaProps) {

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

    const circlesLeft = circlesInitLeft.map(value => (value * zoom));
    const circlesTop = circlesInitTop.map(value => (value * zoom));

    const circleRadius = 64 * zoom;

    const initLeft = 10;
    const initTop = 100;

    const circles = [
        new CircleButtonProps('0', colors[0], initLeft + circlesLeft[0], initTop + circlesTop[0], roles[0],),
        new CircleButtonProps('1', colors[1], initLeft + circlesLeft[1], initTop + circlesTop[1], roles[1],),
        new CircleButtonProps('2', colors[2], initLeft + circlesLeft[2], initTop + circlesTop[2], roles[2],),
        new CircleButtonProps('3', colors[3], initLeft + circlesLeft[3], initTop + circlesTop[3], roles[3],),
        new CircleButtonProps('4', colors[4], initLeft + circlesLeft[4], initTop + circlesTop[4], roles[4],),
        new CircleButtonProps('5', colors[5], initLeft + circlesLeft[5], initTop + circlesTop[5], roles[5],),
        new CircleButtonProps('6', colors[6], initLeft + circlesLeft[6], initTop + circlesTop[6], roles[6],),
        new CircleButtonProps('7', colors[7], initLeft + circlesLeft[7], initTop + circlesTop[7], roles[7],),
        new CircleButtonProps('8', colors[8], initLeft + circlesLeft[8], initTop + circlesTop[8], roles[8],),
        new CircleButtonProps('9', colors[9], initLeft + circlesLeft[9], initTop + circlesTop[9], roles[9],),
        new CircleButtonProps('10', colors[10], initLeft + circlesLeft[10], initTop + circlesTop[10], roles[10],),
        new CircleButtonProps('11', colors[11], initLeft + circlesLeft[11], initTop + circlesTop[11], roles[11],),
        new CircleButtonProps('12', colors[12], initLeft + circlesLeft[12], initTop + circlesTop[12], roles[12],),
        new CircleButtonProps('13', colors[13], initLeft + circlesLeft[13], initTop + circlesTop[13], roles[13],),
        new CircleButtonProps('14', colors[14], initLeft + circlesLeft[14], initTop + circlesTop[14], roles[14],),
    ]

    // const circles = new Array<number>(15).map((index) => {
    //     new CircleButtonProps(`${index}`, colors[index], initLeft + circlesLeft[index],
    //         initTop + circlesTop[index], roles[index]);
    // }) as unknown as CircleButtonProps[];

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
                    publicUser={mandala.publicUsers[i.className as unknown as number]}
                    register={register}
                />
            ))}
            <p
                style={{ fontSize: '18px', }}>
                {mandala.timeOut && `${mandala.timeOut}`.substring(0, 10)}
            </p>
        </>
    )
}

export default DrawMandala