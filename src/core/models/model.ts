export class Model {
    constructor(data: any) {

        for (const propName in data) {
            if (data.hasOwnProperty(propName)) {
                this[propName] = data[propName];
            }
        }
    }
    /**
     * Maps all items to real objects.
     */
    mapToObjects(key: string, className: any): void {
        if (!this[key]) {
            return;
        }

        this[key] = this[key].filter(item => item).map(item => new className(item));
    }
}
