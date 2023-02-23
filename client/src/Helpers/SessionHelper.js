class SessionHelper{
    setToken(token) {
        localStorage.setItem("token", token)
    }
    setOTP(otp) {
        localStorage.setItem("otp", otp)
    }
    getToken() {
        return localStorage.getItem("token")
    }
 
    getOTP() {
        return localStorage.getItem("otp")
    }
 

    setUserDetails(UserDetails) {
        localStorage.setItem("UserDetails", JSON.stringify(UserDetails))
    }
    getUserDetails() {
        return JSON.parse(localStorage.getItem("UserDetails"))
    }
    setEmail(email) {
        localStorage.setItem("Email", email)
    }
    getEmail() {
        return localStorage.getItem("Email")
    }
    isLoading() {
        return false;
    }
   

    removeSessions = () => {
        localStorage.clear();
        window.location.href="/login"
    }

    removeOTP = () => {
        localStorage.clear();
    }

    
}

export const {setEmail, getEmail, setToken, getToken, setUserDetails, getUserDetails,removeSessions, isLoading, getOTP, setOTP,removeOTP} = new SessionHelper()