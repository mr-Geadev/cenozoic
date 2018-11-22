import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'models';
import { SystemMessageService, UserService } from 'services';

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

  constructor(private router: Router,
              private userService: UserService,
              private messages: SystemMessageService) {
  }

  public ngOnInit() {
    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
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
      this.messages.info('Пожалуйста авторизируйтесь');
    }
  }

}