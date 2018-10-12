class Question {
  public question: string;
  public answer: string;

  constructor(question) {
    this.question = question.question;
    question.answer ? this.answer = question.answer : null ;
  }
}

class Section {
  public title: string;
  public questions: Question[];

  constructor(section) {
    this.title = section.title;

    this.questions = section.questions.map(question => new Question(question))
  }
}

export class QuestionnaireModel {
  public creationDate: string;
  public title: string;
  public countOfQuestion: number = 0;
  public status: number;
  public type: string; // data or file
  public userId: string;
  public _id: string;

  public sections: Section[] = null;
  public fileURL: string = null

  constructor(questionnaire) {
    this.title = questionnaire.title;
    this.type = questionnaire.type;

    this.creationDate = questionnaire.creationDate || null;
    this.status = questionnaire.status || null;
    this.userId = questionnaire.userId || null;
    this._id = questionnaire._id || null;

    this.sections =  questionnaire.sections && questionnaire.sections.map(section => {
      this.countOfQuestion += section.questions.length;
      return new Section(section);
    });

    this.fileURL = questionnaire.fileURL || null;
  }
}
