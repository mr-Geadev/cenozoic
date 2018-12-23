import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { QuestionnairesApi } from 'api';
import { QuestionnaireModel } from 'models';
import { LocalizationService, SystemMessageService } from 'services';

@Component({
  selector: 'answer-top-questionnaire-file',
  templateUrl: './answer-top-questionnaire-file.component.html',
  styleUrls: ['./answer-top-questionnaire-file.component.scss'],
})

export class AnswerTopQuestionnaireFileComponent implements OnInit {

  public dictionary: any = {};
  public questionnaire: QuestionnaireModel;

  public nameOfFile: string;
  public fileToUpload = {
    file: null,
    data: null
  }

  constructor(private _systemMessageService: SystemMessageService,
              private _localizationService: LocalizationService,
              private _questionnaireApi: QuestionnairesApi,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    this.questionnaire = new QuestionnaireModel(this.data.questionnaire);
  }

  public addFile(event): void {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];

    if (fileList && fileList.length > 0) {
      if (file.size <= 300000) {
        const reader = new FileReader();

        this.fileToUpload.file = fileList[0];
        this.nameOfFile = this.fileToUpload.file.name;
        if (event.target.files && event.target.files.length > 0) {
          reader.readAsDataURL(this.fileToUpload.file);
          reader.onload = () => {
            this.fileToUpload.data = reader.result;
          };
        }
      } else {
        this._systemMessageService.info(this.dictionary.INFO_MESSAGES_SIZE_FILE_MORE_THAN + '5mb');
      }
    }
  }

  public sendAnswer() {
    const formData: FormData = new FormData();

    formData.append('fileToUpload', this.fileToUpload.file);

    this._questionnaireApi.answerToFile(formData)
      .subscribe(
        res => {},
        err => console.log(err),
      );
  }

}
