// import * as FileSystem from 'expo-file-system';
// import * as IntentLauncher from 'expo-intent-launcher';

// export const openFile = async (filePath) => {
//   try {
//     const contentUri = await FileSystem.getContentUriAsync(filePath);

//     // Verificar se o aplicativo de gerenciamento de arquivos está instalado
//     const isSupported = await IntentLauncher.canOpenURL({ url: contentUri });

//     if (isSupported) {
//       // Abrir o aplicativo de gerenciamento de arquivos
//       await IntentLauncher.openURL(contentUri);
//     } else {
//       console.error('Aplicativo de gerenciamento de arquivos não encontrado.');
//     }
//   } catch (error) {
//     console.error('Erro ao abrir o arquivo:', error);
//   }
// };

// // Chamar a função para abrir o arquivo
// const filePath = `${FileSystem.documentDirectory}dados.csv`;
// openFile(filePath);
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
            size={30}
            color={i <= rating ? '#FFD700' : '#D3D3D3'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      {renderStars()}
      <Text style={{ marginLeft: 10 }}>{rating} estrelas</Text>
    </View>
  );
};

 

export default StarRating;
