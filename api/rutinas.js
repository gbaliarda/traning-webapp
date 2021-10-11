import { Api } from './api.js'

export { RutinasApi, Rutina }

class RutinasApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ''}`
  }

  static async add(rutina, controller) {
   return await Api.post(RutinasApi.getUrl(), true, rutina, controller)
  }

  static async modify(rutina, controller) {
    return await Api.put(RutinasApi.getUrl(rutina.id), true, rutina, controller)
  }

  static async delete(id, controller) {
    return await Api.delete(RutinasApi.getUrl(id), true, controller)
  }

  static async get(id, controller) {
    return await Api.get(RutinasApi.getUrl(id),true,  controller)
  }

  static async getAll(controller) {
    return await Api.get(RutinasApi.getUrl(), true, controller)
  }
}

class Rutina {
  constructor(id, name, detail, isPublic, difficulty) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.detail = detail;
    this.isPublic = isPublic;
    this.difficulty = difficulty;
  }
}
