export default {
    async registerCoach(context, payload) {
        const userId = context.rootGetters.getUserId;
        const token = context.rootGetters.token;

        const response = await fetch(`https://vue-http-demo-195af-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const error = new Error('Failed');
            throw error;
        }

        payload.id = userId;
        context.commit('saveCoach', payload)
    },
    async loadCoaches(context, payload) {
        if(!context.getters.shouldUpdate && !payload.force ){
            return;
        }
        const response = await fetch(`https://vue-http-demo-195af-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.messgae || 'Failed');
            throw error;
        }
        const coaches = [];
        for (const key in responseData) {
            const coach = {
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
                id: key
            }
            coaches.push(coach);
        }
        context.commit('setCoaches', coaches)
        context.commit('setTime')
    }
}