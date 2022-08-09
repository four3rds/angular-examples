import { Component, HostListener, OnInit } from '@angular/core';

const NARROW_WIDTH_THRESHOLD: number = 600;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkMode: boolean = false;

  sideNavOpened: boolean = false;

  title = "Application Title";

  windowWidth: number = -1;

  darkModeChange(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  ngOnInit(): void {
    this.setWindowWidth(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event && event.target && event.target.innerWidth) {
      this.setWindowWidth(event.target.innerWidth);
    }
  }

  showSettings(): void {
    alert("Settings Not Yet Implemented");
  }

  private setWindowWidth(windowWidth: number) {
    if (windowWidth != this.windowWidth) {
      this.windowWidth = windowWidth;
    }
  }

  showHelp(): void {
    alert("Help Not Yet Implemented");
  }

  sideNavOpenedChange(sideNavOpened: boolean): void {
    console.log("Open Sesame");
    this.sideNavOpened = sideNavOpened;
  }
}
