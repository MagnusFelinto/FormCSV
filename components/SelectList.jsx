import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { AntDesign } from '@expo/vector-icons'; 
const Select = ({ opcoes,opcaoSelecionada, setOpcaoSelecionada, indexDaPergunta }) => {
  const [opcoesVisiveis, setOpcoesVisiveis] = useState(false);
  const handleToggleOpcoes = () => {
    setOpcoesVisiveis(!opcoesVisiveis);
  };
  const handleSelectOption = (opcao) => {
    setOpcaoSelecionada(indexDaPergunta, opcao);
    setOpcoesVisiveis(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleOpcoes} style={{ borderWidth: 16, borderRadius: 8, paddingLeft:8 ,paddingRight:8 ,borderColor:"purple", backgroundColor:"purple"}}>
        <View style={{flex:1, flexDirection: 'row'}} >
          <Text style={{color: "white", fontWeight: '500'}} >{opcaoSelecionada || 'Selecione uma opção'} </Text> 
          <View style={{flex:1, alignItems:'flex-end'}}>
            { opcoesVisiveis ?
              <AntDesign name="up"   size={20} color="black" />
              :
              <AntDesign name="down" size={20} color="#D3D3D3" />
            }
          </View>
        </View>  
      </TouchableOpacity>
      {opcoesVisiveis && (
        <View style={styles.opcoesContainer}>
          {opcoes.map((opcao, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.opcaoBotao,
                opcao.value === opcaoSelecionada && styles.opcaoSelecionada,
              ]}
              onPress={() => handleSelectOption(opcao.value)}
            >
              <Text style={{fontWeight: '500'}}>{opcao.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}; 
const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  opcoesContainer: {
    marginTop: 3,
  },
  opcaoBotao: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#9048AB ",
    marginVertical: 2,
  },
  opcaoSelecionada: {
    backgroundColor: '#9048ab',
  },
});
export default Select;