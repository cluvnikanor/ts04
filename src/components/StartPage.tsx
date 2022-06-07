import { useEffect, useState } from "react";
import MandalaService from "../services/MandalaService";
import { StartPageData } from '../types/StartPageData';



function StartPage() {
    const [startPageData, setStartPageData] = useState(new StartPageData());

    useEffect(() => {
        retrieveStartPage();
      }, []);

    const retrieveStartPage = () => {
        MandalaService.getStartPage()
            .then((response: any) => {
                setStartPageData(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }

    return (
        <>
            <h1>
                {startPageData.h1}
            </h1>
        </>
    )
}

export default StartPage;