import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { Mandala } from "../../types/Mandala";
import { PublicUser } from "../../types/PublicUser";
import DrawMandala from "./DrawMandala";
import TakeRole from "./TakeRole";

interface MandalasProps {
    publicUser: PublicUser;
    // handlePublicUser: (publicUser: PublicUser) => void;
    token: string;
}

function Mandalas({ publicUser, token, }: MandalasProps) {
    const [mandala, setMandala] = useState<Mandala>();
    const [mandalas, setMandalas] = useState<Array<Mandala>>([]);
    const [takingRoll, setTakingRoll] = useState(NaN);

    // useEffect(() => {
    //     publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
    //     mandala || retrieveMandalas();
    // }, []);

    // useEffect(() => {
    //     publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
    // }, [mandalas]);

    useEffect(() => {
        // console.log(publicUser)
        publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
        mandala || retrieveMandalas();
    }, [publicUser]);

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

    const handleActivate = (mandalaIndex: number) => {
        // console.log(publicUser)
        // console.log('publicUser.mandalaIndex=', publicUser.mandalaIndex, 'mandala.userQuantity=', mandala?.userQuantity, 'mandalaIndex=', mandalaIndex)
        if (mandala?.id
            && (publicUser.mandalaIndex > 14 || publicUser.mandalaIndex < 0)
            && (mandala.userQuantity > 0 || mandalaIndex === 0)
            && mandala.userQuantity < 15) {
            MandalaService.takeRoll(token, mandalaIndex, mandala.id);
            // publicUser.mandalaIndex = mandalaIndex;
            // publicUser.mandalaId = mandala.id;
            retrieveMandala(mandala.id);
            // handlePublicUser(new PublicUser(publicUser.id, publicUser.name, publicUser.site, mandala.id, mandalaIndex));
        }
    }

    const register = (className: string) => {
        const mandalaIndex = parseInt(className);
        console.log(className, mandalaIndex)
        console.log('publicUser.mandalaIndex=', publicUser.mandalaIndex, 'mandala.userQuantity=', mandala?.userQuantity,)
        if (mandala?.id
            && (publicUser.mandalaIndex > 14 || publicUser.mandalaIndex < 0)
            && (mandala.userQuantity > 0 || mandalaIndex === 0)
            && mandala.userQuantity < 15) {
            setTakingRoll(mandalaIndex);
        }
        console.log(takingRoll)
    }

    const handleRegister = () => {
        mandala?.id &&
            MandalaService.takeRoll(token, takingRoll, mandala.id);
        setTakingRoll(NaN);
    }

    const handleCancel = () => {
        setTakingRoll(NaN);
    }

    return (
        <>
            <>
                {takingRoll &&
                    <TakeRole
                        title=""
                        handleRegister={handleRegister}
                        handleCancel={handleCancel}
                    />}
                {mandala ?
                    <>
                        <DrawMandala
                            mandala={mandala}
                            publicUser={publicUser}
                            register={register}
                        />
                    </>
                    :
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
        </>
    )
}

export default Mandalas;