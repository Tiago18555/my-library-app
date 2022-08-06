import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { MyLibraryApiService } from '../services/my-library-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router : Router,
    private localStorage : LocalStorageService,
    private service : MyLibraryApiService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    let token = this.localStorage.get('session').token;    
    
    if ( token === {} || token === undefined ){
      this.router.navigate(['/login']);
      console.log('token is undefined or null');
      
      return false;
    }

    this.service.validate({ token: token })
      .subscribe(data => {
        if (data.data !== 'Token expirado ou inválido.') {                         
          return true;          
        }
        this.router.navigate(['/login']); 
        return false;            
      })
      return true;
  }
}