import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-successful',
  templateUrl: './change-successful.component.html',
  styleUrls: ['./change-successful.component.scss'],
})
export class ChangeSuccessfulComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
}
