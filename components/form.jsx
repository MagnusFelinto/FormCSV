import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
 

export const Form = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const db = SQLite.openDatabase('myDatabase.db');
    const [dados, setDados] = useState(null);
    useEffect(()=>{  
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS dadosDaPesquisa (id INTEGER PRIMARY KEY AUTOINCREMENT, SEXO TEXT, PERFIL TEXT, ZONA TEXT, REGIAO  TEXT , orientacaoSexual TEXT, identifica TEXT, IDADE TEXT ,  EstadoCivil TEXT , estudou TEXT , NIVELDEESCOLARIDADE TEXT , rendaMensal TEXT , fonteRenda TEXT , moramCasaPessoal TEXT , rendaCasa  TEXT , auxilio  TEXT ,  QuantosFilhos TEXT ,  FilhosestudaEm   TEXT , ProblemaSaude  TEXT , moradia TEXT , religiao TEXT  , veiculos  TEXT , titulo   TEXT , VEICULODECOMUNICACAO , TELEVISAO TEXT, CELULAR TEXT, JORNAIS TEXT, RADIO TEXT,  discutir  TEXT , manifestacaopolitica  TEXT ,  campanhaEleitoralConvencer   TEXT ,  seuApoio  TEXT ,  faixasOuCartazes TEXT , pedirVoto  TEXT , escolhaCandidato TEXT , candidatoIdeal TEXT , caracteriticasCandidato  TEXT , Notas   TEXT , LULA TEXT,	 BOLSONARO TEXT, SIMONE  TEXT, CIRO  TEXT, FELIPI TEXT, CABO  TEXT,	 PADRE  TEXT,	   partido  TEXT ,  VOTOUGOVERNADOR  TEXT , votouPrefeito  TEXT , votariaPREFEITO  TEXT , DivanizeReleita  TEXT , ZezePrefeito TEXT , SaldanhaPrefeita TEXT , IzoaresPrefeito TEXT ,   votouVEREADOR  TEXT , avaliaVereador  TEXT , GestaoAtual  TEXT , senhorVotaria  TEXT ,  cestasbasicas TEXT , escola TEXT , tijolos TEXT , campoFutebol TEXT , coletivoBuscandoMelhorias  TEXT , confiancaPrefeita TEXT , representado TEXT , servicosPublicos  TEXT , coletalixo  TEXT , polícia  TEXT , limpezaRuas TEXT , manutencao TEXT , camelosBar TEXT , pracas TEXT ,	 escolas TEXT , saude1 TEXT , iluminacao TEXT ,	servicodeagua TEXT , servicodeEsgoto TEXT ,  politicaMunicipalInfluenciada TEXT , decisaoVoto TEXT ,  mudancaPrefeitura TEXT , contatoPolitico  TEXT  ,  problemaContato TEXT  ,  PROBLEMASDACIDADE TEXT , Desemprego Text, Saude Text, Educacao Text, Pobreza Text, Salario Text, Violencia Text, Corrupcao Text, Politica Text, Fome Text, Desigualdade	 Text, Transito Text, Enchentes Text, Favelas Text, Agua	 Text, Esgoto	 Text, Urbanismo	 Text, Estacionamento	 Text, Transporte Text, Infraestrutura	 Text, Lazer	 Text,  ideiaInovadora TEXT , comunidadeProximosAnos TEXT ,  PRINCIPALPROBLEMAREGIAO TEXT ,  mudancasprefeituraimplementasse TEXT , MENSAGEM TEXT , questionario TEXT , horarioDaColeta);',
          [], () => {
            console.log('Table created successfully!');
          },
          (txObj  , error) => console.log(error.message), 
          );
      });
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM dadosDaPesquisa;',[],
          (txObj, resultSet) => { setDados(resultSet.rows._array); console.log('Tabela seleciona successo!'); }, 
          (txObj  , error) => console.log(error.message), 
          );
      })
    }, [])
    const handleSaveData = () => {
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
    function mostrarDados(){
      return dados.map((data, index) =>{
        return (
          <View>
            <Text>
              {data?.id}
            </Text>
          </View>
        )
      })
    }
    return (
      <View>
        <Text>Nome:</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Digite seu nome"  />
        <Text>Idade:</Text>
        <TextInput
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholder="Digite sua idade" />
        <Button title="Salvar" onPress={handleSaveData} /> 
        <View>
          {mostrarDados}
        </View>
      </View>
    );
  };
