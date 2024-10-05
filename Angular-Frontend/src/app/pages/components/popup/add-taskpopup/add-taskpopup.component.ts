import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-add-taskpopup',
  templateUrl: './add-taskpopup.component.html',
  styleUrl: './add-taskpopup.component.css'
})
export class AddTaskpopupComponent {
  constructor(
    private popUpRef: MatDialogRef<AddTaskpopupComponent>,
    private taskService: TaskService) {}


    formData = {
      description: '',
    };

    submitForm(form : NgForm) {
      this.taskService.createTaskByUser(this.formData).subscribe();
      console.log('Form submitted with data:', this.formData);
      this.close()
    }


    close() {
      this.popUpRef.close();
  }
}
