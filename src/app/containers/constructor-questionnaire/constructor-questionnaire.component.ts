import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionnairesApi } from 'api';
import { SystemMessageService } from 'services';

@Component({
  selector: 'constructor-questionnaire',
  templateUrl: './constructor-questionnaire.component.html',
  styleUrls: ['./constructor-questionnaire.component.scss'],
})
export class ConstructorQuestionnaireComponent implements OnInit {

  public questionnaire: FormGroup = null;
  public isFromFile: boolean = false;
  public fileToUpload: any = {
    file: null,
    data: null,
  };
  public nameOfFile: string = null;

  constructor(private _systemMessageService: SystemMessageService,
              private router: Router,
              private questionnaireApi: QuestionnairesApi) {
  }

  ngOnInit() {
    this.createQuestionnaire();
  }

  public createQuestionnaire() {
    this.questionnaire = new FormGroup({
      title: new FormControl('', [Validators.required]),
      sections: new FormArray([]),
    });

    this.addSection();
  }

  public addSection() {
    (<FormArray>this.questionnaire.get('sections')).push(
      new FormGroup({
        title: new FormControl('', [Validators.required]),
        questions: new FormArray([]),
      }),
    );

    this.addQuestion((<FormArray>this.questionnaire.get('sections')).length - 1);
  }

  public removeSection(i: number) {
    (<FormArray>this.questionnaire.get('sections')).removeAt(i);
  }

  public addQuestion(i) {
    (<FormArray>((<FormArray>this.questionnaire.get('sections')).controls[i]).get('questions')).push(
      new FormGroup({
        question: new FormControl('', [Validators.required]),
      }),
    );
  }

  public removeQuestion(i, j) {
    (<FormArray>((<FormArray>this.questionnaire.get('sections')).controls[i]).get('questions')).removeAt(j);

    if (j === 0) {
      this.addQuestion(i);
    }
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
        this._systemMessageService.info('Размер файла превышает 5мб');
      }
    }
  }

  save() {
    console.log(this.questionnaire.value);

    if (!this.isFromFile) {
      this.questionnaireApi.createQuestionnaire(this.questionnaire.value)
        .subscribe(
          res => {
            this.router.navigate(['/personal-account']);
          },
          err => console.log(err)
        );
    } else {
      const formData: FormData = new FormData();

      formData.append('fileToUpload', this.fileToUpload.file);
      formData.append('title', this.questionnaire.value.title);

      this.questionnaireApi.createWithFileQuestionnaire(formData)
        .subscribe(
          res => {
            this.router.navigate(['/personal-account']);
          },
          err => console.log(err)
        );
    }
  }
}

