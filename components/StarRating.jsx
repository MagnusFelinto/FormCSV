import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StarRating = ({ rating, onStarPress }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onStarPress(i)}>
          <Icon
            name={i <= rating ? 'star' : 'star-border'}
            size={40}
            color={i <= rating ? '#FFD700' : '#D3D3D3'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View>
      <TouchableOpacity
        style={{backgroundColor: rating ? "purple":"gray" , flex: 1, alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center' }}
        onPress={() => onStarPress("Não conheço")} >
        <Text  style={{ marginLeft: 10, fontWeight: '600', color: 'white' }}> 
          NÃO CONHEÇO
        </Text>
        {/* <Text style={ respostas[index]== "SIM"? styles.labelSelect: styles.labelNotSelect}>SIM</Text> */}
      </TouchableOpacity>
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}> 
      {renderStars()}
      <Text style={{ marginLeft: 10, fontWeight: '600' }}>{rating == 'Não conheço' ? 'Não conheço' : rating ? rating +' estrelas' : ''}</Text>
    </View>
    </View>
  );
};

 

export default StarRating;
