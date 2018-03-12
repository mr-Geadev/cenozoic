export class SortModel {

    public type: string = 'date' // date || experience || salary
    public order: number = 1; // 1 по возрастанию, -1 по убыванию

    constructor(input: any) {
        input.type ? this.type = input.type : null;
        input.order ? this.order = input.order : null;
    }
}