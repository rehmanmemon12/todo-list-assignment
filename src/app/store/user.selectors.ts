import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>('users');

export const getAllUsers = createSelector(getUserState, state => state.users);
