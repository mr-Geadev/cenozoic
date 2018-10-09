export class QuestionnaireModel {
  public title: string = null;
  public countOfQuestion: number = null;
  public fileQuestionnaire: boolean = false;

  constructor(questionnaire) {
    this.title = questionnaire.title;
    this.countOfQuestion = questionnaire.countOfQuestion;
    this.fileQuestionnaire = questionnaire.fileQuestionnaire;
  }
}