export default {
    saveCoach(state, payload){
        state.coaches.push(payload)
    },
    setCoaches(state, payload){
        state.coaches = payload;
    },
    setTime(state){
        state.lastFetch = new Date().getTime()
    }
}