import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/core/models/task.models';
import { EditTaskpopupComponent } from '../popup/edit-taskpopup/edit-taskpopup.component';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {


  @Output() taskDeleted: EventEmitter<number> = new EventEmitter<number>();

 constructor(
  private editDialog: MatDialog,
  private deleteDialog: MatDialog,
  private taskService: TaskService 
){}
  
  checkboxColor: ThemePalette = 'primary';
  
  color: string = '#F8FBF9';

  @Input() task!: Task;

  isChecked: boolean = false ;


  ngOnInit(): void {
   this.isChecked = this.task.done
  }

  onCheckboxChange(task: Task) {
    const originalState = task.done;  // Save the original state in case of failure
    task.done = !task.done;  // Toggle the checked state optimistically
    console.log('task status is:', task.done)
    this.taskService.updateTaskByUser(
      { id: this.task.id,
        description : this.task.description,
        done: task.done

      }).subscribe(
        {
          next: () => {
            
          },
          error: () => {
            task.done = originalState;  // Roll back the UI change if there's an error
            console.error('Failed to update task status. Please try again.');
          }
        }
      );
    }
 
  onEditClick() {
    const editDialogConfig = new MatDialogConfig();

    editDialogConfig.disableClose = false;
    editDialogConfig.autoFocus = true;
    editDialogConfig.hasBackdrop = true;
    editDialogConfig.height = '520px';
    editDialogConfig.width = '500px';
    editDialogConfig.data ={
      task : this.task 
    }

    this.editDialog.open(EditTaskpopupComponent, editDialogConfig);
    }





    onDeleteClick(task : Task): void {


      const deleteDialogConfig = new MatDialogConfig();
  
      deleteDialogConfig.disableClose = false;
      deleteDialogConfig.autoFocus = true;
      deleteDialogConfig.hasBackdrop = true;
      deleteDialogConfig.data = {
        type : 'task',
        
      }
      const dialogRef = this.deleteDialog.open(DeletePopupComponent, deleteDialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.taskService.deleteTaskByUser(task.id ).subscribe({
            next: () => {
              this.taskDeleted.emit(task.id);
              
            },
            error: (error) => {
              
              console.error('Failed to delete list');
            }
          });
        }
      });
    
    
  
    }
}
