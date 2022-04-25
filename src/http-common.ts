import axios from "axios";

const productionBaseUrl = "https://heroku-demo0123.herokuapp.com/api";
const developmentBaseUrl = "http://localhost:8080/api";
// const productionBaseUrl = "/api";
const isDevelopment = false;
// const isDevelopment = true;

export default axios.create({
    baseURL: isDevelopment ? developmentBaseUrl : productionBaseUrl,
    headers: {
        "Content-type": "application/json"
    }
})