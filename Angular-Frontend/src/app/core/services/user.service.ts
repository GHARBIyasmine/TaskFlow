import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, Subject,} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {  User } from '../models/user.models';
import { conf } from 'src/environement';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  
 
  private API = `${conf.Backend_API}`
  private userDataSubject: Subject<User> = new Subject<User>();
  userData$: Observable<User> = this.userDataSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) { }

  getUserDetails(){
    return this.httpClient.get<User>(`${this.API}/user-details/`)
    
   }

   updateUserDetails(user: User): Observable<User> {
    return this.httpClient.patch<User>(`${this.API}/user-details/`, user)
    .pipe(
      tap((newUser: User) => {
        this.userDataSubject.next(newUser); 
        this.toastr.success('User updated successfully');
      }),
      catchError(e => {
        this.toastr.error(`User could not be updated because: ${e.error.message}`);
        return EMPTY;
      })
    );
  }
  
  deleteUserAccount(): Observable<void>{
    return this.httpClient.delete<void>(`${this.API}/user-delete/`)
  }



}
