import { useEffect, useState } from "react";
import MandalaService from "../../services/MandalaService";
import { Mandala } from "../../types/Mandala";
import { PublicUser } from "../../types/PublicUser";
import DrawMandala from "./DrawMandala";

interface MandalasProps {
    publicUser: PublicUser;
}

function Mandalas({ publicUser }: MandalasProps) {
    const [mandala, setMandala] = useState<Mandala>();
    const [mandalas, setMandalas] = useState<Array<Mandala>>([]);

    useEffect(() => {
        publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
        mandala || retrieveMandalas();
    }, []);

    // useEffect(() => {
    //     publicUser.mandalaId && retrieveMandala(publicUser.mandalaId);
    // }, [mandalas]);

    // useEffect(() => {
    //     console.log(mandala)
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

    return (
        <>
            {publicUser.id &&
                <>
                    {mandala ?
                        <>
                            <DrawMandala
                                mandala={mandala}
                            />
                        </>
                        :
                        <>
                            <h2>Available Mandalas</h2>
                            <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                                {/* {mandalas?.map(m => ( */}
                                {mandalas?.filter(m => !m.publicUsers || m.publicUsers.length < 15)
                                    .map(m => (
                                        <button
                                            key={m.id}
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleChooseMandala(m.id as string)}
                                        >
                                            {m.publicUsers?.length == 0 ?
                                                m.publicUsers[0].name
                                                :
                                                'empty mandala'}
                                        </button>
                                    ))}
                            </div>
                        </>}
                </>}
        </>
    )
}

export default Mandalas;