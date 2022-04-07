import { ChangeEvent, SyntheticEvent, useState } from "react";
import { User } from "./User";

function Login() {

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
                כניסה
            </h1>
            <form>        
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
                    כניסה
                </button>
            </form>
        </>
    )
}

export default Login;