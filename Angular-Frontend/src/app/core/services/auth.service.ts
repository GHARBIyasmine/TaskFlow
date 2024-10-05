import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { conf } from 'src/environement';
import { User } from '../models/user.models';
import { ToastrService } from 'ngx-toastr';
import { LoginResponseI, RegisterResponseI } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = `${conf.Backend_API}`

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) { }

  login(user: User): Observable<LoginResponseI> {
    return this.httpClient.post<LoginResponseI>(`${this.API}/api/token/`, user).pipe(
      tap((res: LoginResponseI) => {
        console.log('res:',res);
        localStorage.setItem(conf.ACCESS_TOKEN_KEY, res.access)
        localStorage.setItem(conf.REFRESH_TOKEN_KEY, res.refresh)
      }),

      tap(() => console.log('logged in successfully :)')),
      catchError(e => {
        this.toastr.error(`${e.error.detail}`);
        return EMPTY;
      })
    )
  }

  register(user: User): Observable<RegisterResponseI> {
    return this.httpClient.post<RegisterResponseI>(`${this.API}/register/`, user).pipe(
     tap(() => this.toastr.success(`account was created succesfuly`)),
     catchError(e => {
       this.toastr.error(`User could not be created because: ${e.error.email}`);
       return EMPTY;
     })
    )
  }

  // Function to refresh the token
  refreshToken(refreshToken: string): Observable<{ access: string, refresh: string }> {
    return this.httpClient.post<{ access: string, refresh: string }>(`${this.API}/api/token/refresh/`, {
      refresh: refreshToken
    });
  }


  logout(): void {
    localStorage.removeItem(conf.ACCESS_TOKEN_KEY);
    localStorage.removeItem(conf.REFRESH_TOKEN_KEY);
    this.toastr.success('Logged out successfully');
  }
  
  isAuthenticated(): boolean {
    
    return !!localStorage.getItem(conf.ACCESS_TOKEN_KEY);
  }


}
