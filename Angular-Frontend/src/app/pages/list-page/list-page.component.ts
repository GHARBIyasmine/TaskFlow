import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/core/models/task.models';
import { TaskService } from 'src/app/core/services/task.service';
import { AddTaskpopupComponent } from '../components/popup/add-taskpopup/add-taskpopup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {


  list : Task[] = []
  isLoading: boolean = true;  // Set initial state to loading

  private taskAddedSubscription: Subscription;
  private taskUpdatedSubscription: Subscription;
  

  constructor(private route: ActivatedRoute,
              private toaster : ToastrService,
              private taskService: TaskService,
              public createDialog: MatDialog
  ) { 
   
    this.taskAddedSubscription = this.taskService.taskAdded$
    .pipe(takeUntilDestroyed())
    .subscribe({
      next: task => {
        this.list.push(task)
      },
      error: error => {
        console.error(error)
      }
      
    });

    this.taskUpdatedSubscription = this.taskService.taskUpdated$
    .pipe(takeUntilDestroyed())
    .subscribe({
      next: updatedTask => {
        console.log('Updated Task:', updatedTask);
        const index = this.list.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          this.list[index].description = updatedTask.description;
        }
      }
    })
  }
  ngOnInit(): void {
    
        this.taskService.getAllTasksByUser().subscribe({
          next: (list) => {
            this.list = list;
            this.isLoading = false;  // Set loading to false once tasks are loaded
            
          },
          error: (error) => {
            this.toaster.error('Problem: Access failed to API :(');
            this.isLoading = false;  // Stop loading even on error
          }
        });
  }


  onTaskDeleted(taskId: number): void {
    const index = this.list.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.list.splice(index, 1);  // Remove the task from the list
    }
  }
  

  onCreateClick(): void {
    const createDialogConfig = new MatDialogConfig();

    createDialogConfig.disableClose = false;
    createDialogConfig.autoFocus = true;
    createDialogConfig.hasBackdrop = true;
    createDialogConfig.height = '520px';
    createDialogConfig.width = '500px';

    this.createDialog.open(AddTaskpopupComponent, createDialogConfig);
    }
}
