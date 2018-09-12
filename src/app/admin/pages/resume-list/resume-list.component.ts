import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmService} from '../../../pop-ups/confirm/confirm.service';
import {SystemMessageService} from '../../../services';
import {AdminResumeApi} from './admin-resume.api';

@Component({
    selector: 'resume-list.col',
    templateUrl: './resume-list.component.html',
    styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent implements OnInit {

    public listResume: any = null;

    constructor(private _http: HttpClient,
                private _confirmService: ConfirmService,
                private _systemMessageService: SystemMessageService,
                private _dialog: MatDialog,
                public resumeApi: AdminResumeApi) {
    }

    ngOnInit() {
        this._http.post(`/api/v1/resume/get/all`, {offset: 0, count: 24})
            .subscribe((res: any) => {
                this.listResume = res.resumeList;
            });
    }

    public deleteCurrentResume(idResume: string, idOwnerResume: string): void {
        this._confirmService.confirm(`Удалить резюме ${idResume}?`)
            .subscribe(
                (res) => {
                    if (res) {
                        this.resumeApi.deleteResume(idResume, idOwnerResume)
                            .subscribe(
                                res => this._systemMessageService.info('Успешно'),
                                err => this._systemMessageService.info(err.error.errorMessage)
                            );
                    }
                    this._dialog.closeAll();
                }
            );
    }


}
