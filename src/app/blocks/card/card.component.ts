import { Component, Input, OnInit } from '@angular/core';
import { RespondsApi } from 'api';
import { RespondModel, VacancyModel } from 'models';

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

  @Input('addNew') addNew?: boolean;

  constructor(private respondsApi: RespondsApi) {
  }

  public ngOnInit() {
  }

  public addRoute(): string {
    if (this.typeUser === 'worker') {
      return '/create-resume';
    } else {
      return '/create-vacancy';
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

  public descriptionForAdding(): string {
    if (this.typeUser === 'worker') {
      return this.dictionary.ADD_NEW_CV;
    } else {
      return this.dictionary.ADD_NEW_VACANCY;
    }
  }

  public checkToViewed() {
    if (!this.respond.viewed) {
      if (this.typeUser === 'worker') {
        this.respondsApi.checkOfferToViewed(this.respond._id);
      } else {
        this.respondsApi.checkRespondToViewed(this.respond._id);
      }
    }
  }

}
