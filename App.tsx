
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { useEffect, useRef, useState } from 'react';
import { TextInput, Button } from 'react-native-paper'
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { Feather, Entypo } from '@expo/vector-icons';
import * as Papa from 'papaparse';
import StarRating from './components/StarRating.jsx'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form" 

export default function App() {
  const nomeArquivo = 'baraunas.csv'
  const key = 'testefff'
  const scrollViewRef = useRef();
  const [nomeDoAplicador, setNomeDoAplicador] = useState('');
  const [nome, setNome] = useState('');
  const [aplicadorExistente, setAplicadorExistente] = useState(false);
  const [destaque, setDestaque] = useState(false);
  const [avaliacaoGeilson, setAvaliacaoGeilson] = useState('');
  const [avaliacaoLucia, setAvaliacaoLucia] = useState('');
  const [avaliacaoZeze, setAvaliacaoZeze] = useState('');
  const [avaliacaoVereadorDestacado, setAvaliacaoVereadorDestacado] = useState('');
  const [nomeVereadorDestacado, setNomeVereadorDestacado] = useState('');
  const [vereadorFeedback, setVereadorFeedback] = useState('');
  const [sexo, setSexo] = useState('');
  const [zona, setzona] = useState("");
  const [idade, setIdade] = useState('');
  const [faixaRenda, setFaixaRenda] = useState('');
  const [origemRenda, setOrigemRenda] = useState('');
  const [nivelEscolar, setNivelEscolar] = useState('');
  const [quantPessoa, setQuantPessoa] = useState('');
  const [moradia, setmoradia] = useState('');
  const [casaVeiculo, setCasaVeiculo] = useState('');
  const [perfilEntrevistado, setPerfilEntrevistado] = useState('');
  const [comunicaoVeiculo, setComunicaoVeiculo] = useState('')
  const [discutirPolitica, setDiscutirPolitica] = useState('')
  const [participouManif, setParticipouManif] = useState('')
  const [escolhaCandidato, setEscolhaCandidato] = useState('')
  const [deficienteServico, setDeficienteServico] = useState('')
  const [cadidatoprioridade, setCadidatoprioridade] = useState('')
  const [bomCandidatoCaracteristica, setBomCandidatoCaracteristica] = useState('')
  const [votoPresidente, setVotoPresidente] = useState('')
  const [votoGovernador, setVotoGovernador] = useState('')
  const [votoPrefeito, setVotoPrefeito] = useState('')
  const [avalicaoAtendimento, setAvalicaoAtendimento] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [municipalPolitica, setMunicipalPolitica] = useState('')
  const [liderancasPolítica, setLiderancasPolítica] = useState('')
  const [representadoPolitico, setRepresentadoPolitico] = useState('')
  const [municipalAdmin, setMunicipalAdmin] = useState('')
  const [politicainflencia, setPoliticainflencia] = useState('')
  const [decisaoInfluencia, setDecisaoInfluencia] = useState('')
  const [prefeituraMudanca, setPrefeituraMudanca] = useState('')
  const [mensagemPolitico, setMensagemPolitico] = useState('');
  const [mudanca, setMudanca] = useState('');
  const [problemaRegiao, setProblemaRegiao] = useState('');
  const [comunidadeFuturo, setComunidadeFuturo] = useState('');
  const [ideiaInovadora, setIdeiaInovadora] = useState('');
  const [problemaCidade, setProblemaCidade] = useState('');
  const [regiao, setRegiao] = useState('');
  const [moradiaQuantPessoa, setMoradiaQuantPessoa] = useState('');
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm(); 
  const scrollToBottom = () => {
    scrollViewRef.current.scrollTo(0, 0, { animated: true });
  };
  const handleSaveData = () => {
    scrollToBottom()
    setCasaVeiculo(casaVeiculo.toString().replace(',', '|'))
    setEscolhaCandidato(escolhaCandidato.toString().replace(',', '|'))
    setDeficienteServico(deficienteServico.toString().replace(',', '|'))
    setBomCandidatoCaracteristica(bomCandidatoCaracteristica.toString().replace(',', '|'))
    const opcoes = {
      timeZone: 'America/Sao_Paulo', // Fuso horário do Brasil
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const dataAtual = new Date();
    const op = {
      timeZone: 'America/Sao_Paulo',  
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    
    const dataHoraFormatada = dataAtual.toLocaleString('pt-BR', op); 
    let newData = [
      zona,
      regiao,
      sexo,
      idade,
      faixaRenda,
      origemRenda,
      nivelEscolar,
      quantPessoa,
      moradia, // 9
      moradiaQuantPessoa, // 9.1
      casaVeiculo,
      perfilEntrevistado,
      comunicaoVeiculo,
      discutirPolitica,
      participouManif,
      escolhaCandidato,
      deficienteServico,
      cadidatoprioridade,
      bomCandidatoCaracteristica,
      votoPresidente,
      votoGovernador,
      votoPrefeito, //20
      avaliacaoGeilson,//20.1
      avaliacaoLucia,//20.2
      avaliacaoZeze, //20.3
      nomeVereadorDestacado,
      vereadorFeedback,
      avaliacaoVereadorDestacado, //20.4
      avalicaoAtendimento,
      prioridade,
      municipalPolitica,
      liderancasPolítica,
      representadoPolitico,
      municipalAdmin,
      politicainflencia,
      decisaoInfluencia,
      prefeituraMudanca,
      problemaCidade,
      ideiaInovadora,
      comunidadeFuturo,
      problemaRegiao,
      mudanca,
      mensagemPolitico,
      dataHoraFormatada      //Data e hora
    ];
    saveDataToCSV(newData);
    setzona('')
    setRegiao('')
    setSexo('')
    setIdade('')
    setFaixaRenda('')
    setOrigemRenda('')
    setNivelEscolar('')
    setQuantPessoa('')
    setmoradia('')
    setCasaVeiculo('')
    setPerfilEntrevistado('')
    setComunicaoVeiculo('')
    setDiscutirPolitica('')
    setParticipouManif('')
    setEscolhaCandidato('')
    setDeficienteServico('')
    setCadidatoprioridade('')
    setBomCandidatoCaracteristica('')
    setVotoPresidente('')
    setVotoGovernador('')
    setVotoPrefeito('')
    setAvalicaoAtendimento('')
    setPrioridade('')
    setMunicipalPolitica('')
    setLiderancasPolítica('')
    setRepresentadoPolitico('')
    setMunicipalAdmin('')
    setPoliticainflencia('')
    setDecisaoInfluencia('')
    setPrefeituraMudanca('')
    setProblemaCidade('')
    setIdeiaInovadora('')
    setComunidadeFuturo('')
    setProblemaRegiao('')
    setMudanca('')
    setMensagemPolitico('')
    setMoradiaQuantPessoa('')
    setAvaliacaoZeze('')
    setAvaliacaoGeilson('')
    setAvaliacaoLucia('')
    setNomeVereadorDestacado('')
    setVereadorFeedback('')
    setAvaliacaoVereadorDestacado('') 
    reset();  
    alert('Dados salvos com sucesso!');
  };
  useEffect(() => {
    const carregarVariavelLocal = async () => {
      try {
        const valorSalvo = await AsyncStorage.getItem(key);
        if (valorSalvo !== null) {
          setNomeDoAplicador(valorSalvo);
          setAplicadorExistente(true)
        }
        else {
          setNomeDoAplicador('')
        }
      } catch (error) {
        console.error('Erro ao carregar variável local:', error);
      }
    };
    carregarVariavelLocal()
  }, [nomeDoAplicador])
  const colunasPesquisa = [
    '1 - ZONA',
    '2 - REGIÃO',
    '3 - SEXO',
    '4 - IDADE',
    '5 - FAIXA DE RENDA',
    '6 - Qual é a origem da sua renda principal?',
    '7 - NIVEL DE ESCOLARIDADE',
    '8 - Quantas pessoas moram contigo na sua casa?',
    '9 - Sua moradia é:',
    '9.1 - Quantas pessoas moram contigo na mesma casa? (preencher com número)',
    '10 - Na sua casa qual tipo de veiculo existe?(selecione  as opções que existir em ordem)',
    '11 - PERFIL DO ENTREVISTADO ',
    '12 - QUAL VEICULO DE COMUNICAÇÃO VOCÊ MAIS ULTILIZA PARA SE INFORMAR?',
    '13 - Você costuma discutir política com amigos/família/colegas?',
    '14 - Você já participou de alguma manifestação política? Seja participação em carreata, ou qualquer coisa do gênero',
    '15 - Quais questões são mais importantes para você na escolha de um candidato? (Escolha as três mais importantes)',
    '15.1 - Em relação aos serviços públicos oferecidos na sua região, quais você considera mais deficientes? (Escolha as três mais importantes)',
    '16 - Qual dessas questões você acredita que seu candidato ideal deveria priorizar?',
    '17 - Na sua opinião, quais características um bom candidato deve ter? (Escolha até três opções)',
    '18 - ENTRE OS CANDIDATOS ABAIXO QUEM VOCÊ VOTOU NA ULTIMA ELEIÇÃO PARA PRESIDENTE?',
    '19 - ENTRE OS CANDIDATOS ABAIXO QUEM VOCÊ VOTOU NA ULTIMA ELEIÇÃO PARA GOVERNADOR?',
    '20 - Se a eleição fosse hoje, em quem você votaria para PREFEITO?',
    '20.1 - Como está a avaliação dos vereadores? Geilson Oliveira (de 1 até 5)',
    '20.2 - Como está a avaliação dos vereadores? Zezé da Agrícola (de 1 até 5)',
    '20.3 - Como está a avaliação dos vereadores? Lúcia Nascimento  (de 1 até 5)',
    '20.4.1 - Como está a avaliação dos vereadores? Nome',
    '20.4.2 - Como está a avaliação dos vereadores? Feedback',
    '20.4.3 - Como está a avaliação dos vereadores? Avaliacao',
    '21 - Como você avalia a atuação do governo atual em relação ao atendimento das necessidades da população?',
    '22 - Na sua opinião, quais deveriam ser as prioridades de um representante político?',
    '23 - Atualmente, vejo a política municipal como:',
    '24 - Minha confiança nas lideranças políticas municipais é:',
    '25 - Eu me sinto representado pelos políticos locais:',
    '26 - A situação atual da administração municipal é',
    '27 - Minha visão sobre a política municipal é influenciada por:',
    '28 - O que mais influencia sua decisão de voto?',
    '29 - Você acha que deveria existir uma mudança na prefeitura da cidade?',
    '30 - QUAL O PRINCIPAL PROBLEMA DA CIDADE DE BARÚNA NA SUA OPNIÃO?',
    '31 - Representando sua comunidade/ região, você teria alguma ideia inovadora ou sugestão criativa que acredita que poderia melhorar Baraúna e que gostaria que a próxima gestão implementasse na sua comunidade ou região?',
    '32 - Como você imagina nossa comunidade nos próximos anos? O que você gostaria de ver mudado ou melhorado?',
    '33 - QUAL O PRINCIPAL PROBLEMA DA SUA REGIÃO SITIO/BAIRRO NA SUA OPNIÃO?',
    '34 - Quais ações ou mudanças você gostaria que a prefeitura implementasse em Baraúna para melhorar a qualidade de vida na cidade?',
    '35 - MANDE UMA MENSAGEM PARA OS POLITICOS DA CIDADE DE BARAÚNA',
    'Data e hora da coleta',
  ]
  const zonas = [
    { key: 'Norte', value: 'Norte', },
    { key: 'Sul', value: 'Sul' },
    { key: 'Leste', value: 'Leste' },
    { key: 'Oeste', value: 'Oeste', },
    { key: 'Cidade', value: 'Cidade' },
  ]
  const regioes = [
    { key: 'CIDADE', value: 'CIDADE', },
    { key: 'Campestre', value: 'Campestre' },
    { key: 'Juremal', value: 'Juremal' },
    { key: 'Primavera', value: 'Primavera' },
    { key: 'Vertentes', value: 'Vertentes' },
    { key: 'Angicos', value: 'Angicos' },
    { key: 'Aroeira Grande', value: 'Aroeira Grande' },
    { key: 'Florêncio', value: 'Florêncio' },
    { key: 'PA Pico Estreito', value: 'PA Pico Estreito' },
    { key: 'PA Tiradentes', value: 'PA Tiradentes' },
    { key: 'PA Vitória', value: 'PA Vitória' },
    { key: 'Santa Luzia', value: 'Santa Luzia' },
    { key: 'Santa Maria', value: 'Santa Maria' },
    { key: 'Taioba', value: 'Taioba' },
    { key: 'Toca da Raposa (SITIO)', value: 'Toca da Raposa (SITIO)' },
    { key: 'Vila Nova I', value: 'Vila Nova I' },
    { key: 'Vila Nova II', value: 'Vila Nova II' },
    { key: 'Vila Nova III', value: 'Vila Nova III' },
    { key: 'Córrego de Pedra', value: 'Córrego de Pedra' },
    { key: 'Formigueiro', value: 'Formigueiro' },
    { key: 'Lajedo de Ouro', value: 'Lajedo de Ouro' },
    { key: 'Lajedo Mel', value: 'Lajedo Mel' },
    { key: 'Mato Alto', value: 'Mato Alto' },
    { key: 'Maxixe', value: 'Maxixe' },
    { key: 'Sumidouro', value: 'Sumidouro' },
    { key: 'Velame I', value: 'Velame I' },
    { key: 'Velame II', value: 'Velame II' },
    { key: 'Mata Burro', value: 'Mata Burro' },
    { key: 'PA Caatingueira', value: 'PA Caatingueira' },
    { key: 'Baixa Branca', value: 'Baixa Branca' },
    { key: 'Banco da Terra', value: 'Banco da Terra' },
    { key: 'Boa Água', value: 'Boa Água' },
    { key: 'Boa Sorte', value: 'Boa Sorte' },
    { key: 'Canaã', value: 'Canaã' },
    { key: 'KM.31', value: 'KM.31' },
    { key: 'Lajedo do Sebo', value: 'Lajedo do Sebo' },
    { key: 'PA Bom Sucesso dos Militares', value: 'PA Bom Sucesso dos Militares' },
    { key: 'PA Fazenda Poço Baraúna (Poco I)', value: 'PA Fazenda Poço Baraúna (Poco I)' },
    { key: 'PA Formosa', value: 'PA Formosa' },
    { key: 'PA Olho D’água da Escada', value: 'PA Olho D’água da Escada' },
    { key: 'PA Ouro Verde', value: 'PA Ouro Verde' },
    { key: 'PA Poço Novo II', value: 'PA Poço Novo II' },
    { key: 'PA Santa Clara', value: 'PA Santa Clara' },
    { key: 'Rancho do', value: 'Rancho do' },
    { key: 'Recreio', value: 'Recreio' },
    { key: 'Veneza', value: 'Veneza' },
  ]
  const sexos = [
    { key: 'Masculino', value: 'Masculino', },
    { key: 'Feminino', value: 'Feminino', },
    { key: 'Outro', value: 'Outro', },
  ]
  const faixaRendas = [
    { key: 'NÃO TENHO RENDA', value: 'NÃO TENHO RENDA', },
    { key: 'MENOS DE 1 SALÁRIO', value: 'MENOS DE 1 SALÁRIO', },
    { key: 'ENTRE 1 ATÉ 2 SALÁRIOS', value: 'ENTRE 1 ATÉ 2 SALÁRIOS', },
    { key: 'DE  2 ATÉ 3 SALÁRIOS', value: 'DE  2 ATÉ 3 SALÁRIOS', },
    { key: 'DE  3 ATÉ 5 SALÁRIOS', value: 'DE  3 ATÉ 5 SALÁRIOS', },
    { key: 'MAIS DE 10 SALÁRIOS', value: 'MAIS DE 10 SALÁRIOS', },
    { key: 'PREFIRO NÃO DECLARAR', value: 'PREFIRO NÃO DECLARAR', },
  ]
  const origemRendas = [
    { key: 'Desemprego', value: 'Desemprego', },
    { key: 'Aposentadoria', value: 'Aposentadoria', },
    { key: 'Agricultor', value: 'Agricultor', },
    { key: 'Auxílio governamental', value: 'Auxílio governamental', },
    { key: 'Comerciante', value: 'Comerciante', },
    { key: 'Trabalho com carteira assinada (CLT)', value: 'Trabalho com carteira assinada (CLT)', },
    { key: 'Trabalho autônomo', value: 'Trabalho autônomo', },
    { key: 'Servidor Público', value: 'Servidor Público', },
    { key: 'Bolsa de Estudos', value: 'Bolsa de Estudos', },
    { key: 'Outra', value: 'Outra', },
  ]
  const nivelEscolaridades = [
    { key: 'ANALFABETO', value: 'ANALFABETO', },
    { key: 'ENSINO FUNDAMENTAL I', value: 'ENSINO FUNDAMENTAL I', },
    { key: 'ENSINO FUNDAMENTAL II', value: 'ENSINO FUNDAMENTAL II', },
    { key: 'ENSINO MÉDIO INCOMPLETO', value: 'ENSINO MÉDIO INCOMPLETO', },
    { key: 'ENSINO MÉDIO COMPLETO', value: 'ENSINO MÉDIO COMPLETO', },
    { key: 'ENSINO SUPERIOR INCOMPLETO', value: 'ENSINO SUPERIOR INCOMPLETO', },
    { key: 'ENSINO SUPERIOR COMPLETO', value: 'ENSINO SUPERIOR COMPLETO', },
    { key: 'PÓS GRADUAÇÃO', value: 'PÓS GRADUAÇÃO', },
    { key: 'DOUTORADO', value: 'DOUTORADO', },
  ]
  const quantPessoas = [
    { key: 'Moro sozinho', value: 'Moro sozinho', },
    { key: '2 pessoas na casa', value: '2 pessoas na casa', },
    { key: '3 pessoas na casa', value: '3 pessoas na casa', },
    { key: '4 pessoas na casa', value: '4 pessoas na casa', },
    { key: '5 pessoas na casa', value: '5 pessoas na casa', },
    { key: 'mais de 5 pessoas', value: 'mais de 5 pessoas', },
  ]
  const moradias = [
    { key: 'casa própria', value: 'casa própria', },
    { key: 'aluguel', value: 'aluguel', },
    { key: 'mora de favor', value: 'mora de favor', },
  ]
  const casaVeiculos = [
    { key: 'Não temos transporte', value: 'Não temos transporte', },
    { key: 'carro', value: 'carro', },
    { key: 'moto', value: 'moto', },
    { key: 'bicicleta', value: 'bicicleta', },
    { key: 'Carroça', value: 'Carroça', },
    { key: 'veiculo de trabalho (caminhão, trator e afim)', value: 'veiculo de trabalho (caminhão, trator e afim)', },
    { key: 'Outra', value: 'Outra', },
  ]
  const perfilEntrevistados = [
    { key: 'ESTUDANTE DO ENSINO MÉDIO', value: 'ESTUDANTE DO ENSINO MÉDIO', },
    { key: 'COMERCIANTE', value: 'COMERCIANTE', },
    { key: 'UNIVERSITARIO', value: 'UNIVERSITARIO', },
    { key: 'COMUNIDADE GERAL', value: 'COMUNIDADE GERAL', },
    { key: 'AGRICULTOR', value: 'AGRICULTOR', },
    { key: 'SERVIDOR PÚBLICO', value: 'SERVIDOR PÚBLICO', },
  ]
  const PrefeituraMudancas = [
    { key: 'Sim', value: 'Sim', },
    { key: 'Não', value: 'Não', },
  ]
  const decisaoInfluencias = [
    { key: 'Propostas de campanha', value: 'Propostas de campanha', },
    { key: 'Histórico do candidato', value: 'Histórico do candidato', },
    { key: 'Ideologia política', value: 'Ideologia política', },
    { key: 'Debates eleitorais', value: 'Debates eleitorais', },
    { key: 'Amizade com candidato', value: 'Amizade com candidato', },
    { key: 'Amizade com as pessoas', value: 'Amizade com as pessoas', },
    { key: 'Uma ajuda com algum favor', value: 'Uma ajuda com algum favor', },
    { key: 'Escolho na hora mesmo', value: 'Escolho na hora mesmo', },
    { key: 'Outra', value: 'Outra', },

  ]
  const politicainflencias = [
    { key: 'Resultados e projetos realizados pela gestão. (Sentimento: Aprovação, Confiança)', value: 'Resultados e projetos realizados pela gestão. (Sentimento: Aprovação, Confiança)', },
    { key: 'Escândalos de corrupção ou má gestão. (Sentimento: Desconfiança, Desilusão)', value: 'Escândalos de corrupção ou má gestão. (Sentimento: Desconfiança, Desilusão)', },
    { key: 'Falta de transparência e comunicação por parte dos políticos. (Sentimento: Descontentamento, Desconfiança)', value: 'Falta de transparência e comunicação por parte dos políticos. (Sentimento: Descontentamento, Desconfiança)', },
  ]
  const MunicipalAdmins = [
    { key: 'Satisfatória, sinto que a cidade está progredindo bem. (Sentimento: Satisfação, Positividade)', value: 'Satisfatória, sinto que a cidade está progredindo bem. (Sentimento: Satisfação, Positividade)', },
    { key: 'Tolerável, mas poderia ser melhorada em vários aspectos. (Sentimento: Aceitação, Ambivalência)', value: 'Tolerável, mas poderia ser melhorada em vários aspectos. (Sentimento: Aceitação, Ambivalência)', },
    { key: 'Insatisfatória, falta competência para lidar com as demandas. (Sentimento: Frustração, Desapontamento)  ', value: 'Insatisfatória, falta competência para lidar com as demandas. (Sentimento: Frustração, Desapontamento)  ', },
  ]
  const representadoPoliticos = [
    { key: 'Concordo plenamente, sinto que eles refletem minhas preocupações. (Sentimento: Identificação, Contentamento)', value: 'Concordo plenamente, sinto que eles refletem minhas preocupações. (Sentimento: Identificação, Contentamento)', },
    { key: 'Nem sempre, acho que há certa desconexão com as necessidades da população. (Sentimento: Desconexão, Insatisfação)', value: 'Nem sempre, acho que há certa desconexão com as necessidades da população. (Sentimento: Desconexão, Insatisfação)', },
    { key: 'Discordo, sinto-me completamente sub-representado. (Sentimento: Descontentamento, Alienamento)', value: 'Discordo, sinto-me completamente sub-representado. (Sentimento: Descontentamento, Alienamento)', },
  ]
  const liderancasPolíticas = [
    { key: '1. (Sentimento: Descrença, Desilusão)', value: '1. (Sentimento: Descrença, Desilusão)', },
    { key: '2  (Sentimento: Expectativa, Ceticismo)', value: '2  (Sentimento: Expectativa, Ceticismo)', },
    { key: '3. (Sentimento: Confiança, Crença)', value: '3. (Sentimento: Confiança, Crença)', },
  ]
  const MunicipalPoliticas = [
    { key: 'Promissora e eficiente na solução dos problemas locais. (Sentimento: Otismo, Confiança)', value: 'Promissora e eficiente na solução dos problemas locais. (Sentimento: Otismo, Confiança)', },
    { key: 'Aceitável, mas com áreas que precisam de melhorias. (Sentimento: Esperança, Pragmatismo)', value: 'Aceitável, mas com áreas que precisam de melhorias. (Sentimento: Esperança, Pragmatismo)', },
    { key: 'Incapaz de lidar com os desafios e necessidades da cidade. (Sentimento: Desânimo, Desconfiança)', value: 'Incapaz de lidar com os desafios e necessidades da cidade. (Sentimento: Desânimo, Desconfiança)', },
  ]
  const prioridades = [
    { key: 'Redução de impostos', value: 'Redução de impostos', },
    { key: 'Criação de empregos', value: 'Criação de empregos', },
    { key: 'Melhoria na infraestrutura', value: 'Melhoria na infraestrutura', },
    { key: 'Investimentos em educação', value: 'Investimentos em educação', },
    { key: 'Acesso à saúde de qualidade', value: 'Acesso à saúde de qualidade', },
    { key: 'Outra', value: 'Outra', },
  ]
  const AvalicaoAtendimentos = [
    { key: 'Muito eficiente', value: 'Muito eficiente', },
    { key: 'Moderadamente eficiente', value: 'Moderadamente eficiente', },
    { key: 'Pouco eficiente', value: 'Pouco eficiente', },
    { key: 'Ineficiente', value: 'Ineficiente', },
    { key: 'Não sei', value: 'Não sei', },
    { key: 'Outra', value: 'Outra', },
  ]
  const votoPrefeitos = [
    { key: 'Divanize Oliveira', value: 'Divanize Oliveira', },
    { key: 'Isoares Martins', value: 'Isoares Martins', },
    { key: 'Saldanha', value: 'Saldanha', },
    { key: 'Zezé da Agrícola', value: 'Zezé da Agrícola', },
    { key: 'Raimundo do Poço Novo', value: 'Raimundo do Poço Novo', },
    { key: 'Fabricio Equipadora', value: 'Fabricio Equipadora', },
    { key: 'Geilson Oliveira', value: 'Geilson Oliveira', },
    { key: 'Lúcia Nascimento', value: 'Lúcia Nascimento', },
    { key: 'Não sei, sou eleitor indeciso', value: 'Não sei, sou eleitor indeciso', },
    { key: 'Outra', value: 'Outra', },
  ]
  const votoGovernadores = [
    { key: 'Fatima Bezerra', value: 'Fatima Bezerra', },
    { key: 'Fabio Dantas', value: 'Fabio Dantas', },
    { key: 'Capitão Styvenson', value: 'Capitão Styvenson', },
    { key: 'Clorisa Linhares', value: 'Clorisa Linhares', },
    { key: 'PREFIRO NÃO DECLARAR', value: 'PREFIRO NÃO DECLARAR', },
    { key: 'NÃO VOTEI', value: 'NÃO VOTEI', },
    { key: 'VOTEI EM BRANCO', value: 'VOTEI EM BRANCO', },
    { key: 'VOTEI NULO', value: 'VOTEI NULO', },
  ]
  const votoPresidentes = [
    { key: 'LULA', value: 'LULA', },
    { key: 'BOLSONARO', value: 'BOLSONARO', },
    { key: 'SIMONE TEBET', value: 'SIMONE TEBET', },
    { key: 'CIRO GOMES', value: 'CIRO GOMES', },
    { key: 'FELIPI DÁVILA', value: 'FELIPI DÁVILA', },
    { key: 'PREFIRO NÃO DECLARAR', value: 'PREFIRO NÃO DECLARAR', },
    { key: 'NÃO VOTEI', value: 'NÃO VOTEI', },
    { key: 'VOTEI EM BRANCO', value: 'VOTEI EM BRANCO', },
    { key: 'VOTEI NULO', value: 'VOTEI NULO', },
  ]
  const bomCandidatoCaracteristicas = [
    { key: 'Honestidade', value: 'Honestidade', },
    { key: 'Competência técnica', value: 'Competência técnica', },
    { key: 'Empatia', value: 'Empatia', },
    { key: 'Experiência política', value: 'Experiência política', },
    { key: 'Transparência', value: 'Transparência', },
    { key: 'Outra', value: 'Outra', },
  ]
  const cadidatoprioridades = [
    { key: 'Saúde (exemplo: melhorar o acesso a hospitais e serviços de saúde)', value: 'Saúde (exemplo: melhorar o acesso a hospitais e serviços de saúde)', },
    { key: 'Educação (exemplo: investir na melhoria de escolas e programas educacionais)', value: 'Educação (exemplo: investir na melhoria de escolas e programas educacionais)', },
    { key: 'Segurança pública (exemplo: implementar políticas de combate à criminalidade)', value: 'Segurança pública (exemplo: implementar políticas de combate à criminalidade)', },
    { key: 'Meio ambiente (exemplo: promover a preservação de áreas verdes e reduzir a poluição)', value: 'Meio ambiente (exemplo: promover a preservação de áreas verdes e reduzir a poluição)', },
    { key: 'Emprego (exemplo: criar programas para incentivar a geração de empregos)', value: 'Emprego (exemplo: criar programas para incentivar a geração de empregos)', },
    { key: 'Infraestrutura (exemplo: melhorar estradas, transporte público e serviços básicos)', value: 'Infraestrutura (exemplo: melhorar estradas, transporte público e serviços básicos)', },
    { key: 'Outra', value: 'Outra', },
  ]
  const deficienteServicos = [
    { key: 'Acesso a água', value: 'Acesso a água', },
    { key: 'Saúde', value: 'Saúde', },
    { key: 'Educação', value: 'Educação', },
    { key: 'Transporte público', value: 'Transporte público', },
    { key: 'Segurança', value: 'Segurança', },
    { key: 'Saneamento básico', value: 'Saneamento básico', },
    { key: 'Outra', value: 'Outra', },
  ]
  const escolhaCandidatos = [
    { key: 'Saúde', value: 'Saúde', },
    { key: 'Educação', value: 'Educação', },
    { key: 'Segurança pública', value: 'Segurança pública', },
    { key: 'Economia', value: 'Economia', },
    { key: 'Meio ambiente', value: 'Meio ambiente', },
    { key: 'Emprego', value: 'Emprego', },
    { key: 'Infraestrutura', value: 'Infraestrutura', },
    { key: 'Outra', value: 'Outra', },
  ]
  const participouManifestacao = [
    { key: 'Sim', value: 'Sim', },
    { key: 'Não', value: 'Não', },
  ]
  const discutirPoliticas = [
    { key: 'Sim, frequentemente', value: 'Sim, frequentemente', },
    { key: 'Às vezes', value: 'Às vezes', },
    { key: 'Raramente', value: 'Raramente', },
    { key: 'Não', value: 'Não', },
  ]
  const comunicaoVeiculos = [
    { key: 'RÁDIO', value: 'RÁDIO', },
    { key: 'TELEVISÃO', value: 'TELEVISÃO', },
    { key: 'CELULAR', value: 'CELULAR', },
    { key: 'JORNAIS/ REVISTAS', value: 'JORNAIS/ REVISTAS', },
  ]
  const handleInputChange = (text: string) => {
    // Remove caracteres não numéricos
    const cleanedText = text.replace(/[^0-9]/g, '');
    setIdade(cleanedText);
  };
  const handleInputQuantPessoas = (text: string) => {
    // Remove caracteres não numéricos
    const cleanedText = text.replace(/[^0-9]/g, '');
    setMoradiaQuantPessoa(cleanedText);
  };
  const downloadFromUrl = async () => { 
    try { 
      const origem = `${FileSystem.documentDirectory}${nomeArquivo}`;
      const destino = `${FileSystem.cacheDirectory}Download/${nomeArquivo}`; // Pasta de Downloads
      // Verificar se o arquivo já existe no destino
      const fileInfo = await FileSystem.getInfoAsync(destino);

      if (!fileInfo.exists) {
        alert('O arquivo Baraunas.csv ainda não foi criado');
        return;
      }

      // Copiar o arquivo para a pasta de downloads
      await FileSystem.copyAsync({ from: origem, to: destino });
      alert('Arquivo copiado para a pasta de downloads!');
    } catch (error) {
      console.error('Erro ao copiar o arquivo:', error);
      alert('Error em copiar o arquivo para pasta de download.');
    }

    // try {
    //   const csvFilePath = `${FileSystem.documentDirectory + nomeArquivo}`;
    //   // Verificar se o arquivo CSV já existe
    //   const fileInfo = await FileSystem.getInfoAsync(csvFilePath);
    //   if (!fileInfo.exists) {
    //     alert('O arquivo CSV não está disponível para download.');
    //     return;
    //   }
    //   // Obter o URI do arquivo
    //   const fileUri = `file://${csvFilePath}`; 
    //   // Compartilhar e realizar o download
    //   await shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Download CSV' });
    // } catch (error) {
    //   console.error('Erro ao efetuar o download do arquivo CSV:', error);
    //   alert('Ocorreu um erro ao efetuar o download do arquivo CSV.');
    // }
  };
  async function compartilhar() {
    try {
      const csvFilePath = `${FileSystem.documentDirectory + nomeArquivo}`;
      // Verificar se o arquivo CSV já existe
      const fileInfo = await FileSystem.getInfoAsync(csvFilePath);
      if (!fileInfo.exists) {
        // Se o arquivo não existir, criar um novo
        const initialCSVData = [
          colunasPesquisa
        ];
        const initialCSV = Papa.unparse(initialCSVData);
        await FileSystem.writeAsStringAsync(csvFilePath, initialCSV, { encoding: FileSystem.EncodingType.UTF8 });
      }
      // Ler o conteúdo do arquivo CSV
      const fileContent = await FileSystem.readAsStringAsync(csvFilePath, { encoding: FileSystem.EncodingType.UTF8 });
      // Analisar o conteúdo do arquivo CSV
      const parsedData = Papa.parse(fileContent, { header: true }).data;
      // Compartilhar o arquivo CSV
      await shareAsync(csvFilePath, { mimeType: 'text/csv', dialogTitle: 'Compartilhar ' });
    } catch (error) {
      console.error('Erro ao criar ou compartilhar o arquivo CSV:', error);
      alert('Erro Ocorreu um erro ao criar ou compartilhar o arquivo CSV.');
    }
  };
  const saveDataToCSV = async (newData: any) => {
    try {
      const csvFilePath = `${FileSystem.documentDirectory + nomeArquivo}`;
      // Verificar se o arquivo CSV já existe
      const fileInfo = await FileSystem.getInfoAsync(csvFilePath);
      if (!fileInfo.exists) {
        // Se o arquivo não existir, criar um novo com cabeçalho
        const initialCSVData = [colunasPesquisa];
        const initialCSV = Papa.unparse(initialCSVData);
        await FileSystem.writeAsStringAsync(csvFilePath, initialCSV, { encoding: FileSystem.EncodingType.UTF8 });
      }
      // Ler o conteúdo do arquivo CSV
      const fileContent = await FileSystem.readAsStringAsync(csvFilePath, { encoding: FileSystem.EncodingType.UTF8 });
      let dadosPlanilha = processarTexto(fileContent)
      // Analisar o conteúdo do arquivo CSV
      const parsedData = Papa.parse(fileContent, { header: true }).data;
      // Adicionar nova linha aos dados
      parsedData.push(newData);
      dadosPlanilha.push(newData);
      // Converter a matriz de dados para CSV
      let updatedCSV = Papa.unparse(dadosPlanilha);

      updatedCSV = updatedCSV.replace(/""/g, '');
      // Sobrescrever o arquivo CSV com os novos dados
      // Usar o método append para adicionar a nova linha sem sobrescrever 
      await FileSystem.writeAsStringAsync(csvFilePath, updatedCSV, { encoding: FileSystem.EncodingType.UTF8 });
    
      // setzona('')
      // setRegiao(null)
      // setSexo('')
      // setIdade('')
      // setFaixaRenda('')
      // setOrigemRenda('')
      // setNivelEscolar('')
      // setQuantPessoa('')
      // setmoradia('')
      // setCasaVeiculo('')
      // setPerfilEntrevistado('')
      // setComunicaoVeiculo('')
      // setDiscutirPolitica('')
      // setParticipouManif('')
      // setEscolhaCandidato('')
      // setDeficienteServico('')
      // setCadidatoprioridade('')
      // setBomCandidatoCaracteristica('')
      // setVotoPresidente('')
      // setVotoGovernador('')
      // setVotoPrefeito('')
      // setAvalicaoAtendimento('')
      // setPrioridade('')
      // setMunicipalPolitica('')
      // setLiderancasPolítica('')
      // setRepresentadoPolitico('')
      // setMunicipalAdmin('')
      // setPoliticainflencia('')
      // setDecisaoInfluencia('')
      // setPrefeituraMudanca('')
      // setProblemaCidade('')
      // setIdeiaInovadora('')
      // setComunidadeFuturo('')
      // setProblemaRegiao('')
      // setMudanca('')
      // setMensagemPolitico('')
      // setMoradiaQuantPessoa('')
      // setAvaliacaoZeze('')
      // setAvaliacaoGeilson('')
      // setAvaliacaoLucia('')
      // setNomeVereadorDestacado('')
      // setVereadorFeedback('')
      // setAvaliacaoVereadorDestacado('')
    } catch (error) {
      console.error('Erro ao salvar dados no arquivo CSV:', error);
      alert('Ocorreu um erro ao salvar os dados no arquivo CSV.');
    }
  };

  function processarTexto(texto: string) {
    texto = texto.trim();
    // Substituir as aspas extras 
    texto = texto.replace(/""/g, '');
    // Dividir o texto em linhas
    const linhas = texto.split('\n');
    // Processar cada linha dividindo-a em elementos
    const arrayDeArrays = linhas.map((linha) => linha.split('\n')); // Altere a vírgula para o separador desejado
    return arrayDeArrays;
  }

  const salvarVariavelLocal = async () => {
    try {
      await AsyncStorage.setItem(key, nome);
      console.log('Variável local salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar variável local:', error);
    }
  };
  async function primeiroAcesso() {
    salvarVariavelLocal()
    setAplicadorExistente(true)
    const csvFilePath = `${FileSystem.documentDirectory + nomeArquivo}`;
    const initialCSVData = [[`Nome do aplicador: ${nome}`], colunasPesquisa];
    const initialCSV = Papa.unparse(initialCSVData);
    await FileSystem.writeAsStringAsync(csvFilePath, initialCSV, { encoding: FileSystem.EncodingType.UTF8 });
  } 
  return (
    <>
      {aplicadorExistente ?
        <ScrollView style={{}} ref={scrollViewRef}>
          <StatusBar backgroundColor={'purple'} animated={true} showHideTransition={"fade"}/>
          <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 60, backgroundColor: 'purple', borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}>
              <Text style={{ color: '#fff', fontSize: 22, fontWeight: "700", fontFamily: "Roboto" }}>
                Pesquisa Baraunas
              </Text>
            </View>
            <View style={{ padding: 16, flex: 1 }}>
 
              <Text style={styles.pergunta}>
                1- ZONA
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(val: any) => {
                        setzona(val);
                        onChange(val);
                      }}
                      data={zonas}
                      save="value"
                      placeholder='Selecione a zona'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a zona que deseja encontrar'
                    />
                    {errors.zona && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma zona</Text>}
                  </View>
                )}
                name="zona"
                rules={{ required: true }}
              />
              {/* <SelectList
                  setSelected={(val: any) =>{ setzona(val)}
                  data={zonas}
                  save="value"
                  placeholder='Selecione a zona'
                  notFoundText='Dado não encontrado'
                  searchPlaceholder='Digite a zona que deseja encontrar'
                /> */}
              <Text style={styles.pergunta}>
                2- REGIÃO
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setRegiao(valor); onChange(valor); }}
                      data={regioes}
                      save="value"
                      placeholder='Selecione a regiao'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a região que deseja encontrar'
                    />
                    {errors.regiao && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma regiao</Text>}
                  </View>
                )}
                name="regiao"
                rules={{ required: true }}
              />

              <Text style={styles.pergunta}>
                3- SEXO
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setSexo(valor); onChange(valor); }}
                      data={sexos}
                      save="value"
                      placeholder='Selecione o sexo'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite o sexo que deseja encontrar'
                    />
                    {errors.sexo && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione um sexo</Text>}
                  </View>
                )}
                name="sexo"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                4 - IDADE
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      style={styles.inputNumber}
                      placeholder="Digite a idade do entrevistado"
                      keyboardType="numeric"
                      value={idade}
                      onChangeText={(text: string) => { handleInputChange(text); onChange(text); }}
                    />
                    {errors.idade && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma idade</Text>}
                  </View>
                )}
                name="idade"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                5 - FAIXA DE RENDA
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setFaixaRenda(valor); onChange(valor); }}
                      data={faixaRendas}
                      save="value"
                      placeholder='Selecione o faixa de renda'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a faixa de renda que deseja encontrar'
                    />
                    {errors.renda && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma renda</Text>}
                  </View>
                )}
                name="renda"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                6 - Qual é a origem da sua renda principal?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setOrigemRenda(valor); onChange(valor); }}
                      data={origemRendas}
                      save="value"
                      placeholder='Selecione o origem de renda'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a origem de renda que deseja encontrar'
                    />
                    {errors.origem && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma origem</Text>}
                  </View>
                )}
                name="origem"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                7 - NIVEL DE ESCOLARIDADE
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setNivelEscolar(valor); onChange(valor); }}
                      data={nivelEscolaridades}
                      save="value"
                      placeholder='Selecione o nivel escolar'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite o nivel escolar que deseja encontrar'
                    />
                    {errors.escolaridade && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma escolaridade</Text>}
                  </View>
                )}
                name="escolaridade"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                8 - Quantas pessoas moram contigo na sua casa?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setQuantPessoa(valor); onChange(valor); }}
                      data={quantPessoas}
                      save="value"
                      placeholder='Selecione quantas pessoas moram com você'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a quantidade de pessoas que deseja encontrar'
                    />
                    {errors.pessoas && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma pessoas</Text>}
                  </View>
                )}
                name="pessoas"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                9 - Sua moradia é:
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setmoradia(valor); onChange(valor); }}
                      data={moradias}
                      save="value"
                      placeholder='Selecione a moradia'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a moradia que deseja encontrar'
                    />
                    {errors.moradia && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma moradia</Text>}
                  </View>
                )}
                name="moradia"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                9.1 - Quantas pessoas moram contigo na mesma casa? (preencher com número)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      style={styles.inputNumber}
                      placeholder="Informe a quantidade de pessoas"
                      keyboardType="numeric"
                      value={moradiaQuantPessoa}
                      onChangeText={(text) => { handleInputQuantPessoas(text); onChange(text) }}
                    />
                    {errors.quantpessoa && <Text style={{ color: 'red', textAlign: 'center' }}>Digite a quantidade de pessoas</Text>}
                  </View>
                )}
                name="quantpessoa"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                10 - Na sua casa qual tipo de veiculo existe?(selecione  as opções que existir em ordem)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <MultipleSelectList
                      setSelected={(valor: any) => { setCasaVeiculo(valor); onChange("valor"); }}
                      data={casaVeiculos}
                      save="value"
                      label="Categories"
                      placeholder='Selecione os veiculos da casa'
                      searchPlaceholder='Digite o veiculo da casa que deseja encontrar'
                    />
                    {errors.veiculo && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma veiculo</Text>}
                  </View>
                )}
                name="veiculo"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                11 - PERFIL DO ENTREVISTADO
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setPerfilEntrevistado(valor); onChange(valor); }}
                      data={perfilEntrevistados}
                      save="value"
                      placeholder='Selecione o perfil do entrevistado'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite o perfil do entrevistado que deseja encontrar'
                    />
                    {errors.entrevistado && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione um perfil</Text>}
                  </View>
                )}
                name="entrevistado"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                12 - QUAL VEICULO DE COMUNICAÇÃO VOCÊ MAIS ULTILIZA PARA SE INFORMAR?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setComunicaoVeiculo(valor); onChange(valor); }}
                      data={comunicaoVeiculos}
                      save="value"
                      placeholder='Selecione o veiculo de comunicação'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite o veiculo de comunicação que deseja encontrar'
                    />
                    {errors.comunicacao && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione um veiculo comunicacao</Text>}
                  </View>
                )}
                name="comunicacao"
                rules={{ required: true }}
              />

              <Text style={styles.pergunta}>
                13 - Você costuma discutir política com amigos/família/colegas?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setDiscutirPolitica(valor); onChange(valor) }}
                      data={discutirPoliticas}
                      save="value"
                      placeholder='Selecione a opção'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a opção que deseja encontrar'
                    />
                    {errors.discutir && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma opção</Text>}
                  </View>
                )}
                name="discutir"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                14 - Você já participou de alguma manifestação política? Seja participação em carreata, ou qualquer coisa do gênero
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setParticipouManif(valor); onChange(valor) }}
                      data={participouManifestacao}
                      save="value"
                      placeholder='Selecione a opção'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a opção que deseja encontrar'
                    />
                    {errors.manifestacao && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma opção</Text>}
                  </View>
                )}
                name="manifestacao"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                15 - Quais questões são mais importantes para você na escolha de um candidato? (Escolha as três mais importantes)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <MultipleSelectList
                      setSelected={(valor: any) => { setEscolhaCandidato(valor); onChange("valor") }}
                      data={escolhaCandidatos}
                      save="value"
                      label="Selecione três questões"
                      placeholder='Selecione as questões'
                      searchPlaceholder='Digite a questão que deseja encontrar'
                    />
                    {errors.questoes && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione as questoes</Text>}
                  </View>
                )}
                name="questoes"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                15.1 - Em relação aos serviços públicos oferecidos na sua região, quais você considera mais deficientes? (Escolha as três mais importantes)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <MultipleSelectList
                      setSelected={(valor: any) => { setDeficienteServico(valor); onChange("valor") }}
                      data={deficienteServicos}
                      save="value"
                      label="Selecione três serviços"
                      placeholder='Selecione os serviços'
                      searchPlaceholder='Digite o serviço que deseja encontrar'
                    />
                    {errors.deficiencia && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma deficiencia</Text>}
                  </View>
                )}
                name="deficiencia"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                16 - Qual dessas questões você acredita que seu candidato ideal deveria priorizar?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setCadidatoprioridade(valor); onChange(valor) }}
                      data={cadidatoprioridades}
                      save="value"
                      placeholder='Selecione a questão'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a questão que deseja encontrar'
                    />
                    {errors.prioridade && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma prioridade</Text>}
                  </View>
                )}
                name="prioridade"
                rules={{ required: true }} />
              <Text style={styles.pergunta}>
                17 - Na sua opinião, quais características um bom candidato deve ter? (Escolha até três opções)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <MultipleSelectList
                      setSelected={(valor: any) => { setBomCandidatoCaracteristica(valor); onChange("valor") }}
                      data={bomCandidatoCaracteristicas}
                      save="value"
                      label="Selecione atê três características"
                      placeholder='Selecione as características'
                      searchPlaceholder='Digite a característica que deseja encontrar'
                    />
                    {errors.caracteristicas && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma caracteristicas</Text>}
                  </View>
                )} 
                name="caracteristicas"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                18 - ENTRE OS CANDIDATOS ABAIXO QUEM VOCÊ VOTOU NA ULTIMA ELEIÇÃO PARA PRESIDENTE?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setVotoPresidente(valor); onChange(valor) }}
                      data={votoPresidentes}
                      save="value"
                      placeholder='Selecione o candidato'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite o candidato que deseja encontrar'
                    />
                    {errors.presidente && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione um presidente</Text>}
                  </View>
                )} 
                name="presidente"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                19 - ENTRE OS CANDIDATOS ABAIXO QUEM VOCÊ VOTOU NA ULTIMA ELEIÇÃO PARA GOVERNADOR?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setVotoGovernador(valor); onChange(valor) }}
                      data={votoGovernadores}
                      save="value"
                      placeholder='Selecione o candidato'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite o candidato que deseja encontrar'
                    />
                    {errors.governador && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione um governador</Text>}
                  </View>
                )}

                name="governador"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                20 - Se a eleição fosse hoje, em quem você votaria para PREFEITO?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setVotoPrefeito(valor); onChange(valor) }}
                      data={votoPrefeitos}
                      save="value"
                      placeholder='Selecione o candidato'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite o candidato que deseja encontrar'
                    />
                    {errors.prefeito && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione um prefeito</Text>}
                  </View>
                )} 
                name="prefeito"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                20.1 - Como está a avaliação dos vereadores? Geilson Oliveira (de 1 até 5)
              </Text>
              <Controller
                 control={control}
                 render={({ field: { onChange, onBlur, value } }) => (
                   <View>
                     <StarRating rating={avaliacaoGeilson} onStarPress={(nota:any)=>{setAvaliacaoGeilson(nota); onChange(nota)}} />
                     {errors.notaGilson && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione a nota de Gilson</Text>}
                   </View>
                 )} 
                 name="notaGilson"
                 rules={{ required: true }}
               />
              <Text style={styles.pergunta}>
                20.2 - Como está a avaliação dos vereadores? Zezé da Agrícola (de 1 até 5)
              </Text>
              <Controller
                 control={control}
                 render={({ field: { onChange, onBlur, value } }) => (
                   <View> 
                     <StarRating rating={avaliacaoZeze} onStarPress={(nota:any)=>{setAvaliacaoZeze(nota); onChange(nota)}} />
                     {errors.notaZeze && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione a nota de Zeze</Text>}
                   </View>
                 )} 
                 name="notaZeze"
                 rules={{ required: true }}
               />
              <Text style={styles.pergunta}>
                20.3 - Como está a avaliação dos vereadores? Lúcia Nascimento  (de 1 até 5)
              </Text >
              <Controller
                 control={control}
                 render={({ field: { onChange, onBlur, value } }) => (
                   <View>
                      <StarRating rating={avaliacaoLucia} onStarPress={(nota:any)=>{setAvaliacaoLucia(nota); onChange(nota)}} />
                      {errors.notaLucia && <Text style={{ color: 'red', textAlign: 'center' }}>A nota de Lucia(a)</Text>}
                   </View>
                 )} 
                 name="notaLucia"
                 rules={{ required: true }}
               />
              <Text style={styles.pergunta}>
                20.4 - Como está a avaliação dos vereadores? Algum que você queira destacar uma critica ou elogio
              </Text> 
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Button mode="contained" style={[styles.buttons, { justifyContent: 'center', width: '80%', backgroundColor: destaque ? 'red' : 'purple' }]}
                  onPress={() => {
                    setNomeVereadorDestacado('')
                    setVereadorFeedback('')
                    setAvaliacaoVereadorDestacado('')
                    setDestaque(!destaque)
                  }}>
                  <Text style={{ fontFamily: 'Roboto', fontWeight: "700", fontSize: 18, color: 'white' }}>
                    {destaque ? 'Não quero avaliar' : 'Quero avaliar'}
                  </Text>
                </Button>
              </View>
              {destaque ?
                <View >
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View>
                        <TextInput
                          label="Escreva o nome do vereador"
                          value={nomeVereadorDestacado}
                          onChangeText={(text) => { setNomeVereadorDestacado(text); onChange(text) }}
                          style={styles.inputText}
                        />
                        {errors.nomeVereador && <Text style={{ color: 'red', textAlign: 'center' }}>Digite o nome Vereador</Text>}
                      </View>
                    )}
                    name="nomeVereador"
                    rules={destaque ? { required: true } : { required: false }}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View>
                        <TextInput
                          label="Descreva a critica ou elogio"
                          value={vereadorFeedback}
                          onChangeText={(text) => { setVereadorFeedback(text); onChange(text) }}
                          style={styles.inputText}
                        />
                        {errors.critica && <Text style={{ color: 'red', textAlign: 'center' }}>Digite uma critica</Text>}
                      </View>
                    )}
                    name="critica"
                    rules={{ required: destaque }}
                  />
                  <Controller
                 control={control}
                 render={({ field: { onChange, onBlur, value } }) => (
                   <View>
                     <StarRating rating={avaliacaoVereadorDestacado} onStarPress={(nota: any) =>{ setAvaliacaoVereadorDestacado(nota); onChange(nota) }} />
                     {errors.notaVereador && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione a nota do vereador(a)</Text>}
                   </View>
                 )} 
                 name="notaVereador"
                 rules={{ required: destaque }}
               />
                </View>
                :
                null
              }
              <Text style={styles.pergunta}>
                21 - Como você avalia a atuação do governo atual em relação ao atendimento das necessidades da população?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setAvalicaoAtendimento(valor); onChange(valor) }}
                      data={AvalicaoAtendimentos}
                      save="value"
                      placeholder='Selecione o candidato'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite o candidato que deseja encontrar'
                    />
                    {errors.avaliacaoAtendimento && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma avaliacao do atendimento</Text>}
                  </View>
                )}
                name="avaliacaoAtendimento"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                22 - Na sua opinião, quais deveriam ser as prioridades de um representante político?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setPrioridade(valor); onChange(valor) }}
                      data={prioridades}
                      save="value"
                      placeholder='Selecione as prioridades'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a prioridade que deseja encontrar'
                    />
                    {errors.prioridade && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione a prioridade</Text>}
                  </View>
                )} 
                name="prioridade"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                23 - Atualmente, vejo a política municipal como:
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setMunicipalPolitica(valor); onChange(valor) }}
                      data={MunicipalPoliticas}
                      save="value"
                      placeholder='Selecione a visão da politica atual'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a visão da politica atual que deseja encontrar'
                    />
                    {errors.visaoPolitica && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione um visao politica atual</Text>}
                  </View>
                )} 
                name="visaoPolitica"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                24 - Minha confiança nas lideranças políticas municipais é:
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setLiderancasPolítica(valor); onChange(valor) }}
                      data={liderancasPolíticas}
                      save="value"
                      placeholder='Selecione a confiança'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a confiança que deseja encontrar'
                    />
                    {errors.confianca && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma confianca</Text>}
                  </View>
                )} 
                name="confianca"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                25 - Eu me sinto representado pelos políticos locais:
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setRepresentadoPolitico(valor); onChange(valor) }}
                      data={representadoPoliticos}
                      save="value"
                      placeholder='Selecione a opção'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a opção que deseja encontrar'
                    />
                    {errors.representantePolitico && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione um opcao</Text>}
                  </View>
                )} 
                name="representantePolitico"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                26 - A situação atual da administração municipal é
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setMunicipalAdmin(valor); onChange(valor) }}
                      data={MunicipalAdmins}
                      save="value"
                      placeholder='Selecione a sintuação'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a sintuação que deseja encontrar'
                    />
                    {errors.sintuacao && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma sintuacao</Text>}
                  </View>
                )} 
                name="sintuacao"
                rules={{ required: true }}
              /> 
              <Text style={styles.pergunta}>
                27 - Minha visão sobre a política municipal é influenciada por:
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setPoliticainflencia(valor); onChange(valor) }}
                      data={politicainflencias}
                      save="value"
                      placeholder='Selecione o que influencia'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a influencia que deseja encontrar'
                    />
                    {errors.influenciaPolitica && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma influencia politica</Text>}
                  </View>
                )} 
                name="influenciaPolitica"
                rules={{ required: true }}
              /> 
              <Text style={styles.pergunta}>
                28 - O que mais influencia sua decisão de voto?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setDecisaoInfluencia(valor); onChange(valor) }}
                      data={decisaoInfluencias}
                      save="value"
                      placeholder='Digite o que influencia a tomada de decisão'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a influencia que quer encontrar'
                    />
                    {errors.influencia && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma influencia</Text>}
                  </View>
                )}

                name="influencia"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                29 - Você acha que deveria existir uma mudança na prefeitura da cidade?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <SelectList
                      setSelected={(valor: any) => { setPrefeituraMudanca(valor); onChange(valor) }}
                      data={PrefeituraMudancas}
                      save="value"
                      placeholder='Descreva a mudança'
                      notFoundText='Dado não encontrado'
                      searchPlaceholder='Digite a mudança encontrar'
                    />
                    {errors.prefeituraMudanca && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma mudanca na prefeitura</Text>}
                  </View>
                )}
                name="prefeituraMudanca"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                30 - QUAL O PRINCIPAL PROBLEMA DA CIDADE DE BARÚNA NA SUA OPNIÃO?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="Relate o problema da cidade"
                      value={problemaCidade}
                      onChangeText={(text) => { setProblemaCidade(text); onChange(text) }}
                      style={styles.inputText}
                    />
                    {errors.problema && <Text style={{ color: 'red', textAlign: 'center' }}>Digite um problema</Text>}
                  </View>
                )}
                name="problema"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                31 - Representando sua comunidade/ região, você teria alguma ideia inovadora ou sugestão criativa que acredita que poderia melhorar Baraúna e que gostaria que a próxima gestão implementasse na sua comunidade ou região?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="Descreva a ideia inovadora"
                      value={ideiaInovadora}
                      onChangeText={(text) => { setIdeiaInovadora(text); onChange(text) }}
                      style={styles.inputText}
                    />
                    {errors.ideia && <Text style={{ color: 'red', textAlign: 'center' }}>Digite uma ideia</Text>}
                  </View>
                )}
                name="ideia"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                32 - Como você imagina nossa comunidade nos próximos anos? O que você gostaria de ver mudado ou melhorado?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="Descreva a comunidade"
                      value={comunidadeFuturo}
                      onChangeText={(text) => { setComunidadeFuturo(text); onChange(text) }}
                      style={styles.inputText}
                    />
                    {errors.comunidade && <Text style={{ color: 'red', textAlign: 'center' }}>Digite sobre a comunidade</Text>}
                  </View>
                )} 
                name="comunidade"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                33 - QUAL O PRINCIPAL PROBLEMA DA SUA REGIÃO SITIO/BAIRRO NA SUA OPNIÃO?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="Digite o principal problema da regiao"
                      value={problemaRegiao}
                      onChangeText={(text) => { setProblemaRegiao(text); onChange(text) }}
                      style={styles.inputText}
                    />
                    {errors.principal && <Text style={{ color: 'red', textAlign: 'center' }}>Digite um principal problema</Text>}
                  </View>
                )}
                name="principal"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                34- Quais ações ou mudanças você gostaria que a prefeitura implementasse em Baraúna para melhorar a qualidade de vida na cidade?
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="Descreva a mudanca"
                      value={mudanca}
                      onChangeText={(text) => { setMudanca(text); onChange(text) }}
                      style={styles.inputText}
                    />
                    {errors.mudanca && <Text style={{ color: 'red', textAlign: 'center' }}>Digite uma mudanca</Text>}
                  </View>
                )}
                name="mudanca"
                rules={{ required: true }}
              />
              <Text style={styles.pergunta}>
                35 - MANDE UMA MENSAGEM PARA OS POLITICOS DA CIDADE DE BARAÚNA
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      label="Digite a mensagem"
                      value={mensagemPolitico}
                      onChangeText={(text) => { setMensagemPolitico(text); onChange(text) }}
                      style={styles.inputText}
                    />
                    {errors.mensagem && <Text style={{ color: 'red', textAlign: 'center' }}>Digite um mensagem</Text>}
                  </View>
                )}
                name="mensagem"
                rules={{ required: true }}
              />
              <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={downloadFromUrl} >
                    <Feather name="download" size={30} color="purple" />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                  <Button mode="contained" style={styles.buttons} onPress={handleSubmit(handleSaveData)}>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: "700", fontSize: 18 }}>
                      Salvar
                    </Text>
                  </Button> 
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={compartilhar} >
                    <Entypo name="share" size={30} color="purple" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: "#d3d3d3" }}>
          <Image source={require('./assets/baraunaicon.png')} style={{ width: 160, height: 160, marginTop: 120, }} />
          <Text >
            CIDADE DE BARAUNAS
          </Text>
          <Text style={styles.titulo}>
            Antes de iniciarmos a pesquisa informe o seu nome
          </Text>
          <TextInput
            label="Digite o seu nome"
            value={nome}
            onChangeText={(text) => { setNome(text); onChange(text) }}
            style={styles.inputText}
          />
          <Button mode="contained" style={[styles.buttons, { marginTop: '5%', marginBottom: '60%' }]} onPress={primeiroAcesso}>
            <Text style={{ fontFamily: 'Roboto', fontWeight: "700", fontSize: 18 }}>
              Começar a pesquisa
            </Text>
          </Button>
          <Text style={{ alignItems: 'flex-end', color: '#0c0c0c' }}>
            Versão Beta
          </Text>
        </View>

      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: "500",
    color: '#450145'
  },
  inputNumber: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
  ,
  inputText: {
    width: '100%',
    borderRadius: 16
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  viewInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pergunta: {
    textTransform: 'uppercase',
    padding: 8,
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: "500"
  },
  buttons: {
    width: '100%',
  }
});