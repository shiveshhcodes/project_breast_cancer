export interface Goal {
  id: string;
  name: string;
  target: number;
  progress: number;
  dailyProgress: Record<string, boolean>;
  videoCount?: number;
  icon?: 'youtube' | 'brain' | 'briefcase' | 'target' | 'code' | 'book';
}

export interface GoalState {
  goals: Goal[];
}

export interface NewGoalFormData {
  name: string;
  icon: Goal['icon'];
}

export interface EditGoalFormData extends NewGoalFormData {
  id: string;
}