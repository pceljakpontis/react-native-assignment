import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BreedService from '../../domain/infrastructure/services/BreedService';
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type BreedListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BreedList'
>;

const BreedList: React.FC = () => {
  const navigation = useNavigation<BreedListScreenNavigationProp>();
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await BreedService.getBreeds();
        setBreeds(data);
      } catch (error) {}
    };

    fetchBreeds();
  }, []);

  const renderBreedItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BreedDetails', { breed: item })}
      style={styles.flatListItem}
    >
      <View>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={breeds}
        keyExtractor={(item) => item}
        renderItem={renderBreedItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  flatListItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    width: 380,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default BreedList;
