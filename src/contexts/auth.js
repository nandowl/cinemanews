import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection'
import { toast } from 'react-toastify';

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('User')

            if(storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }

        loadStorage()
    }, [])

    //Cadastrando um Usuário
    async function signUp(email, password, nome) {
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid
                await firebase.firestore().collection('users').doc(uid).set({
                    nome,
                    avatarUrl: null,
                })
                .then(() => {
                    let data = {
                        uid,
                        nome,
                        email: value.user.email,
                        avatarUrl: null
                    }

                    setUser(data)
                    storageUser(data)
                    setLoadingAuth(false)
                    toast.success('Seja bem vindo ao CinemaNews!')
                })
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ooopss... Alguma coisa deu errado!')
                setLoadingAuth(false)
            })
    }

    function storageUser(data) {
        localStorage.setItem('User', JSON.stringify(data))
    }

    // Login de Usuário
    async function signIn(email, password) {
        setLoadingAuth(true)

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid

                const userProfile = await firebase.firestore().collection('users').doc(uid).get()

                let data = {
                    uid,
                    nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success('Você voltou!! Que bom :)')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ooopss... Alguma coisa deu errado!')
                setLoadingAuth(false)
            })
    }

    // Logout do usuário
    async function signOut() {
        await firebase.auth().signOut()
        localStorage.removeItem('User')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signUp,
            signOut,
            signIn,
            loadingAuth,
            setUser,
            storageUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider