import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydb.db');

export const Form = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    useEffect(()=>{
        
    },[])
    const handleSaveData = () => {
      // Abre a transação SQL
      db.transaction(
        (tx) => {
          // Executa a consulta SQL para inserir dados
          tx.executeSql(
            'INSERT INTO users (name, age) VALUES (?, ?)',
            [name, age],
            (_, result) => {
              console.log('Dados salvos com sucesso!');
            },
            (_, error) => {
              console.error('Erro ao salvar dados:', error);
            }
          );
        },
        null,
        null
      );
    };
  
    return (
      <View>
        <Text>Nome:</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Digite seu nome"
        />
        <Text>Idade:</Text>
        <TextInput
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholder="Digite sua idade"
        />
        <Button title="Salvar" onPress={handleSaveData} />
      </View>
    );
  };
