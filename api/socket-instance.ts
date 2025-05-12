import { io } from "socket.io-client";
import { getToken } from "../utils/secure-store";

const BACKEND_URL = import.meta.env.API_BASE_URL;

const socket = io(BACKEND_URL, {
  autoConnect: false,
  transports: ["websocket"],
  auth: async (cb) => {
    const token = getToken();
    cb({ token });
  },
});

export { socket };
