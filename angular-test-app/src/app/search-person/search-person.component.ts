import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Person } from '../person';
import { PersonService} from '../person.service';

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.css']
})
export class SearchPersonComponent implements OnInit {
  persons$: Observable<Person[]>;

  private searchTerms = new Subject<Person>();

  search(searchFirstname: string,searchLastname: string){
    this.searchTerms.next(new Person(searchFirstname, searchLastname));
  }


  constructor(
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.persons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: Person) => this.personService.searchPersons(term)),
    );
  }

}
