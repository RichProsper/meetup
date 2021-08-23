import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { useHistory } from 'react-router'

const AuthContext = createContext({
    currentUser: {},
    signup: (email, pass, passConfirm) => {},
    signin: (emial, pass) => {},
    signout: () => {},
    errMsgSignUp: '',
    setErrMsgSignUp: msg => {},
    errMsgSignIn: '',
    setErrMsgSignIn: msg => {},
    isLoading: false,
    loadingUser: true
})

export default function useAuthCtx() {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [errMsgSignUp, setErrMsgSignUp] = useState('')
    const [errMsgSignIn, setErrMsgSignIn] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loadingUser, setLoadingUser] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoadingUser(false)
        })
        return unsubscribe
    }, [])

    /**
     * @param {String} email
     * @param {String} pass
     * @param {String} passConfirm
     */
    const signup = async (email, pass, passConfirm) => {
        if (pass !== passConfirm) return setErrMsgSignUp('Passwords do not match!')

        try {
            setErrMsgSignUp('')
            setIsLoading(true)
            await auth.createUserWithEmailAndPassword(email, pass)
            history.push('/')
        }
        catch {
            setErrMsgSignUp('Account creation failed!')
        }

        setIsLoading(false)
    }

    const signin = async (email, pass) => {
        try {
            setErrMsgSignIn('')
            setIsLoading(true)
            await auth.signInWithEmailAndPassword(email, pass)
            history.push('/')
        }
        catch {
            setErrMsgSignIn('Sign In failed!')
        }

        setIsLoading(false)
    }

    const signout = async () => {
        try {
            setIsLoading(true)
            await auth.signOut()
            history.push('/signin')
        }
        catch(e) {
            console.log(e)
        }

        setIsLoading(false)
    }

    const context = {
        currentUser,
        signup,
        signin,
        signout,
        errMsgSignUp,
        setErrMsgSignUp,
        errMsgSignIn,
        setErrMsgSignIn,
        isLoading,
        loadingUser
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
