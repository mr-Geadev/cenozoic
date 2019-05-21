import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DEFAULT_CERTIFICATE_IMAGE } from 'containers/constructor-resume/constructor-resume.constants';

import { LocalizationService, SystemMessageService, UserService } from 'services';

@Component({
	selector: 'verify-account-modal',
	templateUrl: './verify-account.component.html',
	styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {

	public dictionary: any = {};

	public verifyForm = new FormGroup({
		comment: new FormControl('', [Validators.required]),
	});
	public nameImage = '';
	public image = {
		file: null,
		data: null,
	};
	public loadPhotoButton = '';

	constructor(private _dialog: MatDialog,
							private _localizationService: LocalizationService,
							private _systemMessageService: SystemMessageService,
							private userService: UserService,
							@Inject(MAT_DIALOG_DATA) public data: any) {
	}

	ngOnInit(): void {
		this._localizationService.currentDictionary
			.subscribe(
				res => {
					this.dictionary = res;
					this.verifyForm.patchValue({ comment: this.data.typeAccount === 'employer' ? this.dictionary.VERIFY_PIN_DOCUMENT_EMPLOYER : this.dictionary.VERIFY_PIN_DOCUMENT_WORKER });
					this.loadPhotoButton = this.dictionary.LOAD_PHOTO;
				},
			);
	}

	public onImageChange(event): void {
		const fileList: FileList = event.target.files;
		const file: File = fileList[0];

		if (fileList && fileList.length > 0) {
			if (file.size <= 5242880) {
				const reader = new FileReader();
				this.image.file = fileList[0];

				this.nameImage = this.image.file.name;

				if (event.target.files && event.target.files.length > 0) {
					reader.readAsDataURL(this.image.file);
					reader.onload = () => {
						this.image.data = reader.result;
					};
				}
			} else {
				this._systemMessageService.info(this.dictionary.INFO_MESSAGES_SIZE_FILE_MORE_THAN + '5mb');
			}
		}
	}

	sendRequest() {
		let body = new FormData();
		body.append('verificationData', JSON.stringify(this.verifyForm.value));
		body.append('fileToUpload', this.image.file);

		this.userService.sendRequestVerify(body)
			.subscribe(
				res => {
					this.userService.getUserInfo();
					this._dialog.closeAll();
				},
			);

	}
}
