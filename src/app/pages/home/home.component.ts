import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username : string = ''

  constructor(
    private storage : LocalStorageService
  ) { }


  ngOnInit(): void {
    this.username = this.storage.get('session').user;   
  }

}

