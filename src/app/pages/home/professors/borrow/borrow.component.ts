import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowComponent implements OnInit {

  public id = this.router.routerState.snapshot.url.replace('/home/professors/borrow/', '')

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
