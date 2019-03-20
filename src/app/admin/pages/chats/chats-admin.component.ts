import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalizationService } from 'services';

@Component({
  selector: 'chats-admin.col',
  templateUrl: './chats-admin.component.html',
  styleUrls: ['./chats-admin.component.scss'],
})
export class ChatsAdminComponent implements OnInit {

  private currentLang: string = null;
  public userId: string = null;
  private type: string = null;

  constructor(private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentLang = LocalizationService.currentLang();

    this.activateRoute.params
      .subscribe((params) => {
        this.userId = params['id'];
      });
  }

}
