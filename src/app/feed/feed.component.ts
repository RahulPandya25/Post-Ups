import { PostService } from "./../services/post.service";
import { Component, OnInit } from "@angular/core";
import { ConstantsService } from "../services/constants.service";
import defaults from "../../assets/defaults.json";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  posts;
  currentTag;
  currentSort;
  currentCatgeory;

  showSecondaryNavBar = true;
  showBackBtn = false;
  showSearchBtn = true;

  constructor(
    private postService: PostService,
    private constService: ConstantsService
  ) {}

  getFeed() {
    // getting values
    this.constService.currentTag.subscribe((tag) => (this.currentTag = tag));
    this.constService.currentCategory.subscribe(
      (cat) => (this.currentCatgeory = cat)
    );
    this.constService.currentSort.subscribe(
      (sort) => (this.currentSort = sort)
    );

    this.postService
      .getFeed({
        tag:
          defaults.defaultTag === this.currentTag ? undefined : this.currentTag,
        sort: this.currentSort,
        category:
          defaults.defaultCategory === this.currentCatgeory
            ? undefined
            : this.currentCatgeory,
      })
      .subscribe((response) => {
        this.posts = response;
        this.posts.forEach((element) => {
          let date = element.datePosted;
          element.datePosted = new Date(date);
        });
      });
  }

  ngOnInit(): void {
    this.getFeed();
  }
}
