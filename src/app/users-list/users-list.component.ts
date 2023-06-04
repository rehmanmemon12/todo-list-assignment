import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {User} from '../store/user.model';
import {getAllUsers} from '../store/user.selectors';
import {MatDialog} from '@angular/material/dialog';
import {AddUserComponent} from '../add-user/add-user.component';
import {deleteUser, updateUser, addUser} from '../store/user.actions';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  searchFormControl: FormControl<string | null> = new FormControl('');

  constructor(private store: Store<AppState>,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.users$ = this.store.select(getAllUsers);
  }

  onSearch(): void {
    this.users$ = this.store.select(getAllUsers).pipe(
      debounceTime(700),
      distinctUntilChanged(),
      map(users => users.filter(user => user.email.includes(this.searchFormControl.value ?? '')))
    );

  }

  openAddUserDialog(data: any): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (data == null) {
          this.addUser(result);
          return;
        }
        if (result.id === data.id ) {
          this.updateUserDetails(result);
        }
      }
    });
  }

  deleteUser(userId: string): void {
    this.store.dispatch(deleteUser({userId}));
  }

  addUser(user: User): void {
    this.store.dispatch(addUser({user}));
  }

  updateUserDetails(user: User): void {
    this.store.dispatch(updateUser({user}));
  }

  searchUser(email: string): void {
    this.users$ = this.store.select(getAllUsers).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(users => users.filter(user => user.email.includes(email)))
    );
  }

  openTabs(id: string) {
    this.router.navigate(['tabs/',id]).then();
  }
}
