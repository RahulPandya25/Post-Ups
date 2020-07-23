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
  showSecondaryNavBar = this.notifService.currentShowSecondaryNavBar;
  showBackBtn = this.notifService.currentShowBackBtn;
  showSearchBtn = this.notifService.currentShowSearchBtn;

  tag;
  showSearchBar = false;
  isTagSearched = this.getCurrentTag() !== defaults.defaultTag;

  feed = defaults.feed;
  sorts = defaults.sorts;
  categories = defaults.categories;
  selectedCategory = defaults.defaultCategory;
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
      this.resetSortAndFilters();
      this.updateFeedComponent();
    }
  }

  resetSortAndFilters() {
    //update sort in view
    this.sorts.forEach((element) => {
      if (element.value == this.sorts[0].value) element.isActive = true;
      else element.isActive = false;
    });
    // update sort globally
    this.constService.changeSort(defaults.defaultSort);
    // update category in view
    this.selectedCategory = defaults.defaultCategory;
    // update category globally
    this.constService.changeCategory(defaults.defaultCategory);
  }

  sortFeed(value) {
    //update the sort in view
    this.sorts.forEach((element) => {
      if (element.value === value) element.isActive = true;
      else element.isActive = false;
    });

    // update feed logic
    this.constService.changeSort(value);
    this.updateFeedComponent();
  }

  changeCategory() {
    // update feed logic
    this.constService.changeCategory(this.selectedCategory);
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
    this.resetSortAndFilters();
  }

  constructor(
    private notifService: NotificationService,
    private constService: ConstantsService,
    private router: Router
  ) {
    this.notifService.clicktagEmitter.subscribe((tag) => {
      this.tagClickedOnPostScreen(tag);
    });
    this.notifService.toogleShowSecondaryNavBar.subscribe(() => {
      this.showSecondaryNavBar = !this.showSecondaryNavBar;
    });
    this.notifService.toogleShowBackBtn.subscribe(() => {
      this.showBackBtn = !this.showBackBtn;
    });
    this.notifService.toogleShowSearchBtn.subscribe(() => {
      this.showSearchBtn = !this.showSearchBtn;
    });
  }

  ngOnInit(): void {}
}
