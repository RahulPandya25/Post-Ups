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

  constructor(
    private postService: PostService,
    private constService: ConstantsService
  ) {}

  ngOnInit(): void {
    // getting currentTag
    this.constService.currentTag.subscribe((tag) => (this.currentTag = tag));

    if (this.currentTag === this.constService.DEFAULT_TAG) {
      this.postService.getFeed().subscribe((response) => {
        this.posts = response;
        this.posts.forEach((element) => {
          let date = element.datePosted;
          element.datePosted = new Date(date);
        });
      });
    } else {
      this.postService
        .filterThroughPosts(this.currentTag)
        .subscribe((response) => {
          this.posts = response;
          this.posts.forEach((element) => {
            let date = element.datePosted;
            element.datePosted = new Date(date);
          });
        });
    }
  }
}
