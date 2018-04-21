import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuards } from "../guards";
import { AdminComponent } from "./admin.component";
import { MainComponent } from "./pages/main/main.component";
import { ResumeListComponent } from "./pages/resume-list/resume-list.component";
import { UsersComponent } from "./pages/users/users.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuards],
        children: [
            {
                path: '', component: MainComponent
            },
            {
                path: 'resumeList', component: ResumeListComponent
            },
            {
                path: 'users', component: UsersComponent
            },
        ],
    },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
