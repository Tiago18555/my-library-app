import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Output()
  public activeLink : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
