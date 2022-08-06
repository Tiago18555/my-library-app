import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public username : string = ''

  constructor(
    private storage : LocalStorageService,
    private service : MyLibraryApiService
  ) { }

  logout() : void {
    this.service.logout()
  }


  ngOnInit(): void {
    this.username = this.storage.get('session').user;   
  }

}
