import * as moment from 'moment';

class Comment {
  creationDate: any ;
  userId: string;
  userName: string ;
  text: string;

  constructor(comment) {
    this.creationDate = moment(comment.creationDate);
    this.userId = comment.userId;
    this.userName = comment.userName;
    this.text = comment.comment;
  }
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
  comments: Comment[] = [];
  tags: string[] = [];

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
    this.tags = news.tags;
    news.comments.map(comment => {
      this.comments.push(new Comment(comment));
    });
  }
}