
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
                left: '90px',
                top: '60px',
            }}>
                להרשם לתפקיד
                &nbsp;
                {title}
                ?

            </p >
            <div style={{
                position: 'fixed',
                left: '135px',
                top: '90px',
            }}>
                <button type="button"
                    className="btn btn-success"
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