import { ChangeEvent, SyntheticEvent, useState } from "react";
import { User } from "./User";

function Register() {

    const [input, setInput] = useState<User>(new User);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(input);
        setInput(new User);
    }
    return (
        <>
            <h1>
                הרשמה
            </h1>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                        שם
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        // aria-describedby="emailHelp" 
                        placeholder="Enter name"
                        value={input.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                        אתר
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="site"
                        // aria-describedby="emailHelp" 
                        placeholder="Enter site"
                        value={input.site}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                        דוא"ל
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={input.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                        סיסמה
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={input.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    הרשמה
                </button>
            </form>
        </>
    )
}

export default Register;