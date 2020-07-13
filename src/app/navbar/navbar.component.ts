import { Component, OnInit, Input } from "@angular/core";
import { ConstantsService } from "../services/constants.service";
import { Router } from "@angular/router";
import { element } from "protractor";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() showSecondaryNavBar: boolean;
  @Input() showBackBtn: boolean;
  @Input() showSearchBtn: boolean;

  tag;
  showSearchBar = false;
  isTagSearched = false;

  feed = [
    { name: "All Posts", value: "all", isActive: false, show: true },
    { name: "Tag", value: "", isActive: true, show: true, isCustom: true },
  ];
  sorts = [
    {
      name: "Recently Posted",
      value: "recentlyPosted",
      isActive: true,
      show: true,
    },
    {
      name: "Most Liked",
      value: "mostLiked",
      isActive: false,
      show: true,
    },
    {
      name: "Most Viewed",
      value: "mostViewed",
      isActive: false,
      show: true,
    },
    {
      name: "Most Commented",
      value: "mostCommented",
      isActive: false,
      show: true,
    },
  ];
  categories = [
    {
      value: "all",
      name: "All",
      defaultSelected: true,
    },
    {
      value: "text",
      name: "Texts",
      defaultSelected: false,
    },
    {
      value: "image",
      name: "Images",
      defaultSelected: false,
    },
    {
      value: "video",
      name: "Videos",
      defaultSelected: false,
    },
    {
      value: "audio",
      name: "Audios",
      defaultSelected: false,
    },
    {
      value: "document",
      name: "Documents",
      defaultSelected: false,
    },
  ];

  refreshFeed(tag) {
    //update the tag in view
    this.feed.forEach((element) => {
      if (element.value === tag) element.isActive = true;
      else element.isActive = false;
    });

    // update feed logic
    this.constService.changeTag(tag.toLowerCase());
    this.updateFeedComponent();
  }

  searchTag(tag) {
    if (tag !== "") {
      this.isTagSearched = true;
      this.feed.forEach((element) => {
        if (element.isCustom) {
          element.name = tag;
          element.value = tag.toLowerCase();
        }
      });

      // update feed logic
      this.constService.changeTag(tag.toLowerCase());
      this.updateFeedComponent();
    }
  }

  sortFeed(value) {
    //update the tag in view
    this.sorts.forEach((element) => {
      if (element.value === value) element.isActive = true;
      else element.isActive = false;
    });

    // update feed logic
    this.constService.changeSort(value);
    this.updateFeedComponent();
  }

  changeCategory(e) {
    // update feed logic
    this.constService.changeCategory(e.target.value);
    this.updateFeedComponent();
  }

  updateFeedComponent() {
    console.log("update");
  }

  constructor(private constService: ConstantsService, private router: Router) {}

  ngOnInit(): void {}
}
