import { Component, ContentChildren, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'my-tabs',
  template: `
    <ul class="navbar-nav">
      <li class="nav-item"  *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a class="nav-link" >{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [
    `
    .tab-close {
      color: gray;
      text-align: right;
      cursor: pointer;
    }
    `
  ]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: any){
    this.tabs.toArray().forEach(tab => tab.active = false);
    tab.active = true;
  }
}
