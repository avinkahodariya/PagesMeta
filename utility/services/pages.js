import { APIPath } from "../constants";
import { CRUDService } from "./crud";

class Pages extends CRUDService {
   constructor() {
      super(APIPath.page);
   }
}

const PagesService = new Pages();
Object.freeze(PagesService);
export { PagesService };
