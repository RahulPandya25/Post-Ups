import { Component, OnInit } from "@angular/core";
import { ConstantsService } from "../services/constants.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(ConstantsService.BASE_URL);
  }
}
