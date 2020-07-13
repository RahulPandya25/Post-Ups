import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../services/post.service";
import { ConstantsService } from "../services/constants.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  postId;
  post;
  comment = "";

  likeThisPost(postId) {
    console.log(postId);
    this.postService.likeThisPost(postId).subscribe((response) => {
      this.post = response;
      // updating post-date
      let date = this.post.datePosted;
      this.post.datePosted = new Date(date);
      // updating comment-date
      this.post.comments.forEach((element) => {
        let date = element.datePosted;
        element.datePosted = new Date(date);
      });
    });
  }

  sendComment(comment) {
    if (comment !== "")
      this.postService
        .postComment(this.postId, comment)
        .subscribe((response) => {
          this.comment = "";
          this.ngOnInit();
        });
  }

  searchThisTag(tag: String) {
    this.constService.changeTag(tag.toLowerCase());
    this.router.navigateByUrl("/");
  }
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private constService: ConstantsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.postId = params["postId"];
    });

    this.postService.getPostById(this.postId).subscribe((response) => {
      this.post = response;
      // updating post-date
      let date = this.post.datePosted;
      this.post.datePosted = new Date(date);
      // updating comment-date
      this.post.comments.forEach((element) => {
        let date = element.datePosted;
        element.datePosted = new Date(date);
      });
    });
  }
}
