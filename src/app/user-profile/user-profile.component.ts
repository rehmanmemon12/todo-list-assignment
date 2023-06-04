import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../store/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getAllUsers } from '../store/user.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  selectedUser: any;
  historyItems: string[] = [];
  users$!: Observable<User[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.users$ = this.store.select(getAllUsers);
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.users$.subscribe((users) => {
        this.selectedUser = users.find((user) => user.id == id);
      });
    });

    this.fetchHistoryItems();
  }

  fetchHistoryItems() {
    setTimeout(() => {
      this.historyItems = [
        'History item 1',
        'History item 2',
        'History item 3',
      ];
    }, 2000);
  }
}
