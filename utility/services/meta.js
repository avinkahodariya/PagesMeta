import { APIPath } from "../constants";
import { CRUDService } from "./crud";

class Meta extends CRUDService {
   constructor() {
      super(APIPath.meta);
   }
}

const MetaService = new Meta();
Object.freeze(MetaService);
export { MetaService };
