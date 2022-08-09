import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  darkMode: boolean = false;

  @Output()
  darkModeChange = new EventEmitter<boolean>();

  @Output()
  helpClicked = new EventEmitter<boolean>();

  @Output()
  menuClicked = new EventEmitter<boolean>();

  @Output()
  settingsClicked = new EventEmitter<boolean>();

}
