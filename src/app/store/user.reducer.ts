import { createReducer, on } from '@ngrx/store';
import { addUser, deleteUser, updateUser } from './user.actions';
import { User } from './user.model';

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: []
};

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(deleteUser, (state, { userId }) => ({ ...state, users: state.users.filter(user => user.id !== userId) })),
  on(updateUser, (state, { user }) => ({ ...state, users: state.users.map(u => (u.id === user.id ? user : u)) }))
);
