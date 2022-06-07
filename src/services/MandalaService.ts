import http from "../http-common";
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

const getAllUsers = (adminToken: string) => {
    return http.get<any>(`/viewAllUsers?t=${adminToken}`);
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

const addMandala = () => {
    return http.get<any>(`/addMandala`);
}

const addIdMandala = (mandalaId: string) => {
    return http.get<any>(`/addMandala/${mandalaId}`);
}

const endMandala = (mandalaId: string) => {
    return http.delete<any>(`/deleteMandala/${mandalaId}`);
}

const getStartPage = () => {
    return http.get<any>(`/startPage`);
}

const updateStartPage = (adminToken: string, startPageData: StartPageData) => {
    return http.post<User>(`/updateStartPage?t=${adminToken}`, startPageData);
}

const MandalaService = {
    login,
    register,
    logout,
    getUser,
    getAllUsers,
    getPublicUsers,
    getDeletedUsers,
    removeUser,
    takeRole,
    takeSunRole,
    getMandala,
    getMandalas,
    addMandala,
    addIdMandala,
    endMandala,
    getStartPage,
    updateStartPage,
}

export default MandalaService;
