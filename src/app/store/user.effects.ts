import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { addUser, deleteUser, updateUser } from './user.actions';

@Injectable()
export class UserEffects {
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      map((action) => action.user),
      tap((user) => this.userService.addUserToIndexedDB(user))
    ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      map((action) => action.userId),
      tap((userId) => this.userService.deleteUserFromIndexedDB(userId))
    ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      map((action) => action.user),
      tap((user) => this.userService.updateUserInIndexedDB(user))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
