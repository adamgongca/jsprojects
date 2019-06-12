import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonListComponent} from './person-list/person-list.component';
import { SearchPersonComponent } from './search-person/search-person.component'

const routes: Routes = [
  { path: '', redirectTo: '/listall', pathMatch: 'full' },
  { path: 'listall', component: PersonListComponent },
  { path: 'search', component: SearchPersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
