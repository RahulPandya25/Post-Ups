import { Component, OnInit, Input } from "@angular/core";
import { ConstantsService } from "../services/constants.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() showSecondaryNavBar: boolean;
  @Input() showBackBtn: boolean;
  @Input() showSearchBtn: boolean;
  currentCategory = "all";
  tag;
  showSearchBar = false;

  feed = [
    { name: "All", value: "all", isActive: true, show: true },
    { name: "Search", value: "tag", isActive: false, show: true },
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
    this.constService.changeTag(tag.toLowerCase());
    console.log(`Feed tag: ${tag}`);
  }

  searchTag(tag) {
    if (tag !== "") {
      this.constService.changeTag(tag.toLowerCase());
      // this.router.navigateByUrl("/");
      console.log(`Search tag: ${tag}`);
    }
  }

  sortFeed(value) {
    console.log(`Sort: ${value}`);
  }

  changeCategory(e) {
    this.currentCategory = e.target.value;
    console.log(`Current Category: ${this.currentCategory}`);
  }

  constructor(private constService: ConstantsService, private router: Router) {}

  ngOnInit(): void {}
}
