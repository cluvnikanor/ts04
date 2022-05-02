import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa"
import { CircleButtonProps } from './CircleButtonProps';
import TakeRole from './TakeRole';


function CircleButton({ className, color, left, top, title, isActive, activate, publicUser, }: CircleButtonProps) {
    const [showRegistration, setShowRegistration] = useState(false);

    let backgroundColor = isActive ? color : 'grey';
    const buttonTitle = publicUser.id? `${publicUser.name}\n${publicUser.site}\n${title}`:title;

    const handleCancel = () => {
        setShowRegistration(false);
    }

    const handleClick = () => {
        (publicUser.mandalaIndex > 15 || publicUser.mandalaIndex < 0)
            && setShowRegistration(true);
    }

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
                // style={{
                //     backgroundColor: backgroundColor,
                //     border: `4px solid ${color}`,
                //     left: left,
                //     width: 96,
                //     top: top,
                //     height: 96,
                //     borderRadius: 48,
                //     padding: 0,
                //     position: 'absolute',
                // }}
                type="button"
                className={className}
                data-toggle="tooltip" data-placement="right"
                title={buttonTitle}
                onClick={handleClick}
            >
                {isActive ? publicUser.name : <FaPlusCircle color={color} size="40px" />}
            </button>
            {showRegistration &&
                <TakeRole
                    title={title}
                    activate={activate}
                    handleCancel={handleCancel}
                    publicUser={publicUser} />}
        </>
    )
}

export default CircleButton;