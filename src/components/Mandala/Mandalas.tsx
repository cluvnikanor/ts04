import { useContext, useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { Mandala } from "../../types/Mandala";
import { PublicUser } from "../../types/PublicUser";
import DrawMandala from "./DrawMandala";
import { roles } from "./CirclesData";
import TakeRole from "./TakeRole";
// import TakeSunRole from "./TakeSunRole";
import { appContext, IAppContext } from "../../AppContext";
import SunPage from "../Admin/SunPage";

interface MandalasProps {
    publicUser: PublicUser;
}

function Mandalas({ publicUser, }: MandalasProps) {
    const [mandala, setMandala] = useState<Mandala>();
    const [mandalas, setMandalas] = useState<Array<Mandala>>([]);
    const [takingRoll, setTakingRoll] = useState(NaN);
    // const [timingOut, setTimingOut] = useState(false);
    const [selectedMandala, setSelectedMandala] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [freeUsers, setFreeUsers] = useState<Array<PublicUser>>([]);
    const [isAddMandala, setIsAddMandala] = useState(false);
    const [showMandala, setShowMandala] = useState(true);

    const { isAdmin, token }: IAppContext = useContext(appContext);

    useEffect(() => {
        console.log('publicUser=', publicUser)
        publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
        mandala || retrieveMandalas();
    }, [publicUser]);

    // useEffect(() => {
    //     publicUser.mandalaIndex === 0
    //         && !mandala?.timeOut
    //         && setTimingOut(true);
    // }, [mandala]);

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
        // setTimingOut(false);
    }

    // const handleDate = (endDate: Date) => {
    //     console.log(endDate)
    //     mandala?.id
    //         && MandalaService.takeSunRole(token, mandala.id, endDate);
    //     // setTimingOut(false);
    //     setTakingRoll(NaN);
    // }

    const handleCheck = (id: string) => {
        setSelectedMandala(id);
    }
    const handleClose = () => {
        setShowMandala(prev => prev);
    }

    const handleDeleting = () => {
        selectedMandala && setConfirm(prev => !prev);
    }

    const deleteMandala = () => {
        setConfirm(prev => !prev);
        MandalaService.endMandala(selectedMandala, token)
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
        MandalaService.getFreeUsers(token)
            .then((response: any) => {
                setFreeUsers(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    const handleSubmitMandala = (sun: PublicUser) => {
        setIsAddMandala(false);
        MandalaService.addMandala(token, sun)
            .then((response: any) => {
                console.log(response.data);
            });
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
                </>
            }

            {/* {timingOut && <TakeSunRole
                handleDate={handleDate}
                handleCancel={handleCancel}
            />} */}
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
                        handleClose={handleClose}
                    />
                    {publicUser.mandalaIndex === 0 &&
                        <SunPage
                            mandalaId={mandala.id as string}
                        />}
                </>
                :
                !isAdmin &&
                <>
                    <h2>מנדלות פנויות</h2>
                    <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
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