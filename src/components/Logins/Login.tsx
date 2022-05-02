import { ChangeEvent, SyntheticEvent, useState } from "react";
import MandalaService from "../../services/MandalaService";
// import { LoginProps } from "./LoginProps";
import { User } from "../../types/User";

interface LoginProps {
    getToken: (token: string) => void;
    getLoginMessage: (loginMessage: string) => void;
}

function Login({ getToken, getLoginMessage }: LoginProps) {

    const [input, setInput] = useState<User>(new User);
    const [registering, setRegistering] = useState(false);

    const submitButtonText = registering ?
        'הרשמה'
        :
        'כניסה'
        ;

    const registerButtonText = registering ?
        'לכניסה'
        :
        'להרשמה'
        ;

    const handleRegistering = (e: SyntheticEvent) => {
        e.preventDefault();
        setRegistering(prev => !prev);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setInput(new User);
        registering ? registerUser() : loginUser();
    }

    const loginUser = () => {
        {
            input.email && input.password &&
                MandalaService.login(input.email, input.password)
                    .then((response: any) => {
                        getToken(response.data.token);
                        getLoginMessage(response.data.message);
                    })
        }
    }

    const registerUser = () => {
        {
            input.email && input.password && input.name && input.site &&
            MandalaService.register(input)
                .then((response: any) => {
                    getToken(response.data.token);
                    getLoginMessage(response.data.message);
                })
        }
    }

    return (
        <>
            <h1>
                כניסה
            </h1>
            <form>
                {registering &&
                    <>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                                שם
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="שם"
                                value={input.name}
                                onChange={handleInputChange} />
                        </div><div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                                אתר
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="site"
                                placeholder="אתר"
                                value={input.site}
                                onChange={handleInputChange} />
                        </div>
                    </>
                }
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                        שם משתמש
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="שם משתמש"
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
                        placeholder="סיסמה"
                        value={input.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    {submitButtonText}
                </button>
                <button
                    className="btn btn-link"
                    onClick={handleRegistering}
                >
                    {registerButtonText}
                </button>
            </form>
        </>
    )
}

export default Login;