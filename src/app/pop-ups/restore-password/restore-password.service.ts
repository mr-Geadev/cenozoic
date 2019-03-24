import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { RestorePasswordComponent } from 'pop-ups/restore-password/restore-password.component';
import {UserService} from '../../services/user.service';

@Injectable()
export class RestorePasswordService {

  constructor(private dialog: MatDialog,
              public user: UserService) {
  }

  public restorePassword(): void {
    this.dialog.closeAll();

    this.dialog.open(RestorePasswordComponent, {
      width: '640px',
      height: '430px'
    } as MatDialogConfig);
  }
}
