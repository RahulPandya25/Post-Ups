import { PostService } from "./../services/post.service";
import { Component, OnInit } from "@angular/core";
import { ConstantsService } from "../services/constants.service";
import defaults from "../../assets/defaults.json";
import { NotificationService } from "../services/notification.service";

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
  requiredNavComponents = {
    showSecondaryNavBar: true,
    showBackBtn: false,
    showSearchBtn: true,
  };
  endOfPostLimit = 2;

  constructor(
    private postService: PostService,
    private constService: ConstantsService,
    private notifService: NotificationService
  ) {
    this.notifService.updateFeedEmitter.subscribe(() => {
      this.getFeed();
    });
  }

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
        this.posts.forEach((post) => {
          let date = post.datePosted;
          post.datePosted = new Date(date);
          if (post.category !== "text")
            if (post.category !== "audio")
              post.filesrc = this.postService.getFilesrc(post);
        });
      });

    console.log(this.posts);
  }
  likeThisPost(postId) {
    this.postService.likeThisPost(postId).subscribe((response) => {
      var temp = Object.assign(response);
      this.posts.forEach((post) => {
        if (post._id === postId) {
          post.likes = temp.likes;
        }
      });
    });
  }
  ngOnInit(): void {
    this.getFeed();
    this.notifService.updateNavComponents(this.requiredNavComponents);
  }
}
