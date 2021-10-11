import {RutinasApi} from "../../../api/rutinas";

export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {
        findIndex(state) {
            return (rutina) => {
                return state.items.findIndex(item => item.id === rutina.id)
            }
        },
    },
    mutations: {
        push(state, rutina) {
            state.items.push(rutina)
        },
        replace(state, index, rutina) {
            state.items[index] = rutina
        },
        splice(state, index) {
            state.items.splice(index, 1)
        },
        replaceAll(state, rutinas) {
            state.items = rutinas
        }
    },
    actions: {
        async create({getters, commit}, rutina) {
            const result = await RutinasApi.add(rutina)
            if (!getters.findIndex(result))
                commit('push', result)
            return result
        },
        async modify({getters, commit}, rutina) {
            const result = await RutinasApi.modify(rutina)
            const index = getters.findIndex(result)
            if (index >= 0)
                commit('replace', index, result)
            return result
        },
        async delete({getters, commit}, rutina) {
            await RutinasApi.delete(rutina.id)
            const index = getters.findIndex(rutina)
            if (index >= 0)
                commit('splice', index)
        },
        async get({state, getters, commit}, rutina) {
            const index = getters.findIndex(rutina)
            if (index >= 0)
                return state.items[index]

            const result = await RutinasApi.get()
            commit('push', result)
            return result
        },
        async getAll({commit}, controller) {
            const result = await RutinasApi.getAll(controller)
            commit('replaceAll', result)
            return result
        }
    },
}