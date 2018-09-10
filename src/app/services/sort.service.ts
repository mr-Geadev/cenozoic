import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {SortModel} from 'app/models';

@Injectable()


export class SortService {

    public typeSort: Subject<SortModel> = new Subject();

    constructor() {

    }

    public newSortParameters(newParameters: SortModel): void {
        this.typeSort.next(newParameters);
    }

}