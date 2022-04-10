import http from "../http-common";
import { User } from "../components/Logins/User";

// const create = (data: ITutorialData) => {
//     return http.post<ITutorialData>("/tutorials", data);

const login = (email: string, password: string) => {
    return http.get<any>(`/login?email=${email}&password=${password}`);
}

const register = (user: User) => {
    return http.post<User>(`/register`, user);
}

const MandalaService = {
    login,
    register,
}

export default MandalaService;
