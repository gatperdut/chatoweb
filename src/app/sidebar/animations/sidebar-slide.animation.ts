import { animate, AnimationStateMetadata, AnimationTransitionMetadata, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

const openState: AnimationStateMetadata = state(
  'open',
  style(
    {
      left: '0px',
      opacity: 1,
      boxShadow: '12px 0 15px -4px rgba(31, 73, 125, 0.8)'
    }
  )
);

const closedState: AnimationStateMetadata = state(
  'closed',
  style(
    {
      left: '-350px',
      opacity: 0,
      boxShadow: 'none'
    }
  )
);

const toggleTransition: AnimationTransitionMetadata = transition(
  'open <=> closed', [
    animate('0.5s')
  ]
);

export const sidebarSlide: AnimationTriggerMetadata = trigger(
  'toggle',
  [
    openState,
    closedState,
    toggleTransition
  ]
);
