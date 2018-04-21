import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ResConfirmService {

    public response: Subject<boolean> = new Subject<boolean>();

    constructor() {
    }

}