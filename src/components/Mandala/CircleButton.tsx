import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa"
import { CircleButtonProps } from './CircleButtonProps';
import TakeRole from './TakeRole';


function CircleButton({ className, color, left, top, title, isActive, activate, }: CircleButtonProps) {
    const [showRegistration, setShowRegistration] = useState(false);
    const [active, setActive] = useState(isActive);

    let backgroundColor = active ? color : 'grey';

    const handleClick = () => {
        setShowRegistration(prev => !prev);
        console.log(isActive)
        console.log(active);
    }

    // const activate = () => {
    //     setActive(true);
    //     // setActive(prev=>!prev);
    //     console.log(isActive)
    //     console.log(active);
    // }

    return (
        <>
            <button
                style={{
                    backgroundColor: backgroundColor,
                    border: `5px solid ${color}`,
                    left: left,
                    width: 128,
                    top: top,
                    height: 128,
                    borderRadius: 64,
                    padding: 0,
                    position: 'absolute',
                }}
                type="button"
                className={className}
                data-toggle="tooltip" data-placement="right"
                title={title}
                onClick={handleClick}
            >
                {active || <FaPlusCircle color={color} size="40px" />}
            </button>
            {showRegistration &&
                <TakeRole
                    title={title}
                    activate={activate}
                />}
        </>
    )
}

export default CircleButton;