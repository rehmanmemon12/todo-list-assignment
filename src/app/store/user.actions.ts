import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const deleteUser = createAction('[User] Delete User', props<{ userId: string }>());
export const updateUser = createAction('[User] Update User', props<{ user: User }>());
