import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

export const attemptedState = atom({
    key: 'attemptedState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });
  export const quizQuestions=atom({
      key:'quizQuestions',
      default:[]
  });

export const createdQuiz = atom({
  key:'createdQuiz',
  default:[]
})