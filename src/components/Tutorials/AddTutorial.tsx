import { ChangeEvent, SyntheticEvent, useState } from "react";
import Service from "../../services/Service";
import ITutorialData from "../../types/Tutorial";

function AddTutorial() {

    // const initialTutorialState = {
    //     id: null,
    //     title: '',
    //     description: '',
    //     published: false,
    // }

    const [input, setInput] = useState({ title: '', description: '' });

    // const [tutorial, setTutorial] = useState<ITutorialData>(initialTutorialState);

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setTutorial({ ...tutorial, [name]: value, });
    // };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    };

    const saveTutorial = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(input);
        const tutorial: ITutorialData = {
            id: null,
            title: input.title,
            description: input.description,
            published: false,
        }
        Service.create(tutorial);
        setInput({ title: '', description: '' });
    }

    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input
                        value={input.title}
                        onChange={handleInputChange}
                        className="form-control"
                        id="title"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input
                        value={input.description}
                        onChange={handleInputChange}
                        className="form-control"
                        id="description" />
                </div>
                <button
                    onClick={saveTutorial}
                    type="submit"
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )
}

export default AddTutorial;