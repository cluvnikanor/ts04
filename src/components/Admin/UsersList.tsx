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

    const { isAdmin, token }: IAppContext = useContext(appContext);

    useEffect(() => {
        console.log("in UsersList: retrieving users")
        if (isAdmin) {
            retrieveUsers();
            retrieveDeletedUsers();
        } else {
            retrievePublicUsers();
        }
    }, []);

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
        setTimeout(() => retrievePublicUsers(), 500);
    }

    return (
        <>
            <h1>משתמשים</h1>
            {publicUsers &&
                <>
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
                    {isAdmin &&
                        <>
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th>דוא"ל</th>
                                        <th>טלפון</th>
                                        <th>שם</th>
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
                                >מחיקה
                                </button>
                            }
                            {confirm &&
                                <div className="alert alert-danger" role="alert">
                                    Are you sure?
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={deleteUser}
                                    >כן, למחוק
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handleDeleting()}
                                    >ביטול
                                    </button>
                                </div>
                            }
                            <h2>משתמשים שנמחקו</h2>
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th>דוא"ל</th>
                                        <th>טלפון</th>
                                        <th>שם</th>
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
                        </>
                    }
                </>
            }
        </>
    )
}

export default UsersList;