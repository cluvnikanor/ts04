import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { Mandala } from "../../types/Mandala";
import { PublicUser } from "../../types/PublicUser";
import DrawMandala from "./DrawMandala";
import { roles } from "./CirclesData";
import TakeRole from "./TakeRole";
import TakeSunRole from "./TakeSunRole";

interface MandalasProps {
    publicUser: PublicUser;
    token: string;
    isAdmin: boolean;
}

function Mandalas({ publicUser, token, isAdmin, }: MandalasProps) {
    const [mandala, setMandala] = useState<Mandala>();
    const [mandalas, setMandalas] = useState<Array<Mandala>>([]);
    const [takingRoll, setTakingRoll] = useState(NaN);
    const [timingOut, setTimingOut] = useState(false);
    const [selectedMandala, setSelectedMandala] = useState("");
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        console.log('publicUser=', publicUser)
        publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
        mandala || retrieveMandalas();
    }, [publicUser]);

    // useEffect(() => {
    //     console.log('takingRoll=', takingRoll)
    // }, [takingRoll]);

    useEffect(() => {
        console.log(mandala)
        publicUser.mandalaIndex === 0
            && !mandala?.timeOut
            && setTimingOut(true);
    }, [mandala]);

    // useEffect(() => {
    //     console.log(mandalas)
    // }, [mandalas]);

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

    const register = (className: string) => {
        const mandalaIndex = parseInt(className);
        console.log('mandalaIndex=', mandalaIndex)
        console.log('mandala?.id=', mandala?.id)
        console.log('publicUser.mandalaIndex=', publicUser.mandalaIndex)
        console.log('mandala.userQuantity=', mandala?.userQuantity)
        if (mandala?.id
            && publicUser.id
            && (publicUser.mandalaIndex > 14 || publicUser.mandalaIndex < 0)
            && !mandala.publicUsers[mandalaIndex].id
            && (mandala.userQuantity > 0 ||
                (mandalaIndex === 0 && mandala.userQuantity === 0))
            && mandala.userQuantity < 15) {
            setTakingRoll(mandalaIndex);
            setTimeout(() => retrieveMandala(mandala.id || ''), 500);
        }
    }

    const handleRegister = () => {
        mandala?.id
            && MandalaService.takeRole(token, takingRoll, mandala.id,)
            && setTakingRoll(NaN);
    }

    const handleCancel = () => {
        setTakingRoll(NaN);
        setTimingOut(false);
    }

    const handleDate = (endDate: Date) => {
        console.log(endDate)
        mandala?.id
            && MandalaService.takeSunRole(token, mandala.id, endDate);
        setTimingOut(false);
        setTakingRoll(NaN);
    }

    const handleCheck = (id: string) => {
        setSelectedMandala(id);
    }

    const handleDeleting = () => {
        selectedMandala && setConfirm(prev => !prev);
    }

    const deleteMandala = () => {
        setConfirm(prev => !prev);
        MandalaService.endMandala(selectedMandala);
        // setTimeout(() => {  window.location.reload(); }, 500);
        setTimeout(() => retrieveMandalas(), 500);
    }

    const handleAddMandala = () => {
        MandalaService.addMandala();
        // setTimeout(() => {  window.location.reload(); }, 500);
        setTimeout(() => retrieveMandalas(), 500);
    }

    return (
        <>
            {isAdmin &&
                <>
                    <h2>מנדלות</h2>
                    <table className="table table-dark">
                        <tbody>
                            {mandalas?.map(m => (
                                <tr key={m.id}  >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={m.id === selectedMandala}
                                            onChange={() => handleCheck(m.id || '')}
                                        />
                                    </td>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedMandala &&
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={handleDeleting}
                        >Delete
                        </button>
                    }
                    {confirm &&
                        <div className="alert alert-danger" role="alert">
                            Are you sure?
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteMandala}
                            >Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleDeleting()}
                            >Cancel
                            </button>
                        </div>}
                    <div>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleAddMandala()}
                        >
                            הוספת מנדלה
                        </button>
                    </div>
                </>
            }

            {timingOut && <TakeSunRole
                handleDate={handleDate}
                handleCancel={handleCancel}
            />}
            {(takingRoll || takingRoll === 0) &&
                <TakeRole
                    title={roles[takingRoll]}
                    handleRegister={handleRegister}
                    handleCancel={handleCancel}
                />}
            {mandala ?
                <>
                    <DrawMandala
                        mandala={mandala}
                        register={register}
                    />
                </>
                :
                !isAdmin &&
                <>
                    <h2>מנדלות פנויות</h2>
                    <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                        {/* {mandalas?.map(m => ( */}
                        {mandalas?.filter(m => m.userQuantity < 15)
                            .map(m => (
                                <button
                                    key={m.id}
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleChooseMandala(m.id as string)}
                                >
                                    {m.userQuantity === 0 ?
                                        'מנדלה חדשה'
                                        :
                                        m.publicUsers[0].name}
                                </button>
                            ))}
                    </div>
                </>}
        </>
    )
}

export default Mandalas;