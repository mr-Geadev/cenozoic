import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsApi } from 'api';
import { NewsModel, UserModel } from 'models';
import { Location } from '@angular/common';

import { ConfirmService, LocalizationService, UserService } from 'services';
import 'rxjs-compat/add/operator/share';
import 'rxjs-compat/add/operator/last';

@Component({
  selector: 'full-news',
  templateUrl: './full-news.component.html',
  styleUrls: ['./full-news.component.scss'],
})
export class FullNewsComponent implements OnInit {

  public dictionary: any = {};
  public news: NewsModel;
  private id: string = null;
  private currentLang: string = null;
  public currentUser: UserModel = null;
  public textComment: string = null;

  constructor(private activateRoute: ActivatedRoute,
              private newsApi: NewsApi,
              private router: Router,
              public userService: UserService,
              private _location: Location,
              private confirmService: ConfirmService,
              private _dialog: MatDialog,
              private _localizationService: LocalizationService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res
      );

    this.currentLang = LocalizationService.currentLang();

    this.userService.user$
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
        }
      });

    this.getNews();
  }

  getNews() {
    this.newsApi.getNewsById(this.id)
      .subscribe(res => { this.news = new NewsModel(res['news']); });
  }

  publish(location) {
    this.newsApi.publishTo(this.id, location)
      .subscribe(
        res => this.getNews(),
      );
  }

  sendComment() {
    this.newsApi.addComent(this.id, this.textComment)
      .subscribe(
        res => {
          this.getNews();
          this.textComment = '';
        },
      );
  }

  removeNews() {
    this.confirmService.confirm(this.dictionary.APPROVED_MESSAGE_DELETE)
      .subscribe((res) => {
        if (res) {
          this.newsApi.removeNews(this.id)
            .subscribe(() => {
              this._location.back();
            });
        }
        this._dialog.closeAll();
      });
  }

  removeComment(indexComment: number) {
    const confirm = this.confirmService.confirm(this.dictionary.APPROVED_MESSAGE_DELETE)
      .subscribe((res) => {
        if (res) {
          this.newsApi.removeComment(this.id, indexComment)
            .subscribe(() => {
              this.getNews();
              confirm.unsubscribe();
            });
        }
        this._dialog.closeAll();
      });
  }

  getUserName(name, type): string {
    if (type) {
      if (type === 'admin' || type === 'manager') {
        return 'Администрация';
      } else {
        return name;
      }
    }
    return 'Удаленный аккаунт';
  }
}
