import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'models';
import { LocalizationService, SystemMessageService, UserService } from 'services';

const FAQS = [
  {
    question: 'Вопрос',
    answer: 'Ответ',
    hidden: true,
  },
  {
    question: 'Вопрос',
    answer: 'Ответ',
    hidden: true,
  },
  {
    question: 'Вопрос',
    answer: 'Ответ',
    hidden: true,
  },
  {
    question: 'Вопрос',
    answer: 'Ответ <a href="/#" class="inline-link">ссылка</a> ',
    hidden: true,
  },
  {
    question: 'Вопрос',
    answer: 'Ответ',
    hidden: true,
  },
];

@Component({
  selector: 'faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent implements OnInit {

  public faqs = FAQS;
  public currentUser: UserModel = null;
  public dictionary: any = {};

  constructor(private router: Router,
              private userService: UserService,
              private _localizationService: LocalizationService,
              private messages: SystemMessageService) {
  }

  public ngOnInit() {
    this._localizationService.currentDictionary
      .subscribe(
        res => {
          this.dictionary = res;
        }
      );

    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
          this.faqs = [
            {
              question: this.dictionary.FAQ_PAGE_QUESTION_1,
              answer: this.dictionary.FAQ_PAGE_ANSWER_1,
              hidden: true,
            },
            {
              question: this.dictionary.FAQ_PAGE_QUESTION_2,
              answer: this.dictionary.FAQ_PAGE_ANSWER_2,
              hidden: true,
            },
            {
              question: this.dictionary.FAQ_PAGE_QUESTION_3,
              answer: this.dictionary.FAQ_PAGE_ANSWER_3,
              hidden: true,
            },
            {
              question: this.dictionary.FAQ_PAGE_QUESTION_4,
              answer: this.dictionary.FAQ_PAGE_ANSWER_4,
              hidden: true,
            },
            {
              question: this.dictionary.FAQ_PAGE_QUESTION_5,
              answer: this.dictionary.FAQ_PAGE_ANSWER_5,
              hidden: true,
            },
          ];
        }
      });
  }

  public toggleVisible(index) {
    this.faqs[index].hidden = !this.faqs[index].hidden;
  }

  goToSupport() {
    if (this.currentUser) {
      this.router.navigate(['/support']);
    } else {
      this.messages.info(this.dictionary.INFO_MESSAGES_PLEASE_AUTH);
    }
  }

}