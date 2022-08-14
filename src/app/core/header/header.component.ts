import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'mylibrary-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username : string = '';
  public token : string = '';

  public InicioIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/welcome')
  public AlunosIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/students')
  public ProfessoresIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/professors')
  public AcervoIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/books')
  public RegistroIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/history')


  constructor(
    private storage : LocalStorageService,
    private service : MyLibraryApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    this.token = this.storage.getString('session');
    this.username = helper.decodeToken(this.token).sub;
    console.log('reload');

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;    
  }

  logout() : void {
    this.service.logout()
  }


}
