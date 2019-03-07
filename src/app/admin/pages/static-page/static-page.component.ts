import { Component } from '@angular/core';
import { LocalizationApi } from 'api';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { merge } from 'rxjs/internal/observable/merge';
import { publishReplay, refCount, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'static-page.col-12.row',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss'],
})
export class StaticPageComponent {

  public language: string = 'ru';
  public page: string = 'aboutUs'; // 'aboutUs', 'serviceUs', 'privacyPolicy'
  public textEditorConfig: any = {}; // для RichTextComponent'ы
  public html: string = '';

  public save = new Subject<void>();
  public save$ = this.save.asObservable().pipe(
    switchMap(() => this.localizationApi.updateStaticPage(this.language, this.page, this.html)),
    publishReplay(1),
    refCount(),
  );

  public updateData = new BehaviorSubject<void>(null);
  public data$ = merge(
    this.updateData.asObservable(),
    this.save$,
  ).pipe(
    switchMap(() => this.localizationApi.getStaticPage(this.language, this.page)),
    tap((res) => this.html = res['page']),
    publishReplay(1),
    refCount(),
  );

  constructor(
    public localizationApi: LocalizationApi,
  ) {}

}
