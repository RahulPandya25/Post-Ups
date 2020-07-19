import { Component, ViewChild } from "@angular/core";
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";
import { fader } from "./route-animations";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fader],
})
export class AppComponent {
  title = "Post-Ups";

  @ViewChild(RouterOutlet) routerOutlet;
  showSecondaryNavBar = true;
  showSearchBtn = true;
  showBackBtn = false;

  prepareRoute(outlet: RouterOutlet) {
    this.updateNavbar();
    return outlet && outlet.activatedRoute;
  }

  updateNavbar() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.showSecondaryNavBar = this.routerOutlet.component.showSecondaryNavBar;
        this.showSearchBtn = this.routerOutlet.component.showSearchBtn;
        this.showBackBtn = this.routerOutlet.component.showBackBtn;
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
      }
    });
  }

  constructor(private router: Router) {
    this.updateNavbar();
  }
}
