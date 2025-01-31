const backend="http://localhost:5000/api/v1"
// const render="https://portfolio-3-19da.onrender.com/api/v1"
const backendURL=backend
const summaryApi={
    add: {
        url: `${backendURL}/add`,
        method: "post",
    },
    get: {
        url: `${backendURL}/get`,
        method: "get",
    },
    
    like: {
        url: `${backendURL}/like`,
        method: "post",
    },
    contact: {
        url: `${backendURL}/contact`,
        method: "post",
    },
}

export default summaryApi;