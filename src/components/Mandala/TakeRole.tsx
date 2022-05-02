import { PublicUser } from "../../types/PublicUser";

interface TakeRoleProps {
    title: string;
    activate: () => void;
    handleCancel: () => void;
    publicUser: PublicUser;
}

function TakeRole({ title, activate, handleCancel, publicUser, }: TakeRoleProps) {

    const handleRegister = () => {
        activate();
        handleCancel();
    }

    return (
        <>
            <p>
                `
                להרשם לתפקיד
                {title}
                ?`

            </p>
            <button type="button"
                className="btn btn-primary"
                onClick={handleRegister}
            >
                להרשם
            </button>
            <button type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
            >
                ביטול
            </button>

        </>
    )
}

export default TakeRole;