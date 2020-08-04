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
  isLoading;
  loadingMessage = "Creating your Feed!";
  posts = [];
  page;
  postsPerFetch = 3;
  showEndOfPosts = false;
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
      // bootstraping again for same page to refresh
      this.page = {
        limit: this.postsPerFetch,
        skip: 0,
      };
      this.posts = [];
      this.loadingMessage = "Creating your Feed!";
      this.isLoading = true;
      this.showEndOfPosts = false;

      // update feed
      this.getFeed(this.page);
    });
  }

  fetchMorePosts() {
    this.page.skip += this.page.limit;
    this.loadingMessage = "";
    this.isLoading = true;
    this.getFeed(this.page);
  }

  getFeed(page) {
    if (this.posts && this.posts.length === 0) this.isLoading = true;

    // getting values
    this.constService.currentTag.subscribe((tag) => (this.currentTag = tag));
    this.constService.currentCategory.subscribe(
      (cat) => (this.currentCatgeory = cat)
    );
    this.constService.currentSort.subscribe(
      (sort) => (this.currentSort = sort)
    );

    this.postService
      .getFeed(
        {
          tag:
            defaults.defaultTag === this.currentTag
              ? undefined
              : this.currentTag,
          sort: this.currentSort,
          category:
            defaults.defaultCategory === this.currentCatgeory
              ? undefined
              : this.currentCatgeory,
        },
        page
      )
      .subscribe((response: any) => {
        let beginningPostCount = this.posts.length;
        response.forEach((post) => {
          let date = post.datePosted;
          post.datePosted = new Date(date);
          if (post.category !== "text")
            if (post.category !== "audio")
              post.filesrc = this.postService.getFilesrc(post);
          this.posts.push(post);
        });
        this.isLoading = false;
        let finalPostCount = this.posts.length;
        if (beginningPostCount === finalPostCount) this.showEndOfPosts = true;
      });
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
    this.page = {
      limit: this.postsPerFetch,
      skip: 0,
    };
    this.getFeed(this.page);
    this.notifService.updateNavComponents(this.requiredNavComponents);
  }
}
