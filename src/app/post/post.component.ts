import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../services/post.service";
import { ConstantsService } from "../services/constants.service";
import { NotificationService } from "../services/notification.service";
import defaults from "../../assets/defaults.json";
import { DomSanitizer } from "@angular/platform-browser";
import { like } from "../route-animations";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
  animations: [like],
})
export class PostComponent implements OnInit {
  requiredNavComponents = {
    showSecondaryNavBar: false,
    showBackBtn: true,
    showSearchBtn: false,
  };

  isLoading;
  loadingMessage = "Fetching Post!";
  postId;
  post;
  comment = "";
  justClicked = false;
  doubleClicked = false;
  likePost = false;

  likeThisPost(postId) {
    this.likePost = true;
    this.postService.likeThisPost(postId).subscribe((response) => {
      var temp = Object.assign(response);
      if (this.post._id === postId) {
        this.post.likes = temp.likes;
      }
      this.likePost = false;
    });
  }

  detectTap(postId) {
    if (this.justClicked === true) {
      this.doubleClicked = true;
      this.likeThisPost(postId);
    } else {
      this.justClicked = true;
      setTimeout(() => {
        this.justClicked = false;
        this.doubleClicked = false;
      }, 500);
    }
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
    private notifService: NotificationService,
    private sanitizor: DomSanitizer
  ) {}

  getSrcUrl() {
    return this.sanitizor.bypassSecurityTrustUrl(
      this.postService.getFilesrc(this.post)
    );
  }

  ngOnInit(updateViewCount = true): void {
    this.isLoading = true;

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

        let catWithTextArea;
        defaults.categories.forEach((element) => {
          if (element.defaultForNewPost) {
            catWithTextArea = element.value;
          }
        });

        if (this.post.category !== catWithTextArea) {
          this.post.filesrc = this.postService.getFilesrc(this.post);
        }

        this.isLoading = false;
      });
  }
}
