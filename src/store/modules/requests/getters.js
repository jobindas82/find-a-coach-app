export default {
    requests(state, _1, _2, rootGetters) {
        const coachId = rootGetters.getUserId;
        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(state, getters) {
        return getters.requests && state.requests.length > 0;
    }
}