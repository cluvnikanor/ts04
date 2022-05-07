// import { PublicUser } from "../../types/PublicUser";

interface TakeRoleProps {
    title: string;
    // activate: () => void;
    // publicUser: PublicUser;
    handleRegister: () => void
    handleCancel: () => void;
}

function TakeRole({ title, handleRegister, handleCancel }: TakeRoleProps) {

    return (
        <>
            <p
                style={{
                    position: 'fixed',
                    top: '60px',
                }}>
                `
                להרשם לתפקיד
                &nbsp;
                {title}
                ?`

            </p >
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