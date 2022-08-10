import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'mylibrary-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username : string = '';
  public token : string = '';

  constructor(
    private storage : LocalStorageService,
    private service : MyLibraryApiService
  ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    this.token = this.storage.getString('session');
    this.username = helper.decodeToken(this.token).sub;
    console.log('Saída da função decodetoken: ' + this.username);
  }

  logout() : void {
    this.service.logout()
  }

}
