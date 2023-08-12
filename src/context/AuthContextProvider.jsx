import { useNavigate } from "react-router-dom";
import { useContext, createContext, useEffect, useState } from "react";
import { Auth } from "../config/firebase/firebaseConfig";
import { signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import swal from 'sweetalert'


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(Auth, new GoogleAuthProvider());
            swal('success', 'Login success', 'success')
            navigate('/')

        } catch (err) {
            switch (err.code) {
                case "auth/invalid-email":
                    return swal('Error', "Invalid Email", "error")
                case "auth/user-not-found":
                    return swal('Error', "User Not Found", "error")
                case "auth/wrong-password":
                    return swal('Error', "Wrong Password", "error")
                case "auth/network-request-failed":
                    return swal('Error', "Network Error", "error")
                case "auth/too-many-requests":
                    return swal('Error', "Too Many Requests", "error")
                case "auth/user-disabled":
                    return swal('Error', "User Disabled", "error")
                case "auth/operation-not-allowed":
                    return swal('Error', "Operation Not Allowed", "error")
            }
        }
    }

    const [value, setValue] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })


    const handleSignIn = async (event) => {
        event.preventDefault()
        try {
            await signInWithEmailAndPassword(Auth, value.email, value.password)
            swal('success', 'Login Berhasil', 'success')
            navigate('/')
        } catch (err) {
            switch (err.code) {
                case "auth/invalid-email":
                    return swal('Error', "Invalid Email", "error")
                case "auth/user-not-found":
                    return swal('Error', "User Not Found", "error")
                case "auth/wrong-password":
                    return swal('Error', "Wrong Password", "error")
                case "auth/network-request-failed":
                    return swal('Error', "Network Error", "error")
                case "auth/too-many-requests":
                    return swal('Error', "Too Many Requests", "error")
                case "auth/user-disabled":
                    return swal('Error', "User Disabled", "error")
                case "auth/operation-not-allowed":
                    return swal('Error', "Operation Not Allowed", "error")
            }
        }
    }

    const handleSignUp = async (event) => {
        event.preventDefault()
        try {
            await createUserWithEmailAndPassword(Auth, value.email, value.password)
            if (value.password !== value.confirmPassword) {
                return swal('Error', 'Password not match', 'error')
            }
            swal('success', 'Register Berhasil', 'success')
            navigate('/')
        } catch (err) {
            switch (err.code) {
                case "auth/invalid-email":
                    return swal('Error', "Invalid Email", "error")
                case "auth/user-not-found":
                    return swal('Error', "User Not Found", "error")
                case "auth/wrong-password":
                    return swal('Error', "Wrong Password", "error")
                case "auth/network-request-failed":
                    return swal('Error', "Network Error", "error")
                case "auth/too-many-requests":
                    return swal('Error', "Too Many Requests", "error")
                case "auth/user-disabled":
                    return swal('Error', "User Disabled", "error")
                case "auth/operation-not-allowed":
                    return swal('Error', "Operation Not Allowed", "error")
            }
        }
    }

    const handleLogOut = async (e) => {
        e.preventDefault()
        try {
            //log out
            const auth = getAuth()
            signOut(auth).then(ress => {
                localStorage.clear()
                swal('Success', "Logout Berhasil", "success")
                navigate('/sign-in')
            }).catch(err => {
                console.log(err)
            })

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <AuthContext.Provider value={{ handleGoogleLogin, handleLogOut, setValue, value, handleSignUp, handleSignIn }}>{children}</AuthContext.Provider>
    );
}