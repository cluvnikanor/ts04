import { Line } from 'react-lineto';
import CircleButton from './CircleButton';
import { CircleButtonProps } from './CircleButtonProps'
import { LineProps } from './LineProps';

function DrawMandala() {
    const style = {
        className: 'line',
        delay: 0,
        borderColor: "yellow",
        borderWidth: 9,
        position: "relative",/*DW*/
    };

    const drawLine = (a: CircleButtonProps, b: CircleButtonProps, rad?: number) => {
        if (!rad) rad = 0;
        const x0 = parseInt(a.left) + rad;
        const y0 = parseInt(a.top) + rad;
        const x1 = parseInt(b.left) + rad;
        const y1 = parseInt(b.top) + rad;
        const length = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
        const dx = rad * (x1 - x0) / length;
        const dy = rad * (y1 - y0) / length;
        return (
            new LineProps(x0 + dx, y0 + dy, x1 - dx, y1 - dy,)
        )
    }

    const circles = [
        new CircleButtonProps('0', 'yellow', '440px', '320px', 'מדריכה',),
        new CircleButtonProps('1', 'pink', '620px', '320px', 'תומכת',),
        new CircleButtonProps('2', 'skyblue', '710px', '175px', 'תומכת רגשית',),
        new CircleButtonProps('3', 'skyblue', '710px', '465px', 'תומכת רגשית',),
        new CircleButtonProps('4', 'green', '710px', '0px', 'תומכת טכנית',),
        new CircleButtonProps('5', 'green', '860px', '80px', 'תומכת טכנית',),
        new CircleButtonProps('6', 'green', '710px', '640px', 'תומכת טכנית',),
        new CircleButtonProps('7', 'green', '860px', '560px', 'תומכת טכנית',),
        new CircleButtonProps('8', 'pink', '255px', '320px', 'תומכת',),
        new CircleButtonProps('9', 'skyblue', '165px', '175px', 'תומכת רגשית',),
        new CircleButtonProps('10', 'skyblue', '165px', '465px', 'תומכת רגשית',),
        new CircleButtonProps('11', 'green', '165px', '0px', 'תומכת טכנית',),
        new CircleButtonProps('12', 'green', '15px', '80px', 'תומכת טכנית',),
        new CircleButtonProps('13', 'green', '165px', '640px', 'תומכת טכנית',),
        new CircleButtonProps('14', 'green', '15px', '560px', 'תומכת טכנית',),
    ]

    const lines = [
        drawLine(circles[0], circles[1], 64),
        drawLine(circles[1], circles[2], 64),
        drawLine(circles[1], circles[3], 64),
        drawLine(circles[2], circles[4], 64),
        drawLine(circles[2], circles[5], 64),
        drawLine(circles[3], circles[6], 64),
        drawLine(circles[3], circles[7], 64),        
        drawLine(circles[0], circles[8], 64),
        drawLine(circles[8], circles[9], 64),
        drawLine(circles[8], circles[10], 64),
        drawLine(circles[9], circles[11], 64),
        drawLine(circles[9], circles[12], 64),
        drawLine(circles[10], circles[13], 64),
        drawLine(circles[10], circles[14], 64),
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
                    isActive={false}
                />
            ))}
        </>
    )
}

export default DrawMandala