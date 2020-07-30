import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../services/post.service";
import { ConstantsService } from "../services/constants.service";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  requiredNavComponents = {
    showSecondaryNavBar: false,
    showBackBtn: true,
    showSearchBtn: false,
  };

  postId;
  post;
  comment = "";

  likeThisPost(postId) {
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
          this.ngOnInit(false);
        });
  }

  searchThisTag(tag: string) {
    this.constService.changeTag(tag);
    this.notifService.clicktag(tag);
    this.router.navigateByUrl("/");
  }
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private constService: ConstantsService,
    private notifService: NotificationService
  ) {}

  ngOnInit(updateViewCount = true): void {
    this.notifService.updateNavComponents(this.requiredNavComponents);

    this.route.queryParams.subscribe((params) => {
      this.postId = params["postId"];
    });

    this.postService
      .getPostById(this.postId, updateViewCount)
      .subscribe((response) => {
        this.post = response;
        // updating post-date
        let date = this.post.datePosted;
        this.post.datePosted = new Date(date);
        // updating comment-date
        this.post.comments.forEach((element) => {
          let date = element.datePosted;
          element.datePosted = new Date(date);
        });

        this.post.filesrc = this.postService.getFilesrc(this.post);
        console.log(this.post);
      });
  }
}
