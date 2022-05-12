import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { Mandala } from "../../types/Mandala";
import { PublicUser } from "../../types/PublicUser";
import DrawMandala from "./DrawMandala";
import { roles } from "./Roles";
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
    const [timeOut, setTimeOut] = useState(false);

    useEffect(() => {
        publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
        mandala || retrieveMandalas();
    }, [publicUser]);

    // useEffect(() => {
    //     console.log('takingRoll=', takingRoll)
    // }, [takingRoll]);

    // useEffect(() => {
    //     console.log(mandala)
    // }, [mandala]);

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
        console.log('publicUser.mandalaIndex=', publicUser.mandalaIndex, 'mandala.userQuantity=', mandala?.userQuantity,)
        if (mandala?.id
            && publicUser.id
            && (publicUser.mandalaIndex > 14 || publicUser.mandalaIndex < 0)
            && (mandala.userQuantity > 0 ||
                (mandalaIndex === 0 && mandala.userQuantity === 0))
            && mandala.userQuantity < 15) {
            setTakingRoll(mandalaIndex);
        }
    }

    const handleRegister = () => {
        takingRoll === 0 ?
            setTimeOut(true)
            :
            mandala?.id
            && MandalaService.takeRoll(token, takingRoll, mandala.id,)
            && setTakingRoll(NaN);
    }

    const handleCancel = () => {
        setTakingRoll(NaN);
        setTimeOut(false);
    }

    // const handleDate = (endDate: string) => {
    //     console.log(endDate)
    //     mandala?.id
    //         && MandalaService.takeSunRoll(token, takingRoll, mandala.id, endDate);
    //     setTimeOut(false);
    // }

    const handleDate = (endDate: Date) => {
        console.log(endDate)
        mandala?.id
            && MandalaService.takeSunRoll(token, takingRoll, mandala.id, endDate);
        setTimeOut(false);
        setTakingRoll(NaN);
    }

    return (
        <>
            {isAdmin &&
                <>
                    <h2>מנדלות</h2>
                    <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                        {mandalas?.map(m => (
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
                </>
            }
            {timeOut && <TakeSunRole
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