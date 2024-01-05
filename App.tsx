import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, StatusBar, } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { useEffect, useRef, useState } from 'react';
import { TextInput, Button } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list';
import { Feather, Entypo } from '@expo/vector-icons';
import * as Papa from 'papaparse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from './components/StarRating.jsx'
import CheckboxList from './components/myCheckBox.jsx';
import Select from './components/SelectList.jsx';
export default function App() {
  const nomeArquivo = 'baraunasRespostas.csv'
  const key = 'runBaraunas'
  const [nomeDoAplicador, setNomeDoAplicador] = useState('');
  const [nome, setNome] = useState('');
  const [aplicadorExistente, setAplicadorExistente] = useState(false);
  const [questaoimportantes, setQuestaoimportantes] = useState('');
  const [bomCandidatoCaracteristica, setBomCandidatoCaracteristica] = useState('')

  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [opcaoSelecionada2, setOpcaoSelecionada2] = useState("");
  function substituirVirgulaPorPonto(arrayVar: any) {
    let stringResult = '';
    for (let i = 0; i < arrayVar.length; i++) {
      stringResult += arrayVar[i];
      if (i < arrayVar.length - 1) {
        // Adiciona um ponto e espaco entre os elementos, exceto no ultimo
        stringResult += '.';
      }
    }
    return stringResult
  }
  const handleSaveData = () => {
    console.log("blaaa 222")
    const dataAtual = new Date();
    const dataHoraFormatada = dataAtual.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    updateRespostas(formularioCompleto.length + 1, dataHoraFormatada)
    updateRespostas(27, substituirVirgulaPorPonto(bomCandidatoCaracteristica))
    // updateRespostas(33, substituirVirgulaPorPonto(escolhaCandidato))
    updateRespostas(26, substituirVirgulaPorPonto(questaoimportantes))

    for (let i = 0; i < respostas.length - 1; i++) {
      // index == 20 || index == 27 || index == 32 || index == 47  || index == 55 || index == 71 || index == 84
      if (respostas[i] == '' && !(i == 20 || i == 27 || i == 32 || i == 47 || i == 55 || i == 71 || i == 84)) {//
        alert('Preencha todos os campos obrigatorios \n Falta responder a pergunta:\n  ' + formularioCompleto[i].pergunta);
        return;
      }
    }
    try {
      saveDataToCSV(respostas);
      setRespostas(initialState)
      setQuestaoimportantes('')
      //setEscolhaCandidato('')
      setBomCandidatoCaracteristica('')
      alert('Dados salvos com sucesso!');
    }
    catch (e) {
      console.log(e)
    }
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
        console.error('Erro ao carregar variavel local:', error);
      }
    };
    carregarVariavelLocal()
  }, [nomeDoAplicador])
  const regioesDiferentes = [
    [ // Central
      { value: "CENTRO" },
      { value: "PRIMAVERA" },
      { value: "ALTO DA AVENIDA" },
      { value: "CAMPO VERDE" },
      { value: "CINDERELA" },
      { value: "SUB-ESTACAO" },
      { value: "DAS PALMEIRAS" },
      { value: "FILADELFIA" },
    ],
    [ //Norte
      { value: "Florencio" },
      { value: "Vila Nova III" },
      { value: "Angicos" },
      { value: "PA Pico Estreito" },
      { value: "Vila Nova II" },
      { value: "Vila Nova I" },
      { value: "PA Real" },
      { value: "Corrego de Pedra" },
      { value: "Santa Maria" },
      { value: "Aroeira Grande" },
      { value: "AV. Senhor Petrolino Portela" },
      { value: "PA Tiradentes" },
      { value: "PA Vitoria" },
    ],
    [ // SUL
      { value: "PA Bom Sucesso dos Militares" },
      { value: "Canaa" },
      { value: "Lajedo do Sebo" },
      { value: "KM.31" },
      { value: "Boa Sorte" },
      { value: "PA Poco Novo II" },
      { value: "PA Fazenda Poco Barauna (Poco I)" },
      { value: "Baixa Branca" },
      { value: "Veneza" },
      { value: "Recreio" },
      { value: "PA Santa Clara" },
      { value: "Boa Agua" },
      { value: "PA Formosa" },
      { value: "Banco da Terra" },
      { value: "PA Ouro Verde" },
      { value: "Rancho do" },
    ],
    [ // Leste
      { value: "Juremal" },
      { value: "Primavera" },
      { value: "Vertentes" },
    ],
    [ //OESTE
      { value: "PA Caatingueira" },
      { value: "Mato Alto" },
      { value: "Velame I" },
      { value: "Formigueiro" },
      { value: "Velame II" },
      { value: "Lajedo de Ouro" },
      { value: "Maxixe" },
      { value: "Olho d'gua da Escada" },
      { value: "Lajedo Mel" },
      { value: "Sumidouro" },
      { value: "Mata Burro" },
    ],
  ]
  const formularioCompleto = [
    { "pergunta": "1 - SEXO", "resposta": [{ "value": "MASCULINO" }, { "value": "FEMININO" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "2 - ZONA  (ESPOTANIA)", "resposta": [{ "value": "NORTE" }, { "value": "SUL" }, { "value": "LESTE" }, { "value": "OESTE" }, { "value": "URBANA" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "3 - REGIAO  (ESPONTANEA)", "resposta": [{ "value": "Campestre" }, { "value": "Juremal" }, { "value": "Primavera" }, { "value": "Vertentes" }, { "value": "CENTRO" }, { "value": "PRIMAVERA" }, { "value": "ALTO DA AVENIDA" }, { "value": "CAMPO VERDE" }, { "value": "CINDERELA" }, { "value": "SUB-ESTACAO" }, { "value": "DAS PALMEIRAS" }, { "value": "FILADELFIA" }, { "value": "Florencio" }, { "value": "Vila Nova III" }, { "value": "Angicos" }, { "value": "PA Pico Estreito" }, { "value": "PA Caatingueira" }, { "value": "Vila Nova II" }, { "value": "Vila Nova I" }, { "value": "PA Real" }, { "value": "Corrego de Pedra" }, { "value": "Santa Maria" }, { "value": "Aroeira Grande" }, { "value": "AV. Senhor Petrolino Portela" }, { "value": "PA Tiradentes" }, { "value": "PA Vitoria" }, { "value": "Mato Alto" }, { "value": "Velame I" }, { "value": "Formigueiro" }, { "value": "Velame II" }, { "value": "Lajedo de Ouro" }, { "value": "Maxixe" }, { "value": "Olho d'gua da Escada" }, { "value": "Lajedo Mel" }, { "value": "Sumidouro" }, { "value": "Mata Burro" }, { "value": "PA Bom Sucesso dos Militares" }, { "value": "Canaa" }, { "value": "Lajedo do Sebo" }, { "value": "KM.31" }, { "value": "Boa Sorte" }, { "value": "PA Poco Novo II" }, { "value": "PA Fazenda Poco Barauna (Poco I)" }, { "value": "Baixa Branca" }, { "value": "Veneza" }, { "value": "Recreio" }, { "value": "PA Santa Clara" }, { "value": "Boa agua" }, { "value": "PA Formosa" }, { "value": "Banco da Terra" }, { "value": "PA Ouro Verde" }, { "value": "Rancho DO" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "4 - Qual e a sua orientacao sexual?  (ESTIMULADA)", "resposta": [{ "value": "Heterossexual" }, { "value": "Bissexual" }, { "value": "Lesbica" }, { "value": "Pansexual" }, { "value": "Queer" }, { "value": "Outra" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "5 - Voce se identifica como?  (ESTIMULADA)", "resposta": [{ "value": "Preto" }, { "value": "Pardo" }, { "value": "Branco" }, { "value": "Amarelo" }, { "value": "indio" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "6 - IDADE", "resposta": [], "tipoPergunta": "EscritaNumber" }
    , { "pergunta": "7 - Estado Civil", "resposta": [{ "value": "Solteiro(a)" }, { "value": "Casado(a)/ comp.(a)" }, { "value": "Viuvo(a)" }, { "value": "Divorciado(a)" }, { "value": "Separado(a)" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "8 - Voce estuda ou estudou em escola publica ou privada (ESTIMULADA E UNICA)", "resposta": [{ "value": "Escola publica" }, { "value": "Escola particular" }, { "value": "Em escola publica E particular" }, { "value": "Nunca frequentei a escola" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "9 - NIVEL DE ESCOLARIDADE  (ESTIMULADA)", "resposta": [{ "value": "ANALFABETO" }, { "value": "ENSINO FUNDAMENTAL I INCOMPLETO" }, { "value": "ENSINO FUNDAMENTAL I COMPLETO" }, { "value": "ENSINO FUNDAMENTAL II INCOMPLETO" }, { "value": "ENSINO FUNDAMENTAL II COMPLETO" }, { "value": "ENSINO MEDIO INCOMPLETO" }, { "value": "ENSINO MEDIO COMPLETO" }, { "value": "ENSINO SUPERIOR INCOMPLETO" }, { "value": "ENSINO SUPERIOR COMPLETO" }, { "value": "ESPECIALIZACAO" }, { "value": "MESTRADO" }, { "value": "DOUTORADO" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "10 - Voce poderia me dizer qual e aproximadamente a sua renda mensal pessoal? (ESPONTANEA, SE NAO RESPONDER ESPONTANEAMENTE APRESENTE AS OPCOES)", "resposta": [{ "value": "Ate R$ 260.00" }, { "value": "De R$ 260.01 ate R$ 520.00" }, { "value": "De R$ 520.01 ate R$ 780.00" }, { "value": "De R$ 780.01 ate R$ 1.320.00" }, { "value": "De R$ 1.320,01 ate R$ 2.600.00" }, { "value": "De R$ 2.600,01 ate R$ 5.200.00" }, { "value": "De R$ 5.200,01 ate R$ 7.800.00" }, { "value": "Mais de R$ 7.800.00" }, { "value": "Nao tem renda pessoal" }, { "value": "Nao sei/Nao respondeu" }], "tipoPergunta": "EscritaText" }
    , { "pergunta": "11 - De onde vem sua fonte de renda?  (ESTIMULADA)", "resposta": [{ "value": "Agricultor" }, { "value": "Aposentadoria" }, { "value": "Autonomo" }, { "value": "Auxilio governamental" }, { "value": "Bolsa de Estudos" }, { "value": "Comerciante" }, { "value": "Desemprego" }, { "value": "Servidor Publico" }, { "value": "Trabalho com carteira assinada (CLT)" }, { "value": "Outra" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "12 - Quantas pessoas moram contigo na sua casa?  (ESPONTANEA)", "resposta": [], "tipoPergunta": "EscritaNumber" }
    , { "pergunta": "13 - O(a) sr(a). poderia me dizer qual e aproximadamente a sua renda mensal de sua casa caso tenha? (ESPONTANEA/ ESTIMULADA)", "resposta": [{ "value": "Menos de 1 salario minimo" }, { "value": "Entre 1 e 3 salarios minimos" }, { "value": "De 3 ate 5 salarios minimos" }, { "value": "De 5 ate 10 salarios minimos" }, { "value": "Mais de 10 salarios minimos" }, { "value": "Prefiro nao declarar" }, { "value": "Nao tem renda pessoal" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "14 - Em sua casa alguem recebe auxilio do Governo Federal?  (ESTIMULADA)", "resposta": [{ "value": "SIM" }, { "value": "NAO" }], "tipoPergunta": "Booleanas" }
    , { "pergunta": "15 - Quantos filhos com menos de 18 anos o(a) Sr(a) tem? (ESPONTANEA)", "resposta": [], "tipoPergunta": "EscritaNumber" }
    , { "pergunta": "16 - SE SIM O(s) filho(s) do(a) Sr(a) estuda(m) ou estudara(m) em escola publica ou particular? (ESTIMULADA)", "resposta": [{ "value": "Nao tem filho" }, { "value": " Escola publica" }, { "value": "Escola particular" }, { "value": "Em escola publica E particular" }, { "value": "Eles ainda nao estudam/Nunca estudaram" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "17 - Quando o(a) Sr(a) tem algum problema de saude o(a) Sr(a): (ESTIMULADA)", "resposta": [{ "value": "Vai ao hospital publico /posto de saude  " }, { "value": "Vai ao hospital particular /clinica/consultorio" }, { "value": "Vai aos hospitais publico E particular" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "18 - Sua moradia e:  (ESTIMULADA)", "resposta": [{ "value": "Casa propria" }, { "value": "Aluguel" }, { "value": "Mora de favor" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "19 - Qual sua religiao?  (ESPONTANEO)", "resposta": [{ "value": "Agnostico" }, { "value": "Ateu" }, { "value": "Catolico" }, { "value": "Candomble" }, { "value": "Evangelico" }, { "value": "Evangelico Pentecostal" }, { "value": "Protestante" }, { "value": "Umbandista" }, { "value": "Nenhuma/Nao tem religiao" }, { "value": "Outra" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "21 - O(a)    Sr(a)    tem    titulo    de    eleitor?    (INSTRUCAO: Pessoas que perderam o titulo entram como opcao sim) (ESTIMULADA)", "resposta": [{ "value": "Sim" }, { "value": "Nao" }], "tipoPergunta": "Booleanas" }
    , { "pergunta": "22 - QUAL VEICULO DE COMUNICACAO VOCE MAIS ULTILIZA PARA SE INFORMAR? DE 1 ATE 5  (ESTIMULADA)", "resposta": [], "tipoPergunta": "Enunciado" }
    , { "pergunta": "TELEVISAO", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "CELULAR", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "COMPUTADOR", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "JORNAIS/ REVISTAS", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "RADIO", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "31 - Na sua opiniao quais caracteristicas um bom candidato deve ter? (Escolha ate tres opcoes) (ESTIMULADA)", "resposta": [{ "value": "Honestidade ( FALAR A VERDADE DOA A QUEM DOER)" }, { "value": "Competencia tecnica (PESSOA QUE SABE COMO FAZER AS COISAS)" }, { "value": "Empatia ( QUE ENTENDA AS PESSOAS E SUAS NECESSIDADES)" }, { "value": "Experiencia politica (PESSOA QUE Ja TENHA UMA CARREIRA POLITICA)" }, { "value": "Transparencia (PESSOA NO QUAL SEJA ACESSIVEL E MOSTRE SEU TRABALHO RECORRENTEMENTE)" }, { "value": "Caridosa (AJUDA AS PESSOAS MAIS NECESSITADAS)" }, { "value": "Bons Valores (PESSOA NO QUAL PRESERVAM OS VALORES FAMILIARES)" }], "tipoPergunta": "CheckList" }
    , { "pergunta": "32 - Agora usando as notas de zero a cinco gostaria que o(a) Sr(a) me dissesse o quanto gosta de alguns politicos que vou mencionar. Quero lembrar que 0(zero) significa que o(a) Sr(a) NAO gosta do politico que vou mencionar e 5(cinco) que o(a) Sr(a) gosta muito. De novo se o(a) Sr(a) nao conhecer o politico que eu disser diga apenas que nao o conhece. (ESTIMULADA E UNICA PARA CADA ITEM DA BATERIA) (LER CANDIDATOS – RODIZIAR) ", "resposta": [], "tipoPergunta": "Enunciado" }
    , { "pergunta": "LULA", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "BOLSONARO", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "SIMONE TEBET", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "CIRO GOMES", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "- Subclasse Governador -", "resposta": [], "tipoPergunta": "Enunciado" }
    , { "pergunta": "Fatima Bezerra", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Fabio Dantas", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Capitao Styvenson", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Clorisa Linhares", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "33 - Qual    o    partido    que    melhor    representa    a    maneira    como    o(a)    Sr(a)    pensa?    (ESPONTANEA    E    UNICA)", "resposta": [{ "value": "NAO SIMPATIZO COM NENHUM PARTIDO POLITICO" }, { "value": "NAO SEI" }, { "value": "PARTIDO DEMOCRaTICO TRABALHISTA - PDT" }, { "value": "PARTIDO DOS TRABALHADORES - PT" }, { "value": "MOVIMENTO DEMOCRATICO BRASILEIRO - MDB" }, { "value": "PARTIDO COMUNISTA DO BRASIL - PCdoB" }, { "value": "PARTIDO SOCIALISTA BRASILEIRO - PSB" }, { "value": "PARTIDO DA SOCIAL DEMOCRACIA BRASILEIRA - PSDB" }, { "value": "AGIR - AGIR" }, { "value": "PARTIDO DA MOBILIZACAO NACIONAL - PMN" }, { "value": "CIDADANIA - CIDADANIA" }, { "value": "PARTIDO VERDE - PV" }, { "value": "AVANTE - AVANTE" }, { "value": "PROGRESSISTAS - PP" }, { "value": "PARTIDO SOCIALISTA DOS TRABALHADORES UNIFICADO - PSTU" }, { "value": "PARTIDO COMUNISTA BRASILEIRO - PCB" }, { "value": "PARTIDO RENOVADOR TRABALHISTA BRASILEIRO - PRTB" }, { "value": "DEMOCRACIA CRISTA - DC" }, { "value": "PARTIDO DA CAUSA OPERARIA - PCO" }, { "value": "PODEMOS - PODE" }, { "value": "REPUBLICANOS - REPUBLI" }, { "value": "PARTIDO SOCIALISMO E LIBERDADE - PSOL" }, { "value": "PARTIDO LIBERAL - PL" }, { "value": "PARTIDO SOCIAL DEMOCRATICO - PSD" }, { "value": "SOLIDARIEDADE - SOL" }, { "value": "PARTIDO NOVO - NOVO" }, { "value": "REDE SUSTENTABILIDADE - REDE" }, { "value": "PARTIDO DA MULHER BRASILEIRA - PMB" }, { "value": "UNIDADE POPULAR - UP" }, { "value": "UNIAO BRASIL - UNIAO" }, { "value": "Partido Renovacao Democratica - PRD" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "34- Diga-me na sua opniao o nome de uma pessoa no qual tenha um bom nome para se candidatar a veriador em 2024?", "resposta": [{ "value": "Nao conheco" }, { "value": "outra" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "36 - Se a eleicao fosse hoje em quem voce votaria para PREFEITO? (ESPONTANEO)", "resposta": [{ "value": "Divanize" }, { "value": "Izoares" }, { "value": "Saldanha" }, { "value": "Nao votou por ser maior de 70 anos" }, { "value": "Nao votou por opcao" }, { "value": "Nao votou por ter entre 16 e 17 anos" }, { "value": "Nao votou apenas justificou o voto " }, { "value": "Prefere nao declarar" }, { "value": "Justificou o voto" }, { "value": "Voto nulo" }, { "value": "Voto em branco" }, { "value": "Nao lembra" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "37 - Voce votaria em Divanize para ser reeleita Prefeita?  (ESPONTANEO)", "resposta": [{ "value": "Sim" }, { "value": "Nao" }, { "value": "Talvez" }, { "value": "Nao sei quem e" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "38 - Voce votaria em Zeze Da Agricola para Prefeito?  (ESPONTANEO)", "resposta": [{ "value": "Sim" }, { "value": "Nao" }, { "value": "Talvez" }, { "value": "Nao sei quem e" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "39 - Voce votaria em Fabricio Equipadora para Prefeito? (ESPONTANEO)", "resposta": [{ "value": "Sim" }, { "value": "Nao" }, { "value": "Talvez" }, { "value": "Nao sei quem e" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "40 - Voce votaria em Marcos Antonio para Prefeito? (ESPONTANEO)", "resposta": [{ "value": "Sim" }, { "value": "Nao" }, { "value": "Talvez" }, { "value": "Nao sei quem e" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "41 - Na ultima campanha municipal em Barauna em quem o(a) Sr(a) votou para VEREADOR? (ESPONTANEA) SE NECESSARIO LER OPCOES", "resposta": [{ "value": "Fabio Jr" }, { "value": "Fabricio Equipadora" }, { "value": "Zeze da Agricola" }, { "value": "David Simao" }, { "value": "Neuza" }, { "value": "Helena de Lair" }, { "value": "Artilho" }, { "value": "Raimundo do Poco NOVO" }, { "value": "EDILSON" }, { "value": "MELQUE" }, { "value": "Justificou o voto" }, { "value": "Voto nulo" }, { "value": "Voto em branco" }, { "value": "Outra" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "42 - Como o(a)    sr(a)    avalia a    atuacao do vereador que votou em 2020 caso ele tenha sido eleito? (ESTIMULADO)", "resposta": [{ "value": "Otima" }, { "value": "Boa" }, { "value": "Ruim" }, { "value": "Pessima" }, { "value": "Regular para bom" }, { "value": "Regular para ruim" }, { "value": "Nao foi eleito" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "43 - Na sua opiniao de uma maneira geral a Gestao da atual prefeita nos ultimos 3 anos foi  (ESTIMULADA)", "resposta": [{ "value": "MUITO BOA" }, { "value": "BOA" }, { "value": "RUIM" }, { "value": "PESSIMA" }, { "value": "PREFIRO NAO RESPONDER" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "44 - Eu vou ler varias situacoes e gostaria que o(a) Sr(a) dissesse se o    senhor votaria: (ESTIMULADA)", "resposta": [], "tipoPergunta": "Enunciado" }
    , { "pergunta": "  • Em um candidato que oferece cestas basicas de alimentos para familias muito pobres:", "resposta": [{ "value": "Sim" }, { "value": "Nao" }], "tipoPergunta": "Booleanas" }
    , { "pergunta": "  • Em um candidato que conseguisse para uma mae vaga para matricular seu filho na escola.\t", "resposta": [{ "value": "Sim" }, { "value": "Nao" }], "tipoPergunta": "Booleanas" }
    , { "pergunta": "  • Em um candidato que oferecesse um caminhao de tijolos para varias familias que precisam acabar de construir suas casas\t", "resposta": [{ "value": "Sim" }, { "value": "Nao" }], "tipoPergunta": "Booleanas" }
    , { "pergunta": "  • Em um candidato que  oferece reformar um campo de futebol para um grupo de amigos que jogam bola juntos toda semana\t", "resposta": [{ "value": "Sim" }, { "value": "Nao" }], "tipoPergunta": "Booleanas" }
    , { "pergunta": "  • Em um candidato que so fizesse o bem pensando no coletivo buscando melhorias para o bem comum de varios ou de toda uma populacao atraves de leis projetos prestacao de contas do dinheiro publico e nao desse prioridade a necessidades individuais e particulares como as citadas anteriormente:\t", "resposta": [{ "value": "Sim" }, { "value": "Nao" }], "tipoPergunta": "Booleanas" }
    , { "pergunta": "45 - Como voce avalia a transparencia e prestacao de contas da gestao atual? (ESTIMULADA)", "resposta": [{ "value": "Satisfatorio" }, { "value": "Insatisfatorio" }, { "value": "Neutro" }, { "value": "Nao acompanho" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "46 - Eu me sinto representado pelos politicos locais de 1 a 5: (ESTIMULADA)", "resposta": [{ "value": "Concordo plenamente sinto que eles refletem minhas preocupacoes. (Sentimento: Identificacao Contentamento)" }, { "value": "Nem sempre acho que ha certa desconexao com as necessidades da populacao. (Sentimento: Desconexao Insatisfacao)" }, { "value": "Discordo sinto-me completamente sub-representado. (Sentimento: Descontentamento Alienamento)" }], "tipoPergunta": "Estrelas" }
    , { "pergunta": "47 - Vou citar alguns servicos publicos da cidade e gostaria que o (a) Sr. (a) desse uma nota de 0 a 5 para dizer o quanto esta satisfeito com cada um deles em Barauna. De 0 a 5 que nota o (a) Sr(a) da para. (ESTIMULADA)", "resposta": [], "tipoPergunta": "Enunciado" }
    , { "pergunta": " A coleta de lixo\t", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "A policia\t", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "A limpeza das ruas e calcadas\t", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "O estado de manutencao das ruas e calcadas da cidade\t", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "O controle dos camelos mesas de bar e bancas de lojas\t", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "As quadras pracas e espacos de lazer da cidade", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "As escolas publicas", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "O servico de saude publica\t", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "A iluminacao das ruas e pracas", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "O servico de agua\t", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "O servico de esgoto", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "49 - O que mais influencia sua decisao de voto? (ESTIMULADO)", "resposta": [{ "value": "Propostas de campanha" }, { "value": "Historico do candidato" }, { "value": "Ideologia poletica" }, { "value": "Debates eleitorais" }, { "value": "Amizade com candidato" }, { "value": "Amizade com as pessoas" }, { "value": "Uma ajuda com algum favor" }, { "value": "Escolho na hora mesmo" }, { "value": "Outra" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "50 - Voce acha que deveria existir uma mudanca na prefeitura da cidade?", "resposta": [{ "value": "Sim" }, { "value": "Nao" }], "tipoPergunta": "Booleanas" }
    , { "pergunta": "55-1 - QUAL O PRINCIPAL PROBLEMA DA SUA REGIAO SITIO/BAIRRO NA SUA OPINIAO?  (ESPONTANEO)", "resposta": [""], "tipoPergunta": "EscritaText" }
    , { "pergunta": "55-2 - Representando sua comunidade/ regiao voce teria alguma ideia inovadora ou sugestao criativa que acredita que poderia melhorar Barauna e que gostaria que a proxima gestao implementasse na sua comunidade ou regiao? (ESPONTANEO)", "resposta": [""], "tipoPergunta": "EscritaText" }
    , { "pergunta": "56 - Na sua opiniao dos vereadores eleitos em 2020, avalie os que mais cumpriram e menos cumpriram suas funcoes do cargo para a populacao: Sendo de 0 ate 5, onde zero e indicativo de uma ma gestao do cargo e quanto mais proximo de 5 melhor gestao o candidato fez:", "resposta": [], "tipoPergunta": "Enunciado" }
    , { "pergunta": "FABIO JR", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "FABRICIO EQUIPADORA", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "ZEZE DA AGRICOLA", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "DAVID SIMAO", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "NEUZA", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "HELENA DE LAIR", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "ARTILHO", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "RAIMUNDO DO POCO NOVO", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "EDILSON", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "MELQUE", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "ZULENE", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "59 - MANDE UMA MENSAGEM PARA OS POLITICOS DA CIDADE DE BARAUNA Avaliando a gestao atual nas seguintes areas: de 0 ate 5 (ESPONTANEO)", "resposta": [], "tipoPergunta": "EscritaText" }
    , { "pergunta": "Avalie a gestão atual de 0 até 5 e em seguida justifique a sua resposta das seguintes áreas:", "resposta": [], "tipoPergunta": "Enunciado" }
    , { "pergunta": "Saude ", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da saude em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Falta de medicos e profissionais de saude" }, { "value": "Infraestrutura inadequada em hospitais e postos de saude" }, { "value": "Acesso limitado a medicamentos" }, { "value": "Falta de programas de prevencao" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Educacao", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da educacao em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Falta de estrutura nas escolas" }, { "value": "Baixa qualidade do ensino" }, { "value": "Falta de acesso a educacao infantil" }, { "value": "Ausencia de programas extracurriculares" }, { "value": "Necessidade de mais capacitacao para professores" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Infraestrutura", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da infraestrutura em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Ma conservacao de ruas e estradas" }, { "value": "Falta de iluminacao publica adequada" }, { "value": "Saneamento basico deficiente ou inexistente" }, { "value": "Falta de coleta seletiva de lixo" }, { "value": "Ausencia de areas de lazer" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Emprego", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da emprego em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Falta de industrias e empresas locais" }, { "value": "Carencia de programas de capacitacao profissional" }, { "value": "Falta de concurso publico" }, { "value": "Limitada oferta de empregos formais" }, { "value": "Insuficiente apoio a pequenos negocios" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Seguranca publica", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da Seguranca publica em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Aumento da criminalidade" }, { "value": "Falta de iluminacao em areas publicas" }, { "value": "Carencia de efetivo policial" }, { "value": "Necessidade de programas de prevencao" }, { "value": "Ausencia de cameras de seguranca" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Situacao ambiental", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da Situacao ambiental em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Falta de local adequado para o lixo acumulado" }, { "value": "Falta de coleta seletiva de lixo" }, { "value": "Desmatamento desenfreado e degradacao ambiental" }, { "value": "Necessidade de areas verdes e parques" }, { "value": "Problemas com o abastecimento de agua" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Cultura", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da cultura em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Festivais de musica" }, { "value": "Exposicoes de arte" }, { "value": "Pecas teatrais" }, { "value": "Feiras culturais" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Lazer e recreacao", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da lazer e recreacao em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Parques publicos" }, { "value": "Quadras esportivas" }, { "value": "Pistas de caminhada" }, { "value": "areas de picnic" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Esporte", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da esporte em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Manutencao das quadras" }, { "value": "Melhoria na iluminacao" }, { "value": "Novos equipamentos" }, { "value": "Construcao de novas areas esportivas" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Causa animal", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da causa animal em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Campanhas de castracao" }, { "value": "Abrigos para animais de rua" }, { "value": "Programas de conscientizacao" }, { "value": "Reforco nas leis de protecao animal" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Empreendedorismo", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da empreendedorismo em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Cursos de capacitacao" }, { "value": "Linhas de credito" }, { "value": "Feiras de empreendedorismo" }, { "value": "Incentivos fiscais" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Direitos da Mulher", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "Qual o principal desafio enfrentado na area da mireitos da Mulher em Barauna? ", "resposta": [{ "value": "Nao sei" }, { "value": "Patrulhas especificas" }, { "value": "Programas de conscientizacao" }, { "value": "Maior presenca policial" }, { "value": "Apoio a vitimas de violencia" },  { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "Acessibilidade e atendimento de pessoa com NEEE (pessoas autistas, TDH e outras)", "resposta": [], "tipoPergunta": "Estrelas" }
    , { "pergunta": "O que seria prioridade para a gestão municipal no quesito acessibilidade de pessoas com deficiência ou NEE:", "resposta": [{ "value": "Adaptacao de espacos publicos para acessibilidade" }, { "value": "Programas de inclusao e capacitacao profissional para pessoas com deficiencia/NEE" }, { "value": "Ampliar calcadas regulares e com piso tatil" }, { "value": "Concursos para profissionais que atuariam como auxiliares nos servicos educacionais para criancas, jovens e adultos com NEE ou alguma deficiencia" }, { "value": "Outro" }], "tipoPergunta": "Selecao" }
    , { "pergunta": "74 - Para terminar eu gostaria de ouvir sua opiniao sobre o questionario. O que o(a) Sr(a) achou do questionario: longo interessante chato ou importante? Voce pode dar mais de uma resposta.(ESTIMULADO)", "resposta": [{ "value": "Importante" }, { "value": "Longo" }, { "value": "Interessante" }, { "value": "Chato" }], "tipoPergunta": "Selecao" }
  ];
  const initialState = Array(formularioCompleto.length + 1).fill('');
  const [respostas, setRespostas] = useState(Array(formularioCompleto.length).fill(''));
  const downloadFromUrl = async () => {
    try {
      const origem = `${FileSystem.documentDirectory}${nomeArquivo}`;
      const destino = `${FileSystem.cacheDirectory}Download/${nomeArquivo}`; // Pasta de Downloads
      // Verificar se o arquivo ja existe no destino
      const fileInfo = await FileSystem.getInfoAsync(destino);

      if (!fileInfo.exists) {
        alert('O arquivo Baraunas.csv ainda nao foi criado');
        return;
      }

      // Copiar o arquivo para a pasta de downloads
      await FileSystem.copyAsync({ from: origem, to: destino });
      alert('Arquivo copiado para a pasta de downloads!');
    } catch (error) {
      console.error('Erro ao copiar o arquivo:', error);
      alert('Error em copiar o arquivo para pasta de download.');
    }

  };
  async function compartilhar() {
    try {
      const csvFilePath = `${FileSystem.documentDirectory + nomeArquivo}`;
      // Verificar se o arquivo CSV ja existe
      const fileInfo = await FileSystem.getInfoAsync(csvFilePath);
      if (!fileInfo.exists) {
        // Se o arquivo nao existir, criar um novo
        const initialCSVData = [
          formularioCompleto.map(item => item.pergunta)
        ];
        const initialCSV = Papa.unparse(initialCSVData);
        await FileSystem.writeAsStringAsync(csvFilePath, initialCSV, { encoding: FileSystem.EncodingType.UTF8 });
      }
      // Ler o conteudo do arquivo CSV
      const fileContent = await FileSystem.readAsStringAsync(csvFilePath, { encoding: FileSystem.EncodingType.UTF8 });
      // Analisar o conteudo do arquivo CSV
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
      // Verificar se o arquivo CSV ja existe
      const fileInfo = await FileSystem.getInfoAsync(csvFilePath);
      if (!fileInfo.exists) {
        // Se o arquivo nao existir, criar um novo com cabecalho
        const initialCSVData = [formularioCompleto.map(item => item.pergunta)];
        const initialCSV = Papa.unparse(initialCSVData);
        await FileSystem.writeAsStringAsync(csvFilePath, initialCSV, { encoding: FileSystem.EncodingType.UTF8 });
      }
      // Ler o conteudo do arquivo CSV
      const fileContent = await FileSystem.readAsStringAsync(csvFilePath, { encoding: FileSystem.EncodingType.UTF8 });
      let dadosPlanilha = processarTexto(fileContent)
      // Analisar o conteudo do arquivo CSV
      const parsedData = Papa.parse(fileContent, { header: true }).data;
      // Adicionar nova linha aos dados
      parsedData.push(newData);
      dadosPlanilha.push(newData);
      // Converter a matriz de dados para CSV
      let updatedCSV = Papa.unparse(dadosPlanilha);

      updatedCSV = updatedCSV.replace(/""/g, '');
      // Sobrescrever o arquivo CSV com os novos dados
      // Usar o metodo append para adicionar a nova linha sem sobrescrever 
      await FileSystem.writeAsStringAsync(csvFilePath, updatedCSV, { encoding: FileSystem.EncodingType.UTF8 });
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
    const arrayDeArrays = linhas.map((linha) => linha.split('\n')); // Altere a virgula para o separador desejado
    return arrayDeArrays;
  }
  const salvarVariavelLocal = async () => {
    try {
      await AsyncStorage.setItem(key, nome);
      console.log('Variavel local salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar variavel local:', error);
    }
  };
  async function primeiroAcesso() {
    salvarVariavelLocal()
    setAplicadorExistente(true)

    const csvFilePath = `${FileSystem.documentDirectory + nomeArquivo}`;
    const initialCSVData = [[`Nome do aplicador: ${nome}`], formularioCompleto.map(item => item.pergunta)];
    const initialCSV = Papa.unparse(initialCSVData);
    await FileSystem.writeAsStringAsync(csvFilePath, initialCSV, { encoding: FileSystem.EncodingType.UTF8 });
  }
  function updateRespostas(index: number, resposta: any) {
    setRespostas((prevRespostas) => {
      const newRespostas = [...prevRespostas];
      newRespostas[index] = resposta;
      return newRespostas;
    });
  }
  useEffect(() => {
    updateRespostas(26, substituirVirgulaPorPonto(questaoimportantes));
  }, [questaoimportantes])
  useEffect(() => {
    updateRespostas(27, substituirVirgulaPorPonto(bomCandidatoCaracteristica));
  }, [bomCandidatoCaracteristica])
  useEffect(() => {
    if (respostas[14] == '0')
      updateRespostas(15, "Nao tem filho");
  }, [respostas[14]])

  if (!aplicadorExistente) {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: "#d3d3d3" }}>
      <Image source={require('./assets/baraunaicon.png')} style={{ width: 160, height: 160, marginTop: 120, }} />
      <Text style={{ fontWeight: '800', }} >
        CIDADE DE BARAUNAS
      </Text>
      <Text style={styles.titulo}>
        Antes de iniciarmos a pesquisa informe o seu nome
      </Text>
      <TextInput
        label="Digite o seu nome"
        value={nome}
        onChangeText={(text) => { setNome(text) }}
        style={styles.inputText}
      />
      <Button mode="contained" style={[styles.buttons, { marginTop: '5%', marginBottom: '60%' }]} onPress={primeiroAcesso} disabled={nome != '' ? false : true}>
        <Text style={{ fontFamily: 'Roboto', fontWeight: "700", fontSize: 18 }}>
          Comecar a pesquisa
        </Text>
      </Button>
      <Text style={{ alignItems: 'flex-end', color: '#0c0c0c', fontWeight: '600' }}>
        Versão 1.0
      </Text>
    </View>)
  }
  else {
    return (
      <ScrollView  >
        <StatusBar backgroundColor={'purple'} animated={true} showHideTransition={"fade"} />
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 60, backgroundColor: 'purple', borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: "700", fontFamily: "Roboto" }}>
            Pesquisa Baraunas
          </Text>
        </View>
        <View style={{ padding: 8 }}>{
          formularioCompleto.map((questao, index) => {
            return (<View key={"ViewP-" + index.toString()}>
              <View >
                <Text style={styles.pergunta}>
                  {/* Index{index} Pergunta-  */}
                  {questao.pergunta}
                </Text>
                {
                  questao.tipoPergunta == "Enunciado" ?
                    null
                    : questao.tipoPergunta == "EscritaText" ? 
                        <TextInput
                          label={"Digite a mensagem"}
                          inputMode={'text'}
                          onChangeText={(text) => { updateRespostas(index, substituirVirgulaPorPonto(text)); }}
                          style={styles.inputText}
                        /> 
                      : questao.tipoPergunta == "EscritaNumber" ? 
                          <TextInput
                            label={"Digite a quantidade"}
                            inputMode={'numeric'}
                            onChangeText={(text) => { updateRespostas(index, substituirVirgulaPorPonto(text)); }}
                            style={styles.inputText}
                          /> 
                        : questao.tipoPergunta == "CheckList" ?
                          <View  >
                            <CheckboxList options={questao.resposta} selectedOptions={index == 26 ? questaoimportantes : bomCandidatoCaracteristica} onSelect={index == 26 ? setQuestaoimportantes : setBomCandidatoCaracteristica} />
                            {respostas[index] ? <Text style={{ color: 'green', textAlign: 'center' }}>{respostas[index]}</Text> : null}
                          </View>
                          : questao.tipoPergunta == "Estrelas" ?
                            <View >
                              <StarRating rating={respostas[index]} onStarPress={(nota: any) => { updateRespostas(index, nota); }} />
                            </View>
                            : questao.tipoPergunta == "Booleanas" ?
                              <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                                <TouchableOpacity
                                  style={[styles.checkbox, respostas[index] == "SIM" && styles.checkedYes, { flex: 1, alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center' }]}
                                  onPress={() => { updateRespostas(index, "SIM"); }}>
                                  <Text style={respostas[index] == "SIM" ? styles.labelSelect : styles.labelNotSelect}>SIM</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[styles.checkbox, respostas[index] == "NAO" && styles.checkedNo, { flex: 1, alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center' }]}
                                  onPress={() => { updateRespostas(index, "NAO") }} >
                                  <Text style={respostas[index] == "NAO" ? styles.labelNaoSelect : styles.labelNotSelect}>NAO</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[styles.checkbox, respostas[index] == "NAO SEI" && styles.checkedNaoSei, { flex: 1, alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center' }]}
                                  onPress={() => { updateRespostas(index, "NAO SEI"); }}>
                                  <Text style={respostas[index] == "NAO SEI" ? styles.labelSelect : styles.labelNotSelect}>NAO SEI</Text>
                                </TouchableOpacity>
                              </View>
                              : questao.tipoPergunta == "Selecao" ?
                                <View>
                                  <Select setOpcaoSelecionada={updateRespostas} indexDaPergunta={index} opcaoSelecionada={respostas[index]} opcoes={index == 2 ? regioesDiferentes[respostas[1] == 'CENTRO' ? 0 : respostas[1] == 'NORTE' ? 1 : respostas[1] == 'SUL' ? 2 : respostas[1] == 'LESTE' ? 3 : respostas[1] == 'OESTE' ? 4 : 0] : questao.resposta} />
                                  {(respostas[index].toLowerCase().includes("outro")) || (respostas[index].toLowerCase().includes("outra")) ?
                                    <TextInput
                                      label={"Digite o que seria esse outro"}
                                      // value={text}
                                      inputMode={'text'}
                                      onChangeText={(text) => {updateRespostas(index, "outro: " + text); }}
                                      style={styles.inputText}
                                    />
                                    : null
                                  }
                                  {respostas[index] ? <Text style={{ color: 'green', textAlign: 'center' }}>{respostas[index]}</Text> : null}
                                </View>
                                :
                                <Text>
                                  O index: {index} SEM TIPO
                                </Text>
                }
              </View>
            </View>)
          })
        }
        </View>
        <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={downloadFromUrl}  >
              <Feather name="download" size={30} color="purple" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <Button mode="contained" style={styles.buttons} onPress={handleSaveData}>
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  checkedYes: {
    backgroundColor: 'green',
    borderColor: 'puple',
  },
  checkedNo: {
    backgroundColor: 'red',
    borderColor: 'puple',
  },
  checkedNaoSei: {
    backgroundColor: 'orange',
    borderColor: 'puple',
  },
  labelSelect: {
    color: 'white',
    fontWeight: '700'
  },
  labelNaoSelect: {
    color: 'white',
    backgroundColor: 'red',
    fontWeight: '700'
  },
  labelNotSelect: {
    color: '#000',

    fontWeight: '700'
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
  checkboxb: {
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
