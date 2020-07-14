import { Component, OnInit, Input } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-sub-page-header",
  templateUrl: "./sub-page-header.component.html",
  styleUrls: ["./sub-page-header.component.scss"],
})
export class SubPageHeaderComponent implements OnInit {
  @Input() pageTitle;
  @Input() backButton: boolean = true;
  @Input() trailingIcon = "add-outline";

  constructor(private _location: Location) {}

  ngOnInit() {}

  back() {
    this._location.back();
  }
}
