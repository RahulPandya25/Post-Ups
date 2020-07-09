import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  postId;
  post;
  comment = "";
  sendComment(comment) {
    this.postService.postComment(this.postId, comment).subscribe((response) => {
      this.ngOnInit();
    });
  }
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.postId = params["postId"];
    });

    this.postService.getPostById(this.postId).subscribe((response) => {
      this.post = response;
      let date = this.post.datePosted;
      this.post.datePosted = new Date(date);
    });
  }
}
