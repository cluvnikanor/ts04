import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import { appContext, IAppContext } from "../../AppContext";
import MandalaService from "../../services/MandalaService";
import { StartPageData } from "../../types/StartPageData";
import StartPage from "../StartPage";

function AdminPage() {

    const [startPageData, setStartPageData] = useState(new StartPageData());
    const [isUpdateStartPage, setIsUpdateStartPage] = useState(false);

    const { token }: IAppContext = useContext(appContext);

    const handleStartPageH1Update = () => {
        setIsUpdateStartPage(prev => !prev);
    }

    const handleStartPageH1Change = (e: ChangeEvent<HTMLInputElement>) => {
        setStartPageData({ ...startPageData, h1: e.target.value });
    }

    const handleStartPageSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        MandalaService.updateStartPage(token, startPageData);
        handleStartPageH1Update();
        setTimeout(()=>handleStartPageH1Update(),);
    }

    return (
        <>
            <h1>שלום מנהלת</h1>
            {isUpdateStartPage ?
                <>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                                עדכון דף כניסה
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="startPageH1"
                                placeholder="כותרת"
                                value={startPageData.h1}
                                onChange={handleStartPageH1Change} />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-link"
                            onClick={handleStartPageSubmit}
                        >
                            עדכון
                        </button>
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={handleStartPageH1Update}
                        >
                            סגירה
                        </button>
                    </form>
                    <StartPage />
                </>
                :
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={handleStartPageH1Update}
                >עדכון דף כניסה
                </button>
            }
        </>
    )
}

export default AdminPage;