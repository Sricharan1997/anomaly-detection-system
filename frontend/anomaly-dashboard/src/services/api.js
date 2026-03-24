import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getTransactions = () => axios.get(`${BASE_URL}/transactions`);
export const getAnomalies = () => axios.get(`${BASE_URL}/anomalies`);
export const getFlaggedAnomalies = () => axios.get(`${BASE_URL}/anomalies/flagged`);