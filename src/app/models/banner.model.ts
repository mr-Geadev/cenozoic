import { Moment } from 'moment';
import * as moment from 'moment';

export class BannerModel {
  _id: string;
  title: string;
  status: number = 0;
  shortDescription: string;
  creationDate: any;
  changeDate: any;
  photoURL: string;
  publicate: boolean;
  text: string;
  userId: string;
  language: string;
  timeoutDate: Moment = null;

  constructor(news) {
    this._id = news._id;
    this.title = news.title;
    this.shortDescription = news.shortDescription;
    this.creationDate = moment(news.creationDate);
    this.changeDate = moment(news.changeDate);
    this.photoURL = news.photoURL;
    this.publicate = news.publicate;
    this.language = news.language;
    this.text = news.text;
    this.userId = news.userId;
    this.status = news.status || 0;
    this.timeoutDate =  moment(news.timeoutDate);
  }
}
