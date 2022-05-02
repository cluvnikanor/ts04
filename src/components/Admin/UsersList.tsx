import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { User } from "../../types/User";

interface UsersListToolsProps {
    token: string;
    // users: User[];
    isAdmin: boolean;
    // getUsersList: (usersList: User[]) => void;
}

function UsersList({ token, isAdmin, }: UsersListToolsProps) {

    const [selectedUser, setSelectedUser] = useState(NaN);
    const [confirm, setConfirm] = useState(false);
    const [users, setUsers] = useState<Array<User>>([]);
    // const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        retrieveUsers();
    }, [users]);

    const retrieveUsers = () => {
        MandalaService.getUsers()
            .then((response: any) => {
                setUsers(response.data);
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
    }

    return (
        <>
            <h1>משתמשים</h1>
            {users &&
                <>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">שם</th>
                                <th scope="col">אתר</th>
                                {isAdmin &&
                                    <th scope="col"></th>
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {users.map((user, index) => (
                                <tr
                                    key={index}>

                                    <td>{user.name}</td>
                                    <td>{user.site}</td>
                                    {isAdmin &&
                                        <td><input
                                            type="checkbox"
                                            checked={index === selectedUser}
                                            onChange={() => handleCheck(index)}
                                        /></td >
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isAdmin &&
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={handleDeleting}
                        >Delete
                        </button>}
                    {confirm &&
                        <div className="alert alert-danger" role="alert">
                            Are you sure?
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteUser}
                            >Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleDeleting()}
                            >Cancel
                            </button>
                        </div>}
                </>
            }
        </>
    )
}

export default UsersList;