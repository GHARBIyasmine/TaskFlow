import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/core/models/task.models';
import { TaskService } from 'src/app/core/services/task.service';

interface DialogData {
  task : Task
}


@Component({
  selector: 'app-edit-taskpopup',
  templateUrl: './edit-taskpopup.component.html',
  styleUrl: './edit-taskpopup.component.css'
})
export class EditTaskpopupComponent {
  constructor(private popUpRef: MatDialogRef<EditTaskpopupComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


    formData = {
      name: this.data.task.description,
    };

    submitForm(form : NgForm) {
      this.taskService.updateTaskByUser(
        { id: this.data.task.id,
          description : this.formData.name,
          done: this.data.task.done

        }).subscribe();
      console.log('Form submitted with data:', this.formData);
      this.close()
    }


    close() {
      this.popUpRef.close();
  }

}
