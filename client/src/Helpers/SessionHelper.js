class SessionHelper{
    setToken(token) {
        localStorage.setItem("token", token)
    }
    getToken() {
        return localStorage.getItem("token")
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

    
}

export const {setEmail, getEmail, setToken, getToken, setUserDetails, getUserDetails,removeSessions, isLoading} = new SessionHelper()