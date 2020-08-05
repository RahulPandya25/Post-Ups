import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from "@angular/animations";

export const like = trigger("likeAnimation", [
  transition("start => end", [
    animate(
      ".75s",
      keyframes([
        style({ transform: "scale(1)", offset: 0 }),
        style({
          transform: "scale(1.2)",
          color: "yellow",
          offset: 0.25,
        }),
        style({
          transform: "scale(1.15)",
          color: "orange",
          offset: 0.5,
        }),
        style({
          transform: "scale(1.25)",
          color: "red",
          offset: 0.75,
        }),
        style({ transform: "scale(1)", offset: 1 }),
      ])
    ),
  ]),
  transition("end => start", []),
]);

export const fader = trigger("routeAnimations", [
  transition("* <=> *", [
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          opacity: 0,
          transform: "translateY(80px)",
        }),
      ],
      { optional: true }
    ),
    query(
      ":enter",
      [
        animate(`500ms ease-in-out`),
        style({ opacity: 1, transform: "translateY(0)" }),
      ],
      { optional: true }
    ),
  ]),
]);
