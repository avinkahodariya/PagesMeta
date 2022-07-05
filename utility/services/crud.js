import { BaseService } from './base'

export class CRUDService {
    constructor(url) {
        this.url = url
    }

    get() {
        const url = `${this.url}`
        return BaseService.get(url)
    }

    getById(id) {
        const url = `${this.url}/${id}`
        return BaseService.get(url)
    }

    add(data) {
        return BaseService.post(this.url, data)
    }

    update(id, data) {
        let url = `${this.url}`
        if (id) {
            url += `/${id}`
        }
        return BaseService.put(url, data)
    }

    remove(id) {
        const url = `${this.url}/${id}`
        return BaseService.remove(url)
    }
}
