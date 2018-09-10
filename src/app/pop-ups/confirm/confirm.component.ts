import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ResConfirmService} from './res-confirm.service';

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.less']
})

export class ConfirmComponent {

    constructor(private resConfirmService: ResConfirmService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    public accept(): void {
        this.resConfirmService.response.next(true);
    }

    public renouncement(): void {
        this.resConfirmService.response.next(false);
    }
}
