import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { MainComponent } from "./build-blocks/main/main.component";
import { ResumeListComponent } from "./build-blocks/resume-list/resume-list.component";
import { UsersComponent } from "./pages/users";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
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
        ]
    },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
