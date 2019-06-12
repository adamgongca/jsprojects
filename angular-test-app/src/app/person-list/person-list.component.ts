import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: Observable<Person[]>;

  constructor(
    private personService: PersonService 
  ) { 
    this.persons = personService.getPersonList();
  }

  ngOnInit() {
  }

}
