import { PostService } from "./../services/post.service";
import { Component, OnInit } from "@angular/core";
import { ConstantsService } from "../services/constants.service";

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
        tag: this.currentTag,
        sort: this.currentSort,
        category: this.currentCatgeory,
      })
      .subscribe((response) => {
        this.posts = response;
        this.posts.forEach((element) => {
          let date = element.datePosted;
          element.datePosted = new Date(date);
        });
      });
  }

  updateFeed() {
    this.getFeed();
  }

  ngOnInit(): void {
    this.getFeed();
  }
}
