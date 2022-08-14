import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Output()
  public activeLink : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
