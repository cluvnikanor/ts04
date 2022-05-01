interface TakeRoleProps {
    title: string;
    activate: () => void;
}

function TakeRole({ title, activate }: TakeRoleProps) {

    const handleRegister = () => {
        activate();
    }

    const handleCancel = () => { }

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