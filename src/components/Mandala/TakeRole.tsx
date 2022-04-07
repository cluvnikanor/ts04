interface TakeRoleProps{
    title:string;
}

function TakeRole(props: TakeRoleProps) {
    return (
        <>
            <p>
               `
               להרשם לתפקיד 
               {props.title}
               ?`
      
            </p>
        </>
    )
}

export default TakeRole;