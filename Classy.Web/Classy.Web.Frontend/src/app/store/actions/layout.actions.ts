import { createAction, union, props } from '@ngrx/store';
import { Progress } from '@classy/store/models';

export const doNothing = createAction('[Layout] Empty action');

export const setProgress = createAction(
  '[Layout] Set progress',
  props<{ current: number, text: string }>()
);

export const startProgress = createAction(
  '[Layout] Start progress',
  props<{ progress: Progress }>()
);

export const updateCurrent = createAction(
  '[Layout] Update current',
  props<{ text: string }>()
);

export const updateProgress = createAction(
  '[Layout] Update progress'
  /* props<{ progress: Progress }>()*/
);

export const completeClassification = createAction(
  '[Layout] Complete classification',
  props<{ i: number }>()
);

export const endProgress = createAction('[Layout] End progress');


export const setCurrentFolderClass = createAction(
  '[Layout] Set current folder class',
  props<{ currentFolder: string }>()
);

export const removeCurrentFolderClass = createAction(
  '[Layout] Remove current folder class',
  props<{ currentFolder: null }>()
);

const all = union({
  doNothing,
  setProgress,
  startProgress,
  updateCurrent,
  updateProgress,
  completeClassification,
  endProgress,
  setCurrentFolderClass,
  removeCurrentFolderClass

});
export type LayoutActionsUnion = typeof all;
