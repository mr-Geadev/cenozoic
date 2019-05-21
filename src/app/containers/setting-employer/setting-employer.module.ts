import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { VerifyAccountModalService } from 'pop-ups/verify-account/verify-account-modal.service';
import {SettingEmployerComponent} from './setting-employer.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ImageCropperModule
    ],
    declarations: [SettingEmployerComponent],
    providers: [
      VerifyAccountModalService
    ],
    exports: [SettingEmployerComponent]
})
export class SettingEmployerModule {
}
