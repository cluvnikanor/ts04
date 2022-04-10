export interface LoginProps {
    getToken: (token: string) => void;
    getLoginMessage: (loginMessage: string) => void;
}