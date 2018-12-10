import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnairesApi } from 'api';
import { QuestionnaireModel } from 'models';
import { LocalizationService, SystemMessageService } from 'services';
import { Location } from '@angular/common';

@Component({
  selector: 'constructor-questionnaire',
  templateUrl: './constructor-questionnaire.component.html',
  styleUrls: ['./constructor-questionnaire.component.scss'],
})
export class ConstructorQuestionnaireComponent implements OnInit {

  @Input('edit') edit?: boolean;

  public id: string = null;
  public questionnaire: FormGroup = null;
  public isFromFile: boolean = false;
  public fileToUpload: any = {
    file: null,
    data: null,
  };
  public dictionary: any = {};
  public nameOfFile: string = null;

  constructor(private _systemMessageService: SystemMessageService,
              private router: Router,
              private _location: Location,
              private _localizationService: LocalizationService,
              private questionnaireApi: QuestionnairesApi,
              private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    if (this.id) {
      this.questionnaireApi.getQuestionnaireById(this.id)
        .subscribe(
          res => this.createQuestionnaire(new QuestionnaireModel(res.questionnaire)),
        );
    } else {
      this.createQuestionnaire();
    }
  }

  public createQuestionnaire(editableQuestionnaire?: QuestionnaireModel) {
    if (editableQuestionnaire) {
      this.questionnaire = new FormGroup({
        title: new FormControl(editableQuestionnaire.title, [Validators.required]),
        sections: new FormArray([]),
      });

      editableQuestionnaire.sections.forEach((section, index) => this.addSection(section, index));
    } else {
      this.questionnaire = new FormGroup({
        title: new FormControl('', [Validators.required]),
        sections: new FormArray([]),
      });

      this.addSection();
    }
  }

  public addSection(section?, indexSection?) {
    if (section) {
      (<FormArray>this.questionnaire.get('sections')).push(
        new FormGroup({
          title: new FormControl(section.title, [Validators.required]),
          questions: new FormArray([]),
        }),
      );

      section.questions.forEach(question => this.addQuestion(indexSection, question));
    } else {
      (<FormArray>this.questionnaire.get('sections')).push(
        new FormGroup({
          title: new FormControl('', [Validators.required]),
          questions: new FormArray([]),
        }),
      );

      this.addQuestion((<FormArray>this.questionnaire.get('sections')).length - 1);
    }
  }

  public removeSection(i: number) {
    (<FormArray>this.questionnaire.get('sections')).removeAt(i);
  }

  public addQuestion(i, question?) {
    if (question) {
      (<FormArray>((<FormArray>this.questionnaire.get('sections')).controls[i]).get('questions')).push(
        new FormGroup({
          question: new FormControl(question.question, [Validators.required]),
        }),
      );
    } else {
      (<FormArray>((<FormArray>this.questionnaire.get('sections')).controls[i]).get('questions')).push(
        new FormGroup({
          question: new FormControl('', [Validators.required]),
        }),
      );
    }
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

    if (this.edit) {
      this.questionnaireApi.editQuestionnaire(this.id, this.questionnaire.value)
        .subscribe(
          res => {
            this._location.back();
          },
          err => console.log(err),
        );
    } else {
      if (!this.isFromFile) {
        this.questionnaireApi.createQuestionnaire(this.questionnaire.value)
          .subscribe(
            res => {
              this.router.navigate(['/personal-account', 'questionnaire']);
            },
            err => console.log(err),
          );
      } else {
        const formData: FormData = new FormData();

        formData.append('fileToUpload', this.fileToUpload.file);
        formData.append('title', this.questionnaire.value.title);

        this.questionnaireApi.createWithFileQuestionnaire(formData)
          .subscribe(
            res => {
              this.router.navigate(['/personal-account', 'questionnaire']);
            },
            err => console.log(err),
          );
      }
    }
  }
}

