import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUser } from '../store/user.actions';
import { User } from '../store/user.model';
import { AppState } from '../store/app.state';

@Injectable()
export class UserService {
  private readonly DB_NAME = 'todo-app';
  private readonly STORE_NAME = 'users';
  private readonly DB_VERSION = 1;

  constructor(private store: Store<AppState>) {
    this.loadUsersFromIndexedDB();
  }

  private createDatabase(): void {
    const openRequest = indexedDB.open(this.DB_NAME, this.DB_VERSION);

    openRequest.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;

      // Create object store(s) if they don't exist
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
    };

    openRequest.onerror = (event: any) => {
      console.error('Error opening IndexedDB', event.target.error);
    };
  }

  /**
   * Loads users from IndexedDB
   */
  loadUsersFromIndexedDB() {
    const openRequest = indexedDB.open(this.DB_NAME);

    openRequest.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event.target as any).result;

      if (!db.objectStoreNames.contains(this.STORE_NAME)) {
        db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
      }
    };

    openRequest.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as any).result;

      const transaction = db.transaction(this.STORE_NAME, 'readonly');
      const objectStore = transaction.objectStore(this.STORE_NAME);
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = (event) => {
        const users: User[] = (event.target as any).result;
        users.forEach((user) => this.store.dispatch(addUser({ user })));
      };
    };

    openRequest.onerror = (event) => {
      console.error('Error opening IndexedDB', (event.target as any).error);
    };
  }

  /**
   * Adds user to IndexedDB
   */
  addUserToIndexedDB(user: User) {
    const openRequest = indexedDB.open(this.DB_NAME);

    openRequest.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as any).result;

      const transaction = db.transaction(this.STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(this.STORE_NAME);
      const addUserRequest = objectStore.add(user);

      addUserRequest.onsuccess = () => {
        console.log('User added to IndexedDB');
      };
    };

    openRequest.onerror = (event) => {
      console.error('Error opening IndexedDB', (event.target as any).error);
    };
  }

  /**
   * Updates user in IndexedDB
   */
  updateUserInIndexedDB(user: User) {
    const openRequest = indexedDB.open(this.DB_NAME);

    openRequest.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as any).result;

      const transaction = db.transaction(this.STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(this.STORE_NAME);
      const putUserRequest = objectStore.put(user);

      putUserRequest.onsuccess = () => {
        console.log('User updated in IndexedDB');
      };
    };

    openRequest.onerror = (event) => {
      console.error('Error opening IndexedDB', (event.target as any).error);
    };
  }

  /**
   * Deletes user from IndexedDB
   */
  deleteUserFromIndexedDB(userId: string) {
    const openRequest = indexedDB.open(this.DB_NAME);

    openRequest.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as any).result;

      const transaction = db.transaction(this.STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(this.STORE_NAME);
      const deleteUserRequest = objectStore.delete(userId);

      deleteUserRequest.onsuccess = () => {
        console.log('User deleted from IndexedDB');
      };
    };

    openRequest.onerror = (event) => {
      console.error('Error opening IndexedDB', (event.target as any).error);
    };
  }
}
