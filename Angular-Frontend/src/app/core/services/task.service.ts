import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {  catchError, EMPTY, Observable, Subject, tap } from "rxjs";
import { Task, TaskDTO } from "../models/task.models";
import { ToastrService } from "ngx-toastr";
import { conf } from "src/environement";



@Injectable({
    providedIn: 'root'
  })
  export class TaskService {

    private API = `${conf.Backend_API}/tasks/`

    private TaskAddedSubject = new Subject<Task>();
    taskAdded$ = this.TaskAddedSubject.asObservable();

    private TaskUpdatedSubject = new Subject<Task>();
    taskUpdated$ = this.TaskUpdatedSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        private toastr: ToastrService,
        
      ) { 
      }


    getAllTasksByUser():Observable<Task[]>{
      return this.httpClient.get<Task[]>(`${this.API}`)
    }

    createTaskByUser(task: TaskDTO):Observable<Task>{
      return this.httpClient.post<Task>(`${this.API}create/`, task)
      .pipe(
        tap((task: Task) => {
          this.TaskAddedSubject.next(task);
        }),
        tap(
          () => this.toastr.success('task created successfully :)')
        ),
        catchError(e => {
          this.toastr.error(`${e.error.message}`);
          return EMPTY
        })
      )
    }

    updateTaskByUser(task:Task): Observable<Task>{
      return this.httpClient.patch<Task>(`${this.API}update/${task.id}/`, task )
      .pipe(
        tap((task: Task) => {
          this.TaskUpdatedSubject.next(task);
        }),
        tap(
          () => this.toastr.success('task updated successfully :)')
        ),
        catchError(e => {
          this.toastr.error(`${e.error.message}`);
          return EMPTY
        })
      )
    }
    deleteTaskByUser(taskId : number): Observable<void>{
      return this.httpClient.delete<void>(`${this.API}delete/${taskId}/`)
  }




  }