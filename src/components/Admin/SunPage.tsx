import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { User } from "../../types/User";

interface SunProps {
    mandalaId: string;
}

function SunPage({ mandalaId, }: SunProps) {

    // const [token, setToken] = useState('');
    const [mandalaUsers, setMandalaUsers] = useState<Array<User>>([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        storedToken &&
            storedToken !== 'undefined' &&
            // setToken(storedToken) &&
            retrieveMandalaUsers(storedToken);
    }, []);

    // useEffect(() => {
    //     retrieveMandalaUsers();
    // }, [token]);

    const retrieveMandalaUsers = (token: string) => {
        MandalaService.getMandalaUsers(mandalaId, token)
            .then((response: any) => {
                setMandalaUsers(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    return (
        <>
            <h1>ניהול מנדלה</h1>
            <h2>משתמשים רשומים במנדלה</h2>
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
                    {mandalaUsers && mandalaUsers.map((user, index) => (
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
    )
}

export default SunPage;