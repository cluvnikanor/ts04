
interface TakeRoleProps {
    title: string;
    handleRegister: () => void
    handleCancel: () => void;
}

function TakeRole({ title, handleRegister, handleCancel }: TakeRoleProps) {

    return (
        <>
            <p style={{
                position: 'fixed',
                top: '60px',
            }}>
                להרשם לתפקיד
                &nbsp;
                {title}
                ?

            </p >
            <div style={{
                position: 'fixed',
                top: '90px',
            }}>
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
            </div>
        </>
    )
}

export default TakeRole;