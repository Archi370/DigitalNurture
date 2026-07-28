import { CanDeactivateFn } from '@angular/router';

export interface ComponentWithUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentWithUnsavedChanges> = (component) => {
  if (component && component.hasUnsavedChanges()) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
