import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeListComponent } from "./resume-list/resume-list.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'resumeList'
    },
    {
        path: 'resumeList',
        component: ResumeListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
