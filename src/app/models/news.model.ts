import * as moment from 'moment';

class Comment {
  creationDate: any ;
  userId: string;
  userName: string ;
  typeAccount: string ;
  text: string;

  constructor(comment) {
    this.creationDate = moment(comment.creationDate);
    this.userId = comment.userId;
    this.userName = comment.userName;
    this.text = comment.comment;
    this.typeAccount = comment.typeAccount;
  }
}

export class NewsModel {
  _id: string;
  title: string;
  language: string;
  shortDescription: string;
  creationDate: any;
  changeDate: any;
  photoURL: string;
  publicateToMainPage: boolean;
  publicateToNewsPage: boolean;
  text: string;
  userId: string;
  comments: Comment[] = [];
  tags: string[] = [];
  viewed: boolean = true;

  constructor(news) {
    this._id = news._id;
    this.title = news.title;
    this.language = news.language;
    this.shortDescription = news.shortDescription;
    this.creationDate = moment(news.creationDate);
    this.changeDate = moment(news.changeDate);
    this.photoURL = news.photoURL;
    this.publicateToMainPage = news.publicateToMainPage;
    this.publicateToNewsPage = news.publicateToNewsPage;
    this.text = news.text;
    this.userId = news.userId;
    this.tags = news.tags;
    this.viewed = news.viewed;
    news.comments.map(comment => {
      this.comments.push(new Comment(comment));
    });
  }
}
