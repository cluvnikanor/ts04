import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { Mandala } from "../../types/Mandala";
import { PublicUser } from "../../types/PublicUser";
import { roles } from "./CirclesData";
import DrawMandala from "./DrawMandala";
import TakeRole from "./TakeRole";

interface MandalaUserPageProps {
    publicUser: PublicUser;
    token: string;
}

function MandalaUserPage({ publicUser, token }: MandalaUserPageProps) {

    const [mandala, setMandala] = useState<Mandala>();
    const [mandalas, setMandalas] = useState<Array<Mandala>>([]);
    const [takingRoll, setTakingRoll] = useState(NaN);

    // useEffect(() => {
    //     console.log(publicUser)
    //     publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
    //     mandala || retrieveMandalas();
    // }, []);

    useEffect(() => {
        console.log(publicUser)
        publicUser.mandalaId ?
            retrieveMandala(publicUser.mandalaId)
            :
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
            && (mandala.userQuantity > 0
                // || (mandalaIndex === 0 && mandala.userQuantity === 0)
            )
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
    }

    const handleClose = () => {
        setMandala(undefined);
    }

    return (<>
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
                {publicUser.mandalaId &&
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleClose}
                    >
                        חזרה לרשימת המנדלות
                    </button>
                }
            </>
            :
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

export default MandalaUserPage;