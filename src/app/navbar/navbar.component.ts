import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ConstantsService } from "../services/constants.service";
import { Router } from "@angular/router";
import defaults from "../assets/defaults.json";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() showSecondaryNavBar: boolean;
  @Input() showBackBtn: boolean;
  @Input() showSearchBtn: boolean;
  @Output() updateFeed: EventEmitter<any> = new EventEmitter();

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
    this.constService.changeTag(tag.toLowerCase());
    this.updateFeedComponent();
  }

  searchTag(tag) {
    if (tag !== "") {
      this.isTagSearched = true;
      this.showSearchBar = false;
      // this is not the local var, updating global var
      this.tag = "";

      //update the tag in view
      this.feed.forEach((element) => {
        if (element.value !== defaults.defaultTag) element.isActive = true;
        else element.isActive = false;
      });

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
    this.updateFeed.emit();
  }

  getCurrentTag() {
    var cTag;
    this.constService.currentTag.subscribe((tag) => {
      cTag = tag;
    });
    return cTag;
  }

  tagClickedOnPostScreen() {
    //handle when someone clicks post tag
    console.log("tag");
  }

  constructor(private constService: ConstantsService, private router: Router) {}

  ngOnInit(): void {}
}
