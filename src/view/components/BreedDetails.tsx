import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import BreedService from '../../domain/infrastructure/services/BreedService';
import { RootStackParamList } from '../navigation/types';

type BreedDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'BreedDetails'
>;

type BreedDetailsScreenProps = {
  route: BreedDetailsScreenRouteProp;
};

const BreedDetails: React.FC<BreedDetailsScreenProps> = ({ route }) => {
  const { breed } = route.params;
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreedImages = async () => {
      try {
        const response = await BreedService.getBreedImages(breed);

        if (Array.isArray(response)) {
          setImages(response);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error(`Error fetching images for ${breed}:`, error);
      }
    };

    fetchBreedImages();
  }, [breed]);

  const renderImageItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
  );

  return (
    <View style={styles.flatListContainer}>
      <Text style={styles.flatListTitle}>{breed}</Text>
      {images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item) => item}
          renderItem={renderImageItem}
          contentContainerStyle={styles.flatListImages}
        />
      ) : (
        <Text>No images available for {breed}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  flatListTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  flatListImages: {
    gap: 30,
  },
});

export default BreedDetails;
