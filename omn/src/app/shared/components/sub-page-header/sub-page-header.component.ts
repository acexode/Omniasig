import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sub-page-header",
  templateUrl: "./sub-page-header.component.html",
  styleUrls: ["./sub-page-header.component.scss"],
})
export class SubPageHeaderComponent implements OnInit {
  @Input() pageTitle;
  @Input() leadingIcon = "arrow-back-outline";
  @Input() trailingIcon = "add-outline";

  constructor() {}

  ngOnInit() {}
}
