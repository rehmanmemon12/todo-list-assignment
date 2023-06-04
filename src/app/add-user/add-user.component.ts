import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from '../store/user.model';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  buttonName = 'Add';

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      console.log(this.data);
      this.buttonName = 'Update';
      this.userForm.patchValue(this.data);
    }
  }

  /**
   * Initializes the user form.
   */
  private initForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  todoFormValidationErrors = {
    name: [
      {
        type: 'required',
        message: 'Name is required',
      },
    ],
    email: [
      {
        type: 'required',
        message: 'Email is required',
      },
    ],
    phone: [
      {
        type: 'required',
        message: 'Phone is required',
      },
    ],
  };

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    let id;
    if (this.data) {
      id = this.data.id;
    } else {
      id = this.generateUserId();
    }
    const user: User = {
      id: id,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
    };

    // this.store.dispatch(addUser({user}));
    this.dialogRef.close(user);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * generate Id's.
   */
  private generateUserId(): string {
    // Generate a unique user ID using any desired logic
    return 'user_' + Date.now();
  }

  /**
   * Determines whether an error should be displayed for a given input and validation.
   */
  shouldShowError(
    input?: any,
    validation?: { type: string; message: string }
  ): string {
    if (input?.hasError(validation?.type) && (input?.dirty || input?.touched)) {
      return 'block';
    } else {
      return 'none';
    }
  }

  checkValidations(formGroup: FormGroup): void {
    if (formGroup.invalid) {
      formGroup.markAllAsTouched();
    }
  }
}
