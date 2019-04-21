type _Progress = null | {
  header: string;
  text: string;
  current: number;
  max: number;
};

export type Progress = Partial<_Progress>;
