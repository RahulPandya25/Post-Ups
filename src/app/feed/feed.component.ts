import { PostService } from "./../services/post.service";
import { Component, OnInit } from "@angular/core";
import { ConstantsService } from "../services/constants.service";
import defaults from "../../assets/defaults.json";
import { NotificationService } from "../services/notification.service";
import { RouterLink, Router } from "@angular/router";
import { like } from "../route-animations";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
  animations: [like],
})
export class FeedComponent implements OnInit {
  isLoading;
  loadingMessage = "Creating your Feed!";
  posts = [];
  page;
  postsPerFetch = 3;
  isFetchingPost = false;
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
  justClicked = false;
  doubleClicked = false;

  constructor(
    private postService: PostService,
    private constService: ConstantsService,
    private notifService: NotificationService,
    private router: Router
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

    this.isFetchingPost = true;
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

          post.isBeingLiked = false;
          this.posts.push(post);
        });
        this.isLoading = false;
        let finalPostCount = this.posts.length;
        if (this.posts.length > 0 && beginningPostCount === finalPostCount)
          this.showEndOfPosts = true;

        this.isFetchingPost = false;
      });
  }

  likeThisPost(post) {
    post.isBeingLiked = true;
    this.postService.likeThisPost(post._id).subscribe((response) => {
      var temp = Object.assign(response);
      this.posts.forEach((element) => {
        if (element._id === post._id) {
          element.likes = temp.likes;
        }
      });
      post.isBeingLiked = false;
    });
  }

  // using intersection observer for pagination
  observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !this.isFetchingPost &&
          !this.showEndOfPosts
        ) {
          this.fetchMorePosts();
        }
      });
    },
    {
      rootMargin: "0px 0px 0px 0px",
      threshold: 1,
    }
  );

  detectTap(post) {
    if (this.justClicked === true) {
      this.doubleClicked = true;
      this.likeThisPost(post);
    } else {
      this.justClicked = true;
      setTimeout(() => {
        this.justClicked = false;
        if (this.doubleClicked === false) {
          this.router.navigate(["/post"], {
            queryParams: { postId: post._id },
          });
        }
        this.doubleClicked = false;
      }, 500);
    }
  }

  ngOnInit(): void {
    this.notifService.updateNavComponents(this.requiredNavComponents);
    this.page = {
      limit: this.postsPerFetch,
      skip: 0,
    };
    this.getFeed(this.page);
    this.observer.observe(document.querySelector(".observe"));
  }
}
