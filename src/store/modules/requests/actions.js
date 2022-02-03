export default {
    async contactCoach(context, payload) {
        const newReq = {
            ...payload
        }
        delete newReq.coachId;
        const res = await fetch(`https://vue-http-demo-195af-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newReq)
        });
        const data = await res.json()

        if (!res.ok) {
            const error = new Error(data.messgae || 'Failed');
            throw error;
        }

        payload.id = data.name;
        context.commit('addRequest', payload)
    },
    async fetchRequests(context){
        const coachId = context.rootGetters.getUserId;
        const token = context.rootGetters.token;
        const res = await fetch(`https://vue-http-demo-195af-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`)
        const data = await res.json()

        if (!res.ok) {
            const error = new Error(data.messgae || 'Failed');
            throw error;
        }
        const requests = []
        for (const key in data) {
            const req = {
                id: key,
                coachId: coachId,
                email: data[key].email,
                message: data[key].message
            }
            requests.push(req)
        }
        context.commit('setRequests', requests)
    }
}