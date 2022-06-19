import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { Mandala } from "../../types/Mandala";
import { User } from "../../types/User";
import DrawMandala from "../Mandala/DrawMandala";
import { roles } from '../Mandala/CirclesData';

interface MandalaSunPageProps {
    token: string;
    mandalaId: string;
}

function MandalaSunPage({ token, mandalaId, }: MandalaSunPageProps) {

    const [mandala, setMandala] = useState<Mandala>();
    const [mandalaUsers, setMandalaUsers] = useState<Array<User>>([]);
    const [showMandala, setShowMandala] = useState(true);

    const managementButtonText = showMandala ?
        'ניהול מנדלה'
        :
        'חזרה למנדלה'
        ;

    // useEffect(() => {
    //     const storedToken = localStorage.getItem("token");
    //     storedToken &&
    //         storedToken !== 'undefined' &&
    //         retrieveMandalaUsers(storedToken);
    // }, []);

    useEffect(() => {
        retrieveMandalaUsers(token);
    }, []);

    useEffect(() => {
        console.log('retrieving mandala')
        retrieveMandala(mandalaId)
    }, []);

    useEffect(() => {
        console.log(mandala)
    }, [mandala]);

    const retrieveMandala = (mandalaId: string) => {
        MandalaService.getMandala(mandalaId)
            .then((response: any) => {
                setMandala(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const retrieveMandalaUsers = (token: string) => {
        MandalaService.getMandalaUsers(mandalaId, token)
            .then((response: any) => {
                setMandalaUsers(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const handleClose = () => {
        setShowMandala(prev => !prev);
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-success"
                onClick={handleClose}
            >
                {managementButtonText}
            </button>
            {mandala && showMandala ?
                <>
                    <DrawMandala
                        mandala={mandala as Mandala}
                        register={() => { }}
                    />
                </>
                :
                <>
                    {/* <h1>ניהול מנדלה</h1> */}
                    <h2>משתמשים רשומים במנדלה</h2>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>תפקיד</th>
                                <th>דוא"ל</th>
                                <th>טלפון</th>
                                <th>שם</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mandalaUsers && mandalaUsers.map((user, index) => (
                                <tr
                                    key={index}>
                                    <td>{roles[user.mandalaIndex]}</td>
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
    )
}

export default MandalaSunPage;