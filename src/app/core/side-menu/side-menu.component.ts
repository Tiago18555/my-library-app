import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mylibrary-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() menuState: boolean = false;
  @Output() returnMenuState: EventEmitter<boolean> = new EventEmitter<boolean>()

  hideMenu() {
    this.menuState = !this.menuState
    this.returnMenuState.emit(this.menuState)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
