import { useContext, useEffect, useState } from "react";
import { IAppContext, appContext } from "../../AppContext";
import MandalaService from "../../services/MandalaService";
import { PublicUser } from "../../types/PublicUser";
import { User } from "../../types/User";

function UsersList() {

    const [selectedUser, setSelectedUser] = useState(-1);
    const [confirm, setConfirm] = useState(false);
    const [publicUsers, setPublicUsers] = useState<Array<PublicUser>>([]);
    const [users, setUsers] = useState<Array<User>>([]);
    const [deletedUsers, setDeletedUsers] = useState<Array<User>>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState('');

    // const { isAdmin, token }: IAppContext = useContext(appContext);


    useEffect(() => {
        localStorage.getItem("isAdmin") === 'true' && setIsAdmin(true);
        const storedToken = localStorage.getItem("token");
        storedToken && storedToken !== 'undefined' && setToken(storedToken);
        // if (isAdmin) {
        //     retrieveUsers();
        //     retrieveDeletedUsers();
        // } else {
        //     retrievePublicUsers();
        // }
    }, []);

    useEffect(() => {
        if (isAdmin) {
            retrieveUsers();
            retrieveDeletedUsers();
        } else {
            retrievePublicUsers();
        }
    }, [token])

    const retrievePublicUsers = () => {
        MandalaService.getPublicUsers()
            .then((response: any) => {
                setPublicUsers(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const retrieveUsers = () => {
        MandalaService.getAllUsers(token)
            .then((response: any) => {
                setUsers(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const retrieveDeletedUsers = () => {
        MandalaService.getDeletedUsers(token)
            .then((response: any) => {
                setDeletedUsers(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const handleCheck = (id: number) => {
        setSelectedUser(id);
    }

    const handleDeleting = () => {
        setConfirm(prev => !prev);
    }

    const deleteUser = () => {
        setConfirm(prev => !prev);
        MandalaService.removeUser(users[selectedUser].id, token);
        setTimeout(() => { retrieveUsers(); retrieveDeletedUsers() }, 500);
    }

    return (
        <>
            <h1>??????????????</h1>
            {publicUsers && <>
                {!isAdmin &&
                    <table className="table table-dark">
                        <tbody>

                            {publicUsers.map((user, index) => (
                                <tr
                                    key={index}>

                                    <td><a href={user.site} className="link-primary">{user.name}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {isAdmin && <>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>??????"??</th>
                                <th>??????????</th>
                                <th>????</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td><a href={user.site} className="link-primary">{user.name}</a></td>

                                    <td width='20'>
                                        <input
                                            type="checkbox"
                                            checked={index === selectedUser}
                                            onChange={() => handleCheck(index)}
                                        />
                                    </td >
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedUser >= 0 &&
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={handleDeleting}
                        >??????????
                        </button>
                    }
                    {confirm &&
                        <div className="alert alert-danger" role="alert">
                            ??????????? ???? {publicUsers[selectedUser].name}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleDeleting()}
                            >??????????
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteUser}
                            >????, ??????????
                            </button>
                        </div>
                    }
                    {deletedUsers.length > 0 && <>
                        <h2>?????????????? ????????????</h2>
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>??????"??</th>
                                    <th>??????????</th>
                                    <th>????</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deletedUsers.map((user, index) => (
                                    <tr
                                        key={index}>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td><a href={user.site} className="link-primary">{user.name}</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>}
                </>}
            </>}
        </>
    )
}

export default UsersList;