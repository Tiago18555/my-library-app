import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'mylibrary-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username : string = ''

  constructor(
    private storage : LocalStorageService,
    private service : MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.username = this.storage.get('session').user;   
  }

  logout() : void {
    this.service.logout()
  }

}
