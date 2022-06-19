import { useContext} from "react";
import { PublicUser } from "../../types/PublicUser";
import { appContext, IAppContext } from "../../AppContext";
import MandalaSunPage from "../Admin/MandalaSunPage";
import MandalaAdminPage from "../Admin/MandalaAdminPage";
import MandalaUserPage from "./MandalaUserPage";

interface MandalasProps {
    publicUser: PublicUser;
}

function Mandalas({ publicUser, }: MandalasProps) {

    const { isAdmin, token }: IAppContext = useContext(appContext);

    return (
        <>
            {isAdmin ?
                <MandalaAdminPage
                    adminToken={token}
                />
                :
                publicUser.mandalaIndex === 0 ?
                    <MandalaSunPage
                        token={token}
                        mandalaId={publicUser.mandalaId}
                    />
                    :
                    <MandalaUserPage
                        publicUser={publicUser}
                        token={token}
                    />
            }
        </>
    )
}

export default Mandalas;