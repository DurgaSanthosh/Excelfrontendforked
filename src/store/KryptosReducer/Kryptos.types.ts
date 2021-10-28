
// reducer type
export type ListElm = { 
  pic?: string;
  name?: string;
  rank?: string;
  curr_level?: string;
  showRanklist?: boolean;
  profile_pic?: string;
};

export type Question = {
  question: string;
  number: number;
  level_file: string;
  image_level: boolean;
  hints: string[];
}

export type KryptosReducerType = {
  ranklist: ListElm[];
  question: Question;
}

// constants
export const SET_RANK_LIST = 'SET_RANK_LIST';
export const SET_KRYPTOS_QUESTION = 'SET_KRYPTOS_QUESTION';

// actions type
type SetRankList = {
  type: typeof SET_RANK_LIST;
  payload: ListElm[];
}

type SetKryptosQuestion = {
  type: typeof SET_KRYPTOS_QUESTION;
  payload: Question;
}


export type KryptosActionType = 
  | SetRankList
  | SetKryptosQuestion;