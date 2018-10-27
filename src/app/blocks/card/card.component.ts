import { Component, Input, OnInit } from '@angular/core';
import { RespondsApi } from 'api';
import { QuestionnaireModel, RespondModel, VacancyModel } from 'models';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  /*
   В карточку приходит тип аккаута и одна из сущностей,
   Основываясь на ней и типе аккаунта мы выводим разные типы карточки.
   Словарь приходит, чтобы не делать подписку на сервис локализации в каждой карточке
   */

  @Input('typeUser') typeUser: string; // worker/employer
  @Input('dictionary') dictionary: any;
  @Input('heightContent') heightContent: number;

  @Input('vacancy') vacancy?: VacancyModel;
  @Input('resume') resume?: any;
  @Input('respond') respond?: RespondModel;
  @Input('questionnaire') questionnaire?: QuestionnaireModel;

  @Input('addNew') addNew?: boolean;
  @Input('addQuestionnaire') addQuestionnaire?: boolean;

  constructor(private respondsApi: RespondsApi) {
  }

  public ngOnInit() {
  }

  public addRoute(): string {
    if (this.addNew) {
      if (this.typeUser === 'worker') {
        return '/create-resume';
      } else {
        return '/create-vacancy';
      }
    }

    if (this.addQuestionnaire) {
      return '/create-questionnaire';
    }
  }

  public viewRoute(): string {
    if (this.resume) {
      return `/resume/${this.resume._id}`;
    } else if (this.vacancy) {
      return `/vacancy/${this.vacancy._id}`;
    }

    return null;
  }

  public moreRoute(): string {
    if (this.typeUser === 'worker') {
      return `/vacancy/${this.respond.vacancyId}`;
    } else {
      return `/resume/${this.respond.resumeId}`;
    }
  }

  public routeButtonMore(): string {
    if (this.addQuestionnaire || this.addNew) {
      return this.addRoute();
    }

    if (this.respond) {
      return this.moreRoute();
    }

    if (this.questionnaire) {
      if (this.questionnaire.type === 'data') {
        return `/questionnaire/${this.questionnaire._id}`;
      } else {
        return this.questionnaire.fileURL;
      }
    }

    return this.viewRoute();
  }

  public textButtonMore(): string {
    if (this.addNew) {
      if (this.typeUser === 'worker') {
        return this.dictionary.ADD_NEW_CV;
      } else {
        return this.dictionary.ADD_NEW_VACANCY;
      }
    }

    if (this.addQuestionnaire) {
      return this.dictionary.ADD_QUESTIONNAIRE;
    }

    return this.dictionary.MORE;
  }

  public checkToViewed() {
    if (this.respond && !this.respond.viewed) {
      if (this.typeUser === 'worker') {
        this.respondsApi.checkOfferToViewed(this.respond._id);
      } else {
        this.respondsApi.checkRespondToViewed(this.respond._id);
      }
    }
  }

  public getRespondTitle(): string {
    if (this.typeUser === 'worker') {
      return this.respond.resume.job;
    } else {
      return this.respond.vacancy.title;
    }
  }

}
