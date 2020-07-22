import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ConstantsService } from "../services/constants.service";
import { Router } from "@angular/router";
import defaults from "../../assets/defaults.json";
import { NotificationService } from "../services/notification.service";

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
  isTagSearched = this.getCurrentTag() !== defaults.defaultTag;

  feed = defaults.feed;
  sorts = defaults.sorts;
  categories = defaults.categories;
  defaultTagForViewComparision = defaults.defaultTag;

  refreshFeed(tag) {
    //update the tag in view
    this.feed.forEach((element) => {
      if (element.value === tag) element.isActive = true;
      else element.isActive = false;
    });

    // update feed logic
    this.constService.changeTag(tag);
    this.updateFeedComponent();
  }

  searchTag(tag) {
    if (tag && tag !== "") {
      this.isTagSearched = true;
      this.showSearchBar = false;
      // this is not the local var, updating global var
      this.tag = "";

      //update the tag in view and update var
      this.feed.forEach((element) => {
        if (element.value !== defaults.defaultTag) element.isActive = true;
        else element.isActive = false;

        if (element.isCustom) {
          element.name = tag;
          element.value = tag;
        }
      });

      // update feed logic
      this.constService.changeTag(tag);

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
    this.notifService.updateFeed();
  }

  getCurrentTag() {
    var cTag;
    this.constService.currentTag.subscribe((tag) => {
      cTag = tag;
    });
    return cTag;
  }

  tagClickedOnPostScreen(tag) {
    //handle when someone clicks post tag
    this.isTagSearched = true;
    //update the tag in view and update var
    this.feed.forEach((element) => {
      if (element.value !== defaults.defaultTag) element.isActive = true;
      else element.isActive = false;

      if (element.isCustom) {
        element.name = tag;
        element.value = tag;
      }
    });
  }

  constructor(
    private notifService: NotificationService,
    private constService: ConstantsService,
    private router: Router
  ) {
    this.notifService.tagClickOnPostComponent.subscribe((tag) => {
      this.tagClickedOnPostScreen(tag);
    });
  }

  ngOnInit(): void {}
}
