import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable, of, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor( 
    private http: HttpClient,
    private messageService: MessageService) { }

  persons : Person[] ;

  private personListUrl = 'api/personList'
  private searchUrl = 'api/search'

  getPersonList() : Observable<Person[]> {
    return this.http.get<Person[]>(this.personListUrl)
      .pipe(
        tap(_ => this.log('fetched persones')),
        catchError(this.handleError<Person[]>('getPersonList', []))
      );
  }

  searchPersons(term: Person): Observable<Person[]>{
    if(!term) {
      return of([]);
    }
    return this.http.get<Person[]>(`${this.searchUrl}?firstname=${term.firstName}&lastname=${term.lastName}`).pipe(
      tap(_ => this.log(`found persons matching "${term}"`)),
      catchError(this.handleError<Person[]>('searchPersons', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`personService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }



}
