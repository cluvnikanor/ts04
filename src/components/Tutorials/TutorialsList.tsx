import { useEffect, useState } from "react";
import Service from "../../services/Service";
import ITutorialData from "../../types/Tutorial";


function TutorialsList() {
    const [tutorials, setTutorials] = useState<Array<ITutorialData>>([]);
    const [confirm, setConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const [selectedTutorial, setSelectedTutorial] = useState(NaN);
    useEffect(() => {
        retrieveTutorials();
    }, []);

    const handleCheck = (id: number) => {
        setSelectedTutorial(id);
    }
    const retrieveTutorials = () => {
        Service.getAll()
            .then((response: any) => {
                setTutorials(response.data);
            })
            .catch((e: Error) =>
                console.log(e));
    }
    const handleDeleting = (deleteAction: string) => {
        setConfirm(prev => !prev);
        setDeleteType(deleteAction);
    }

    const deleting = () => {
        setConfirm(prev => !prev);
        switch (deleteType) {
            case 'deleteAll': deleteAll();
                break;
                case 'deleteOne': deleteOne();
                break;
        }
    }

    const deleteAll = () => {
        Service.removeAll();
    }

    const deleteOne = () => {
        Service.remove(tutorials[selectedTutorial].id);
    }

    const edit = () => {

    }


    return (
        <>
            <h2>Tutorials List</h2>
            {tutorials &&
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">title</th>
                            <th scope="col">description</th>
                            <th scope="col">published</th>
                        </tr>
                    </thead>
                    <tbody>

                        {tutorials.map((tutorial, index) => (
                            <tr
                                key={index}>
                                <td><input
                                    type="checkbox"
                                    checked={index === selectedTutorial}
                                    onChange={()=>handleCheck(index)}
                                /></td >
                                <td>{tutorial.title}</td>
                                <td>{tutorial.description}</td>
                                <td>{tutorial.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <button
                type="button"
                className="btn btn-primary"
                onClick={edit}
            >Edit
            </button>
            <button
                type="button"
                className="btn btn-warning"
                onClick={() => handleDeleting('deleteOne')}
            >Delete
            </button>

            <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleting('deleteAll')}
            >Delete All
            </button>
            {confirm &&
                <div className="alert alert-danger" role="alert">
                    Are you sure?
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={deleting}
                    >Delete
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleDeleting('cancel')}
                    >Cancel
                    </button>
                </div>}
        </>
    )
}

export default TutorialsList;