import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { Mandala } from "../../types/Mandala";
import { PublicUser } from "../../types/PublicUser";
import DrawMandala from "../Mandala/DrawMandala";

interface MandalaAdminPageProps {
    adminToken: string;
}

function MandalaAdminPage({ adminToken }: MandalaAdminPageProps) {

    const [mandala, setMandala] = useState<Mandala>();
    const [mandalas, setMandalas] = useState<Array<Mandala>>([]);
    const [selectedMandala, setSelectedMandala] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [freeUsers, setFreeUsers] = useState<Array<PublicUser>>([]);
    const [isAddMandala, setIsAddMandala] = useState(false);

    useEffect(() => {
        retrieveMandalas();
    }, []);

    const retrieveMandalas = () => {
        MandalaService.getMandalas()
            .then((response: any) => {
                setMandalas(response.data as Array<Mandala>);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const retrieveMandala = (mandalaId: string) => {
        MandalaService.getMandala(mandalaId)
            .then((response: any) => {
                setMandala(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const handleChooseMandala = (mandalaId: string) => {
        retrieveMandala(mandalaId);
    }

    const handleCheck = (id: string) => {
        setSelectedMandala(id);
    }

    const handleDeleting = () => {
        selectedMandala && setConfirm(prev => !prev);
    }

    const deleteMandala = () => {
        setConfirm(prev => !prev);
        MandalaService.endMandala(selectedMandala, adminToken)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
        setSelectedMandala("");
        setTimeout(() => retrieveMandalas(), 700);
    }

    const handleAddMandala = () => {
        setIsAddMandala(true);
        MandalaService.getFreeUsers(adminToken)
            .then((response: any) => {
                setFreeUsers(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const handleSubmitMandala = (sun: PublicUser) => {
        setIsAddMandala(false);
        MandalaService.addMandala(adminToken, sun)
            .then((response: any) => {
                console.log(response.data);
            });
        setTimeout(() => retrieveMandalas(), 500);
    }

    const handleClose = () => {
        setMandala(undefined);
    }

    return (
        <>
            {!mandala && <>
                <h2>מנדלות</h2>
                <table className="table table-dark">
                    <tbody>
                        {mandalas?.map(m => (
                            <tr key={m.id}  >
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleChooseMandala(m.id as string)}
                                    >
                                        {m.userQuantity === 0 ?
                                            'מנדלה חדשה'
                                            :
                                            m.publicUsers[0].name}
                                    </button>
                                </td>
                                <td width='20'>
                                    <input
                                        type="checkbox"
                                        checked={m.id === selectedMandala}
                                        onChange={() => handleCheck(m.id || '')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedMandala &&
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={handleDeleting}
                    >מחיקה
                    </button>
                }
                {confirm &&
                    <div className="alert alert-danger" role="alert">
                        למחוק את המנדלה?
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={deleteMandala}
                        >כן, למחוק
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleDeleting()}
                        >ביטול
                        </button>
                    </div>}
                <div>
                    {!isAddMandala &&
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleAddMandala()}
                        >
                            הוספת מנדלה
                        </button>
                    }
                    {isAddMandala &&
                        <>
                            <h3>?במי תבחרי למנהלת המנדלה</h3>
                            <table className="table table-dark">
                                <tbody>
                                    {freeUsers.map((user, index) => (
                                        <tr
                                            key={index}>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => handleSubmitMandala(user)}
                                                >
                                                    {user.name}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    }
                </div>
            </>}
            {mandala &&
                <>
                    <DrawMandala
                        mandala={mandala}
                        register={() => { }}
                    />
                    <div>
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={handleClose}
                        >
                            חזרה לרשימת המנדלות
                        </button>
                    </div>
                </>}
        </>
    )
}

export default MandalaAdminPage;