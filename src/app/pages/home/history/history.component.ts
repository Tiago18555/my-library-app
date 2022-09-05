import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public finishedIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/history/finished')
  public unfinishedIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/history/unfinished')

  constructor(
    public router: Router,
    private service: MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

}
