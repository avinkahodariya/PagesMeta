import { APIPath } from '../constants'
import { CRUDService } from './crud'

class Applications extends CRUDService {
    constructor() {
        super(APIPath.applications)
    }
}

const ApplicationsService = new Applications()
Object.freeze(ApplicationsService)
export { ApplicationsService }
