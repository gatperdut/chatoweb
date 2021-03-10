import { animate, AnimationTriggerMetadata, style, transition, trigger } from "@angular/animations";

export const fadeInAnimation: AnimationTriggerMetadata = trigger(
  'fadeInAnimation',
  [
    transition(
      ':enter',
      [
        style(
          {
            opacity: 0
          }
        ),
        animate(
          '1s ease-out',
          style(
            {
              opacity: 1
            }
          )
        )
      ]
    )
  ]
);
