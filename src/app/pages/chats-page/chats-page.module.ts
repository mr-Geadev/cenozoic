import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatsModule } from 'containers/chats';
import { ChatsPageComponent } from 'pages/chats-page/chats-page.component';

@NgModule({
  declarations: [
    ChatsPageComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'chats', component: ChatsPageComponent },
    ], {scrollPositionRestoration: 'enabled'}),
    CommonModule,
    RouterModule,
    FormsModule,
    ChatsModule
  ],
  exports: [ChatsPageComponent],
})
export class ChatsPageModule {
}
