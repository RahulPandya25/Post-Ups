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
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    console.log(ConstantsService.BASE_URL);
    this.postService.getFeed().subscribe((response) => {
      this.posts = response;
      this.posts.forEach((element) => {
        let date = element.datePosted;
        element.datePosted = new Date(date);
      });
      console.log(this.posts);
    });
  }
}
