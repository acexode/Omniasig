import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-successful',
  templateUrl: './change-successful.component.html',
  styleUrls: ['./change-successful.component.scss'],
})
export class ChangeSuccessfulComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }

}
