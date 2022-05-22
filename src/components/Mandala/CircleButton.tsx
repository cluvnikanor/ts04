import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa"
import { CircleButtonProps } from './CircleButtonProps';
import TakeRole from './TakeRole';


function CircleButton({ className, color, left, top, title, isActive, publicUser, register, }: CircleButtonProps) {

    let backgroundColor = isActive ? color : 'grey';
    const buttonTitle = publicUser.id ? `${publicUser.name}\n${title}` : title;

    const handleClick = () => {
        register(className);
    }

    const buttonInitSize = 128;
    const zoom = 0.4;
    const buttonSize = buttonInitSize * zoom;

    return (
        <>
            <button
                style={{
                    backgroundColor: backgroundColor,
                    border: `2px solid ${color}`,
                    left: left,
                    width: buttonSize,
                    top: top,
                    height: buttonSize,
                    borderRadius: buttonSize / 2,
                    padding: 0,
                    position: 'absolute',
                    fontSize: '14px',
                }}
                type="button"
                className={className}
                data-toggle="tooltip" data-placement="right"
                title={buttonTitle}
                onClick={handleClick}
            >
                {isActive ? publicUser.name : <FaPlusCircle color={color} size="40px" />}
            </button>
            {/* {showRegistration &&
                <TakeRole
                    title={title}
                    // activate={activate}
                    handleCancel={handleCancel}
                    // publicUser={publicUser}
                     />} */}
        </>
    )
}

export default CircleButton;