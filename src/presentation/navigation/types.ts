import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  BreedList: undefined;
  BreedDetails: { breed: string };
};

export type BreedListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BreedList'
>;
export type BreedDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BreedDetails'
>;
