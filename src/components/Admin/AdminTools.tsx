import { useState } from "react";
import MandalaService from "../../services/MandalaService";
import { User } from "../Logins/User";

interface AdminToolsProps {
    adminToken: string;
    users: User[];
    getUsersList: (usersList: User[]) => void;

}

function AdminTools({ adminToken, users, getUsersList }: AdminToolsProps) {

    const [selectedUser, setSelectedUser] = useState(NaN);
    // const [showUsers, setShowUsers] = useState(false);

    const handleCheck = (id: number) => {
        setSelectedUser(id);
    }

    return (
        <>
            <h1>כלי ניהול</h1>
            <h2>משתמשים</h2>
            {users &&
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">שם</th>
                            <th scope="col">אתר</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map((user, index) => (
                            <tr
                                key={index}>
                                <td><input
                                    type="checkbox"
                                    checked={index === selectedUser}
                                    onChange={() => handleCheck(index)}
                                /></td >
                                <td>{user.name}</td>
                                <td>{user.site}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default AdminTools;