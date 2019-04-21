type _Progress = null | {
  header: string;
  text: string;
  textComplete: string;
  current: number;
  max: number;
};

export type Progress = Partial<_Progress>;
