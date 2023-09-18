import axios from "axios";
import {io} from "socket.io-client";

//import config from "./config";

//const URL = `${config.URL_API_BASE}`;
//const URI_API ='https://api-quick-safe-production.up.railway.app'
//const URI_API ='http://192.168.1.65:3000'
const API_URL = "https://api-quicksafe080923-production.up.railway.app"
//const API_URL = process.env.EXPO_PUBLIC_API_URL;
//const API_URL = "http://192.168.1.65:3000";
//const API_URL = "http://192.168.228.1:3000";
//const API_URL = "http://10.0.0.93:3000";
//const API_URL = "http://172.20.10.11:3000";


export const apiUrl = axios.create({
    baseURL: `${API_URL}/api/`,
    headers: { 'Accept': 'application/json' }
});

const URI_SOCKET = `${API_URL}`;
export const SOCKET = io(URI_SOCKET, {
    transports: ['websocket']
   // reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
})

