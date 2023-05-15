import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username : string = ''
  public menuState : boolean = false

  constructor(
    private storage : LocalStorageService
  ) { }

  showMenu = ($state: boolean): boolean => this.menuState = $state

  ngOnInit(): void {
    this.username = this.storage.getString('session');
  }

}

