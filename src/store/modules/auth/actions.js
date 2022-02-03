export default {
    async login(context, payload) {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const data = await res.json();

        if (!res.ok) {
            const error = new Error(data.messgae || 'Failed');
            throw error;
        }

        const expiration = new Date().getTime() + (+data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expiration', expiration)

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            tokenExpiration: null,
        })
    },
    async signup(context, payload) {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const data = await res.json();

        if (!res.ok) {
            const error = new Error(data.messgae || 'Failed');
            throw error;
        }

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)

        context.commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            tokenExpiration: data.expiresIn,
        })
    },
    logout(context) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')

        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null,
        })
    },
    autoLogin(context) {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExpiration: null,
            })
        }
    }
}