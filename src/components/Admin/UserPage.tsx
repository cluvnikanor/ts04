import { useContext } from "react";
import { appContext, IAppContext } from "../../AppContext";

function UserPage() {

    const { token }: IAppContext = useContext(appContext);

    return (
        <></>
    )
}

export default UserPage;