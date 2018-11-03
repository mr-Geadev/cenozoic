import * as moment from 'moment';

class Comment {
  creationDate: any = moment(new Date());
  userId: string = 'adadqemdasdq';
  userName: string = 'Козлов Георгий';
  text: string = 'Очень хорошая статья';
}

export class NewsModel {
  _id: string;
  title: string;
  shortDescription: string;
  creationDate: any;
  changeDate: any;
  photoURL: string;
  publicateToMainPage: boolean;
  publicateToNewsPage: boolean;
  text: string;
  userId: string;
  comments: Comment[];

  constructor(news) {
    this._id = news._id;
    this.title = news.title;
    this.shortDescription = news.shortDescription;
    this.creationDate = moment(news.creationDate);
    this.changeDate = moment(news.changeDate);
    this.photoURL = news.photoURL;
    this.publicateToMainPage = news.publicateToMainPage;
    this.publicateToNewsPage = news.publicateToNewsPage;
    this.text = news.text;
    this.userId = news.userId;
    // comments: []
  }
}
