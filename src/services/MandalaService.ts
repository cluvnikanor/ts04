import http from "../http-common";
import { PublicUser } from "../types/PublicUser";
import { StartPageData } from "../types/StartPageData";
import { User } from "../types/User";

const login = (email: string, password: string) => {
    return http.get<any>(`/login?email=${email}&password=${password}`);
}

const register = (user: User) => {
    return http.post<User>(`/register`, user);
}

const logout = (token: string) => {
    return http.get<any>(`/logout?t=${token}`);
}

const getUser = (token: string) => {
    return http.get<any>(`/user?t=${token}`);
}

const getPublicUsers = () => {
    return http.get<any>(`/viewPublicUsers`);
}

const getMandalaUsers = (mandalaId: string, token: string) => {
    return http.get<any>(`/viewMandalaUsers?id=${mandalaId}&t=${token}`);
}

const getAllUsers = (adminToken: string) => {
    return http.get<any>(`/viewAllUsers?t=${adminToken}`);
}

const getFreeUsers = (adminToken: string) => {
    return http.get<any>(`/viewFreeUsers?t=${adminToken}`);
}

const getDeletedUsers = (adminToken: string) => {
    return http.get<any>(`/viewDeletedUsers?t=${adminToken}`);
}

const removeUser = (id: any, adminToken: string) => {
    return http.delete<any>(`/deleteUser?id=${id}&t=${adminToken}`);
};

const takeRole = (token: string, index: number, mandalaId: string,) => {
    return http.post<any>(`/takeRole?t=${token}&i=${index}&m=${mandalaId}`);
}

const takeSunRole = (token: string, mandalaId: string, endDate?: Date,) => {
    return http.post<Date>(`/takeSunRole?t=${token}&m=${mandalaId}`, endDate);
}

const getMandala = (mandalaId: string) => {
    return http.get<any>(`/mandala/${mandalaId}`);
}

const getMandalas = () => {
    return http.get<any>(`/mandalas`);
}

const addMandala = (adminToken: string, sun: PublicUser) => {
    return http.post<PublicUser>(`/addMandala?t=${adminToken}`, sun);
}

const endMandala = (mandalaId: string, token: string) => {
    return http.delete<any>(`/deleteMandala?id=${mandalaId}&t=${token}`);
}

const getStartPage = () => {
    return http.get<any>(`/startPage`);
}

const updateStartPage = (adminToken: string, startPageData: StartPageData) => {
    return http.post<StartPageData>(`/updateStartPage?t=${adminToken}`, startPageData);
}

const MandalaService = {
    login,
    register,
    logout,
    getUser,
    getAllUsers,
    getFreeUsers,
    getPublicUsers,
    getMandalaUsers,
    getDeletedUsers,
    removeUser,
    takeRole,
    takeSunRole,
    getMandala,
    getMandalas,
    addMandala,
    endMandala,
    getStartPage,
    updateStartPage,
}

export default MandalaService;
