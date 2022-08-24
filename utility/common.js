export class CommonUtility  {
    static isNull=(obj) => {
        return obj === undefined || obj === null
    }

    static objectToParams = (obj) => {
		let str = "";
		for (const key in obj) {
			if (obj[key] !== undefined && obj[key] !== null) {
				if (str != "") {
					str += "&";
				}
				str += key + "=" + encodeURIComponent(obj[key]);
			}
		}
		return str;
	};
}