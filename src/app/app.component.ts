import { Component, ViewChild } from "@angular/core";
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";
import { fader } from "./route-animations";
import { NotificationService } from "./services/notification.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fader],
})
export class AppComponent {
  title = "Post-Ups";
  @ViewChild(RouterOutlet) routerOutlet;
  showSecondaryNavBar = this.notifService.currentShowSecondaryNavBar;

  prepareRoute() {
    this.routerChange();
    return this.routerOutlet && this.routerOutlet.activatedRoute;
  }

  routerChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.showSecondaryNavBar = this.routerOutlet.component.requiredNavComponents.showSecondaryNavBar;
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
      }
    });
  }

  constructor(
    private router: Router,
    private notifService: NotificationService
  ) {}
}
