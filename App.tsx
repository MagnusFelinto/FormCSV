import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, StatusBar, } from 'react-native';
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
//import * as SQLite from 'expo-sqlite';

export default function App() {
  const nomeArquivo = 'baraunasPlanilha.csv'
  const key = 'testando2'
// const db = SQLite.openDatabase('myDatabase.db');

// db.transaction(tx => {
//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);',
//     [],
//     () => {
//       console.log('Table created successfully!');
//     },
    
//   );
// });
//   console.log(db._name)
//   async function criar(){
//     db.transactionAsync(tx =>{
//       tx.executeSqlAsync('',
//             [],
             
//           )
//     })
//   }
//   async function read(){
//     db.transactionAsync(tx =>{
//       tx.executeSqlAsync('',
//             [],
             
//           )
//     })
//   }
  const scrollViewRef = useRef(); 
  const [nomeDoAplicador, setNomeDoAplicador] = useState('');
  const [nome, setNome] = useState('');
  const [aplicadorExistente, setAplicadorExistente] = useState(false); 
  const [casaVeiculo, setCasaVeiculo] = useState(''); 
  const [escolhaCandidato, setEscolhaCandidato] = useState('') 
  const [bomCandidatoCaracteristica, setBomCandidatoCaracteristica] = useState('') 
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm();
 
//  function resertar(){
//   reset();
//   setRespostas(initialState)
//   scrollToBottom()
//  }
function substituirVirgulaPorPonto(arrayVar:any){ 
    let stringResult = ''; 
    for (let i = 0; i < arrayVar.length; i++) {
      stringResult += arrayVar[i]; 
      if (i < arrayVar.length - 1) {
        // Adiciona um ponto e espaço entre os elementos, exceto no último
        stringResult += '. ';
      }
    }
    
    return stringResult

}
function teste() { 
  preencharTudo()
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
  console.log(respostas)
  console.log("respostas") 
  console.warn(respostas.toString())
  console.warn(respostas[20])
  console.warn(respostas[33])
  console.warn(respostas[35])
  console.log(respostas[20])
  console.log(respostas[33])
  console.log(respostas[35])
} 
  const scrollToBottom = () => {
    scrollViewRef.current.scrollTo(0, 0, { animated: true });
  };
  function preencharTudo(){
    console.log(Object.keys(errors)[0])
    if (Object.keys(errors).length > 0) { 
      alert('Preencha todos os campos obrigatórios');
    }
  }
  const handleSaveData = () => { 
    scrollToBottom() 
    updateRespostas(35, substituirVirgulaPorPonto(bomCandidatoCaracteristica))
    updateRespostas(33, substituirVirgulaPorPonto(escolhaCandidato))
    updateRespostas(20, substituirVirgulaPorPonto(casaVeiculo)) 
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
    updateRespostas(colunasPesquisa3.length+1,dataHoraFormatada) 
    saveDataToCSV(respostas);
    setRespostas(initialState)
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
  const colunasPesquisa3 = [
    ["0 - SEXO"],
    ["1 - PERFIL DO ENTREVISTADO (ESTIMULADA)"],
    ["2 - ZONA  (ESPOTANIA)"],
    ["3 - REGIÃO  (ESPONTANEA)"],
    ["4 - Qual é a sua orientação sexual?  (ESTIMULADA)"],
    ["5 - Você se identifica como?  (ESTIMULADA)"],
    ["6 - IDADE"],
    ["7 - Estado Civil"],
    ["8 - Você estuda ou estudou, em escola pública ou privada (ESTIMULADA E ÚNICA)"],
    ["9 - NIVEL DE ESCOLARIDADE  (ESTIMULADA)"],
    ["10 - Você poderia me dizer qual é aproximadamente a sua renda mensal pessoal? (SE NÃO RESPONDER ESPONTANEAMENTE APRESENTE AS OPÇÕES)"],
    ["11 - De onde vem sua fonte de renda?  (ESTIMULADA)"],
    ["12 - Quantas pessoas moram contigo na sua casa?  (ESPONTANEA)"],
    ["13 - O(a) sr(a). poderia me dizer qual é aproximadamente a sua renda mensal de sua casa, caso tenha? (ESPONTANEA/ ESTIMULADA)"],
    ["14 - Em sua casa alguém recebe auxílio do Governo Federal?  (ESTIMULADA)"],
    ["15 - Quantos filhos com menos de 18 anos o(a) Sr(a) tem? (ESPONTÂNEA)"],
    ["16 - SE SIM, O(s) filho(s) do(a) Sr(a) estuda(m) ou estudara(m) em escola pública ou particular? (ESTIMULADA)"],
    ["17 - Quando o(a) Sr(a) tem algum problema de saúde, o(a) Sr(a): (ESTIMULADA)"],
    ["18 - Sua moradia é:  (ESTIMULADA)"],
    ["19 - Qual sua religião?  (ESPONTANEO)"],
    ["20 - Na sua casa qual tipo de veiculo existe? (ESTIMULADA)  (selecione  as opções que existir em ordem)"],
    ["21 - O(a)    Sr(a)    tem    título    de    eleitor?    (INSTRUÇÃO: Pessoas que perderam o título entram como opção sim) (ESTIMULADA)"],
    ["22 - QUAL VEICULO DE COMUNICAÇÃO VOCÊ MAIS ULTILIZA PARA SE INFORMAR? DE 1 ATÉ 5  (ESTIMULADA)"],
    ["TELEVISÃO"],
    ["CELULAR"],
    ["JORNAIS/ REVISTAS"],
    ["RÁDIO"],
    ["23 - Você costuma discutir política com amigos/família/colegas?  (ESTIMULADA)"],
    ["24 - Você já participou de alguma manifestação política? Seja participação em carreata, ou qualquer coisa do gênero   (ESTIMULADA)"],
    ["25 - SE SIM, Durante a última campanha eleitoral para prefeito em Baraúna-RN, o(a) Sr(a) tentou convencer alguém a votar em algum candidato ou partido? (ESTIMULADA)"],
    ["26 -  SE SIM, Durante    as últimas eleições para prefeito deste município o(a) Sr(a) mostrou seu apoio a algum candidato ou partido, participando de    reuniões,    colando cartazes ou distribuindo panfletos?    (Se    sim) Com    que frequência: (ESTIMULADA)    "],
    ["27 -  SE SIM, E    o(a)    Sr(a)    colocou    faixas    ou    cartazes    de    algum    candidato em sua casa, no trabalho, ou colou    adesivo    no    carro? "],
    ["28 -  SE SIM, Durante    a    campanha    eleitoral    um    candidato    ou    uma    pessoa    de    qualquer    partido    entrou    em    contato    com    o(a)    Sr(a)    para    pedir    o    seu    voto?"],
    ["29 - Quais questões são mais importantes para você na escolha de um candidato? (Escolha as três mais importantes, DA MAIOR PARA A MENOR)  (ESTIMULADA)"],
    ["30 - Qual dessas questões você acredita que seu candidato ideal deveria priorizar?  (ESTIMULADA)"],
    ["31 - Na sua opinião, quais características um bom candidato deve ter? (Escolha até três opções) (ESTIMULADA)"],
    ["32 - Agora usando as notas de zero a dez, gostaria que o(a) Sr(a) me dissesse o quanto gosta de alguns políticos que vou mencionar. Quero lembrar que, zero significa que o(a) Sr(a) NÃO gosta do político que vou mencionar e dez que o(a) Sr(a) gosta muito. De novo, se o(a) Sr(a) não conhecer o político que eu disser, diga apenas que não o conhece. (ESTIMULADA E ÚNICA PARA CADA ITEM DA BATERIA) (LER CANDIDATOS – RODIZIAR) "],
    ["LULA"],	
    ["BOLSONARO"]	,
    ["SIMONE TEBET"]	,
    ["CIRO GOMES"]	,
    ["FELIPI D'ÁVILA"]	,
    ["CABO DARCIOLO"],	
    ["PADRE KELMON"],	 
    ["33 - Qual    o    partido    que    melhor    representa    a    maneira    como    o(a)    Sr(a)    pensa?    (ESPONTÂNEA    E    ÚNICA)"],
    ["34 - ENTRE OS CANDIDATOS ABAIXO QUEM VOCÊ VOTOU NA ULTIMA ELEIÇÃO PARA GOVERNADOR?  (ESPONTANEO)"],
    ["35 - Em quem o(a) Sr(a) votou para prefeito na última eleição, município de baraúna? (ESPONTANEO)"],
    ["36 - Se a eleição fosse hoje, em quem você votaria para PREFEITO? (ESPONTANEO)"],
    ["37 - Você votaria em Divanize para ser reeleita Prefeita?  (ESPONTANEO)"],
    ["38 - Você votaria em Zezé Da Agrícola para Prefeito?  (ESPONTANEO)"],
    ["39 - Você votaria em Saldanha para Prefeito? (ESPONTANEO)"],
    ["40 Você votaria em Izoares Martins para Prefeito? (ESPONTANEO)"],
    ["41 -  Na    ultima campanha municipal em Baraúna/RN ,    em    quem    o(a)    Sr(a)    votou    para    VEREADOR?    (ESPONTANEA)  SE NECESSARIO  LER    OPÇÕES"],
    ["42 - Como    o(a)    sr(a)    avalia a    atuação do vereador que votou em 2020, caso ele tenha sido eleito? (ESTIMULADO)"],
    ["43 - Na sua opinião, de uma maneira geral, a Gestão da atual prefeita nos últimos 3 anos foi  (ESTIMULADA)"],
    ["44 - Eu vou ler várias situações e gostaria que o(a) Sr(a) dissesse se o    senhor votaria: (ESTIMULADA)"],
    ["  • Em um candidato que oferece cestas básicas de alimentos para famílias muito pobres:"],
    ["  • Em um candidato que conseguisse para uma mãe, vaga para matricular seu filho na escola.	"],
    ["  • Em um candidato que oferecesse um caminhão de tijolos para várias famílias que precisam acabar de construir suas casas	"],
    ["  • Em um candidato que  oferece reformar um campo de futebol para um grupo de amigos que jogam bola juntos toda semana	"],
    ["  • Em um candidato que só fizesse o bem pensando no coletivo, buscando melhorias para o bem comum de vários ou de toda uma população, através de leis, projetos, prestação de contas do dinheiro público e não desse prioridade a necessidades individuais e particulares, como as citadas anteriormente:	"],
    ["45 - Minha confiança em relação a prefeita atual é de: (ESTIMULADA)"],
    ["46 - Eu me sinto representado pelos políticos locais: (ESTIMULADA)"],
    ["47 - Vou citar alguns serviços públicos da cidade e gostaria que o (a) Sr. (a) desse uma nota de 0 a 10 para dizer o quanto está satisfeito com cada um deles em Baraúna/RN. De 0 a 5, que nota o (a) Sr(a) dá para. (ESTIMULADA)"],
    [" A coleta de lixo	"],
    ["A polícia	"],
    ["A limpeza das ruas e calçadas	"],
    ["O estado de manutenção das ruas e calçadas da cidade	"],
    ["O controle dos camelôs, mesas de bar e bancas de lojas	"],
    ["As quadras, praças e espaços de lazer da cidade"],	
    ["As escolas públicas"],	
    ["O serviço de saúde pública	"],
    ["A iluminação das ruas e praças"],	
    ["O serviço de água	"],
    ["O serviço de esgoto"],
    ["48 - Minha visão sobre a política municipal é influenciada por:  (ESTIMULADA)"],
    ["49 - O que mais influencia sua decisão de voto? (ESTIMULADO)"],
    ["50 - Você acha que deveria existir uma mudança na prefeitura da cidade?"],
    ["51 - Nos    últimos    3    anos    o(a)    Sr(a)    fez    contato    com    algum    político,    ou    alguém    que    trabalha    na gestão    municipal,    para    pedir a solução de algum problema que prejudicava muitas pessoas    ou reclamar do próprio    governo?    (ESPONTÂNEA)"],
    ["52 - SE SIM, O problema, após contato ou reclamação, foi resolvido"],
    ["54 - AVALIE OS PROBLEMAS DA CIDADE DE BARÚNA NA SUA OPNIÃO, COM NOTAS DE 1 A 5. SENDO QUANDO MAIS PROXIMO DE 1 MENOR PRIORIDADE VOCÊ DÁ A ESSE PROBLEMA E QUANTO MAIS PROXIMO DE 5 MAIOR É A PRIORIDADE DESSE PROBLEMA.  (ESTIMULADO) "],
    ["1 Desemprego"],
    ["2 Saúde"],
    ["3 Educação"],
    ["4 Pobreza"],
    ["5 Salário"],
    ["6 Violência"],
    ["7 Corrupção"],
    ["11 Política"],
    ["12 Fome"],
    ["13 Desigualdade	"],
    ["14 Trânsito"],
    ["15 Enchentes"],
    ["17 Favelas"],
    ["18 Água	"],
    ["19 Esgoto	"],
    ["20 Urbanismo	"],
    ["21 Estacionamento	"],
    ["22 Transporte público	"],
    ["23 Infraestrutura	"],
    ["24 Lazer	"],
    ["55 - Representando sua comunidade/ região, você teria alguma ideia inovadora ou sugestão criativa que acredita que poderia melhorar Baraúna e que gostaria que a próxima gestão implementasse na sua comunidade ou região? (ESPONTANEO)"],
    ["56 - Como você imagina nossa comunidade nos próximos anos? O que você gostaria de ver mudado ou melhorado?  (ESPONTANEO)"],
    ["57 - QUAL O PRINCIPAL PROBLEMA DA SUA REGIÃO SITIO/BAIRRO NA SUA OPNIÃO?  (ESPONTANEO)"],
    ["58- Quais ações ou mudanças você gostaria que a prefeitura implementasse em Baraúna para melhorar a qualidade de vida na cidade?  (ESPONTANEO)"],
    ["59 - MANDE UMA MENSAGEM PARA OS POLITICOS DA CIDADE DE BARAÚNA  (ESPONTANEO)"],
    ["60 - Para    terminar    eu    gostaria    de    ouvir    sua    opinião    sobre    o    questionário.    O    que    o(a)    Sr(a)    achou    do    questionário:    longo,    interessante,    chato    ou    importante?    Você    pode    dar    mais    de    uma    resposta.(ESTIMULADO)"],
  ]
  const RespostasPesquisa3 = [
    //[],// Horario
    ["MASCULINO", "FEMININO"],
    ["ESTUDANTE DO ENSINO MÉDIO", "SERVIDOR PÚBLICO", "COMERCIANTE", "UNIVERSITARIO", "COMUNIDADE GERAL", "AGRICULTOR"],
    ["NORTE", "SUL", "LESTE", "OESTE", "URBANA"],
    ["Campestre", "Juremal", "Primavera", "Vertentes", "CENTRO", "PRIMAVERA", "ALTO DA AVENIDA", "CAMPO VERDE", "CINDERELA", "SUB-ESTAÇÃO", "DAS PALMEIRAS", "FILADELFIA", "Florêncio", "Vila Nova III", "Angicos", "PA Pico Estreito", "PA Caatingueira", "Vila Nova II", "Vila Nova I", "PA Real", "Córrego de Pedra", "Santa Maria", "Aroeira Grande", "AV. Senhor Petrolino Portela", "PA Tiradentes", "PA Vitória", "Mato Alto", "Velame I", "Formigueiro", "Velame II", "Lajedo de Ouro", "Maxixe", "Olho d'gua da Escada", "Lajedo Mel", "Sumidouro", "Mata Burro", "PA Bom Sucesso dos Militares", "Canaã", "Lajedo do Sebo", "KM.31", "Boa Sorte", "PA Poço Novo II", "PA Fazenda Poço Baraúna (Poco I)", "Baixa Branca", "Veneza", "Recreio", "PA Santa Clara", "Boa Água", "PA Formosa", "Banco da Terra", "PA Ouro Verde", "Rancho DO",],
    ["Héterossexual", "Bissexual", "Lésbica", "Pansexual", "Queer", "Outra"],
    ["1 Preto", "2 Pardo", "3 Branco", "4 Amarelo", "5 Índio",],
    [ /* Idade*/],
    ["Solteiro(a)", "Casado(a)/ comp.(a)", "Viuvo(a)", "Desquitado(a)/ Divorciado(a)", "Separado(a)",],
    ["1 Escola pública", " 2 Escola particular", "3 Em escola pública E particular", " 4 Nunca frequentei a escola",],
    ["ANALFABETO", "ENSINO FUNDAMENTAL I", "ENSINO FUNDAMENTAL II", "ENSINO MÉDIO INCOMPLETO", "ENSINO MÉDIO COMPLETO", "ENSINO SUPERIOR INCOMPLETO", "ENSINO SUPERIOR COMPLETO", "PÓS GRADUAÇÃO", "DOUTORADO",],
    ["Até R$ 260,00", "De R$ 260,01 até R$ 520,00", "De R$ 520,01 até R$ 780,00", "De R$ 780,01 até R$ 1.320,00", "De R$ 1.320,01 até R$ 2.600,00", "De R$ 2.600,01 até R$ 5.200,00", "De R$ 5.200,01 até R$ 7.800,00", "Mais de R$ 7.800,00", "Não tem renda pessoal", "Não sei/Não respondeu"],
    ["Agricultor", "Aposentadoria", "Autônomo", "Auxílio governamental", "Bolsa de Estudos", "Comerciante", "Desemprego", "Servidor Público", "Trabalho com carteira assinada (CLT)", "Outra"],
    [/*Quantidade de pessoas moram na sua casa*/],
    ["Menos de 1 salário minimo", "Entre 1 e 3 salários mínimos", "De 3 até 5 salários mínimos", "De 5 até 10 salários mínimos", "Mais de 10 salários mínimos", "Prefiro não declarar", "Não tem renda pessoal",],
    ["SIM", "NÃO"],
    [/*Quantos filhos*/],
    ["Não tem filho", " 1 Escola pública", "2 Escola particular", " 3 Em escola pública E particular", "4 Eles ainda não estudam/Nunca estudaram",],
    ["Vai ao hospital público /posto de saúde  ", "Vai ao hospital particular /clínica/consultório", "Vai aos hospitais público E particular",],
    ["casa própria", "aluguel", "mora de favor",],
    ["Agnostico", "Ateu", "Católico", "Candomblé", "Evangélico", "Evangélico Pentecostal", "Protestante", "Umbandista", "Nenhuma/Não tem religião", "Outra"],
    ["Não temos transporte", "carro", "moto", "bicicleta", "Carroça", "veiculo de trabalho (caminhão trator e afim)", "Outra"],
    ["Sim", "Não",],
    [],
    /* 22 */[/*TELEVISÃO Estrelas */], [/*CELULAR Estrelas */], [/*JORNAIS/ REVISTAS Estrelas */], [/*RÁDIO Estrelas */],
    ["Sim, frequentemente", "Às vezes", "Raramente", "Não",],
    ["Sim", "Não",],
    ["Muitas vezes", "Algumas vezes", "Poucas vezes", "Não",],
    ["Muitas vezes", "Algumas vezes", "Poucas vezes", "Não",],
    ["Sim", "Não",],
    ["Sim", "Não",],
    ["Saúde", "Educação", "Segurança pública", "Economia", "Meio ambiente", "Emprego", "Infraestrutura", "Outra",],
    ["Saúde (exemplo: melhorar o acesso a hospitais e serviços de saúde)", "Educação (exemplo: investir na melhoria de escolas e programas educacionais)", "Segurança pública (exemplo: implementar políticas de combate à criminalidade)", "Meio ambiente (exemplo: promover a preservação de áreas verdes e reduzir a poluição)", "Emprego (exemplo: criar programas para incentivar a geração de empregos)", "Infraestrutura (exemplo: melhorar estradas, transporte público e serviços básicos)", "Outra"],
    ["Honestidade ( FALAR A VERDADE DOA A QUEM DOER)", "Competência técnica (PESSOA QUE SABE COMO FAZER AS COISAS)", "Empatia ( QUE ENTENDA AS PESSOAS E SUAS NECESSIDADES)", "Experiência política (PESSOA QUE JÁ TENHA UMA CARREIRA POLITICA)", "Transparência (PESSOA NO QUAL SEJA ACESSIVEL E MOSTRE SEU TRABALHO RECORRENTEMENTE)", "Caridosa (AJUDA AS PESSOAS MAIS NECESSITADAS)", "Bons Valores (PESSOA NO QUAL PRESERVAM OS VALORES FAMILIARES)"],
    [],
    /**23  */[/*LULA	 */], [/*BOLSONARO*/], [/*SIMONE TEBET	*/], [/*CIRO GOMES	*/], [/*FELIPI D'ÁVILA */], [/*CABO DARCIOLO*/], [/*PADRE KELMON */],
    ["NÃO TENHO", "NÃO SEI", "PARTIDO DEMOCRÁTICO TRABALHISTA - PDT", "PARTIDO DOS TRABALHADORES - PT", "MOVIMENTO DEMOCRÁTICO BRASILEIRO - MDB", "PARTIDO COMUNISTA DO BRASIL - PCdoB", "PARTIDO SOCIALISTA BRASILEIRO - PSB", "PARTIDO DA SOCIAL DEMOCRACIA BRASILEIRA - PSDB", "AGIR - AGIR", "PARTIDO DA MOBILIZAÇÃO NACIONAL - PMN", "CIDADANIA - CIDADANIA", "PARTIDO VERDE - PV", "AVANTE - AVANTE", "PROGRESSISTAS - PP", "PARTIDO SOCIALISTA DOS TRABALHADORES UNIFICADO - PSTU", "PARTIDO COMUNISTA BRASILEIRO - PCB", "PARTIDO RENOVADOR TRABALHISTA BRASILEIRO - PRTB", "DEMOCRACIA CRISTÃ - DC", "PARTIDO DA CAUSA OPERÁRIA - PCO", "PODEMOS - PODE", "REPUBLICANOS - REPUBLI", "PARTIDO SOCIALISMO E LIBERDADE - PSOL", "PARTIDO LIBERAL - PL", "PARTIDO SOCIAL DEMOCRÁTICO - PSD", "SOLIDARIEDADE - SOL", "PARTIDO NOVO - NOVO", "REDE SUSTENTABILIDADE - REDE", "PARTIDO DA MULHER BRASILEIRA - PMB", "UNIDADE POPULAR - UP", "UNIÃO BRASIL - UNIÃO", "Partido Renovação Democrática - PRD"],
    ["Fatima Bezerra", "Fabio Dantas", "Capitão Styvenson", "Clorisa Linhares", "NÃO VOTEI", "VOTEI EM BRANCO", "VOTEI NULO", "PREFIRO NÃO DECLARAR"],
    ["a) Divanize", "c) Izoares", "b) Saldanha", "h) Não votou, por ser maior de 70 anos", "i) Não votou por opçao", "j) Não votou por ter entre 16 e 17 anos", "k) Não votou, apenas justificou o voto ", "g) Prefere não declarar", "Justificou o voto", "Voto nulo", "Voto em branco", "Não lembra", "Outro"],
    ["Divanize", "Zezé da Agrícola", "Izoares", "Lucia Nascimento", "Luciano Testinha", "Fabrício Equipadora", "Marcos Antònio", "Não sei, sou eleitor indeciso", "Outra"],
    ["Sim", "Não", "Talvez", "Não sei quem é",],
    ["Sim", "Não", "Talvez", "Não sei quem é",],
    ["Sim", "Não", "Talvez", "Não sei quem é",],
    ["Sim", "Não", "Talvez", "Não sei quem é",],
    ["Fabio Jr", "Fabricio Equipadora", "Zezé da Agricola", "David Simão", "Neuza", "Helena de Lair", "Artilho", "Raimundo do Poco NOVO", "EDILSON", "MELQUE", "Justificou o voto", "Voto nulo", "Voto em branco", "Outra"],
    ["Ótima", "Boa", "Ruim", "Péssima", "Regular para bom", "Regular para ruim", "Nao foi eleito",],
    ["MUITO BOA", "BOA", "RUIM", "PÉSSIMA",],
    [],
    ["Sim", "Não",],
    ["Sim", "Não",],
    ["Sim", "Não",],
    ["Sim", "Não",],
    ["Sim", "Não",],
    [, 'Ótima', 'Boa', 'Regular', 'Ruim', 'Péssima', 'Não sei/Não quero responder',],
    ["Concordo plenamente, sinto que eles refletem minhas preocupações. (Sentimento: Identificação, Contentamento)", "Nem sempre, acho que há certa desconexão com as necessidades da população. (Sentimento: Desconexão, Insatisfação)", "Discordo, sinto-me completamente sub-representado. (Sentimento: Descontentamento, Alienamento)",],
    [],
    /**47*/ [/*A coleta de lixo	*/], [/*A polícia	*/], [/*A limpeza das ruas e calçadas	*/], [/*O estado de manutenção das ruas e calçadas da cidade	*/], [/*O controle dos camelôs, mesas de bar e bancas de lojas	*/], [/*As quadras, praças e espaços de lazer da cidade	*/], [/*As escolas públicas	*/], [/*O serviço de saúde pública	*/], [/*A iluminação das ruas e praças	*/], [/*O serviço de água	*/], [/*O serviço de esgoto	*/], 
    ["Resultados e projetos realizados pela gestão. (Sentimento: Aprovação, Confiança)", "Escândalos de corrupção ou má gestão. (Sentimento: Desconfiança, Desilusão)", "Falta de transparência e comunicação por parte dos políticos. (Sentimento: Descontentamento, Desconfiança)", "Ajuda por parte dos políticos com minhas necessidades ( Sentimento de necessidade)",],
    ["Propostas de campanha", "Histórico do candidato", "Ideologia política", "Debates eleitorais", "Amizade com candidato", "Amizade com as pessoas", "Uma ajuda com algum favor", "Escolho na hora mesmo", "Outra",],
    ["Sim", "Não",],
    ["Sim", "Não",],
    ["Sim", "Não"],
    [],
    /**30 */
    [/*1 Desemprego	*/],
     [/*2 Saúde	*/],
     [/*3 Educação	*/],
     [/*4 Pobreza	*/], 
     [/*5 Salário	*/],
     [/*6 Violência	*/],
     [/*7 Corrupção	*/],
     [/*11 Política	*/],
     [/*12 Fome	*/], 
     [/*13 Desigualdade	*/], 
     [/*14 Trânsito	*/], 
     [/*15 Enchentes	*/], 
     [/*17 Favelas	*/], 
     [/*18 Água	*/], 
     [/*19 Esgoto	*/], 
     [/*20 Urbanismo	*/], 
     [/*21 Estacionamento	*/], 
     [/*22 Transporte público	*/],
     [/*23 Infraestrutura	*/],
     [/*24 Lazer*/],
    [""],
    [""],
    [""],
    [""],
    [""],
    ["Importante", "Longo", "Interessante", "Chato",],
  ]
  const initialState = Array(colunasPesquisa3.length+1).fill('');
  const [respostas, setRespostas] = useState(Array(colunasPesquisa3.length).fill(''));
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

  };
  async function compartilhar() {
    try {
      const csvFilePath = `${FileSystem.documentDirectory + nomeArquivo}`;
      // Verificar se o arquivo CSV já existe
      const fileInfo = await FileSystem.getInfoAsync(csvFilePath);
      if (!fileInfo.exists) {
        // Se o arquivo não existir, criar um novo
        const initialCSVData = [
          colunasPesquisa3
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
        const initialCSVData = [colunasPesquisa3];
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
    const initialCSVData = [[`Nome do aplicador: ${nome}`], colunasPesquisa3];
    const initialCSV = Papa.unparse(initialCSVData);
    await FileSystem.writeAsStringAsync(csvFilePath, initialCSV, { encoding: FileSystem.EncodingType.UTF8 });
  }
  function handleToggle(index: number ,value: boolean) { 
    updateRespostas(index, value ? 'SIM' : 'NÃO');
  }

  function updateRespostas(index: number, resposta: any) {
    setRespostas((prevRespostas) => {
      const newRespostas = [...prevRespostas];
      newRespostas[index] = resposta;
      return newRespostas;
    });
  }
 
  return (
    <>
      {aplicadorExistente ?
        <ScrollView  ref={scrollViewRef}>
          <StatusBar backgroundColor={'purple'} animated={true} showHideTransition={"fade"}  />
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 60, backgroundColor: 'purple', borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}>
              <Text style={{ color: '#fff', fontSize: 22, fontWeight: "700", fontFamily: "Roboto" }}>
                Pesquisa Baraunas
              </Text>
            </View>
          <View style={{padding: 8}}> 
          {
            colunasPesquisa3.map((pergunta, index) => {
              return (<View key={"ViewP-"+index.toString()}>
                <Controller 
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View >
                      <Text   style={styles.pergunta}>
                          {/* {index}- */}
                          {pergunta}
                      </Text>
                      {
                       index == 22 || index == 36 || index == 55  || index == 63 || index == 80 ?
                       null
                      :
                      index == 6 || index == 12 || index == 15 || index > 100 && index < 106 ?
                        <> 
                            <TextInput
                         
                              label={index === 6 || index === 12 || index === 15 ? "Digite a quantidade" : "Digite a mensagem"}
                              value={value}
                              inputMode={index === 6 || index === 12 || index === 15  ? 'numeric' : 'text'}
                              onChangeText={(text) => { onChange(text); updateRespostas(index, text); }}
                              style={styles.inputText}
                            />
                          {errors[index] && <Text style={{ color: 'red', textAlign: 'center' }}>Digite um mensagem</Text>}
                        </>
                        :
                        index == 35 ||  index == 33 || index == 20 ?
                        <View  >
                            <MultipleSelectList 
                           
                              setSelected={(valor: any) => { onChange("valor"); console.log("valor: "+ valor); index == 35 ? setBomCandidatoCaracteristica(valor) : index == 33 ? setEscolhaCandidato(valor) : index == 20 ? setCasaVeiculo(valor) : null; console.log("Bom: "+ bomCandidatoCaracteristica); console.log("Veiculo: "+ casaVeiculo); console.log("Candidato: "+ escolhaCandidato);/** updateRespostas(index, valor); */}}
                              data={RespostasPesquisa3[index]}
                              save="value"
                              label={"Perguntas-"+index.toString()}
                              placeholder='Selecione as opções'
                              searchPlaceholder='Digite o veiculo da casa que deseja encontrar'
                              />
                            {errors[index] && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma opção</Text>}
                            {respostas[index] ? <Text style={{ color: 'green', textAlign: 'center' }}>{respostas[index]}</Text> : null}
                          </View>
                          :  (index > 22 && index < 27) || (index > 36 && index < 44) || (index > 63 && index < 75) || index > 80 && index < 101 ?
                          <>
                              <View >
                              <StarRating   rating={respostas[index]} onStarPress={(nota: any) => { onChange(nota); updateRespostas(index, nota); }} />
                                {errors[index] && <Text  style={{ color: 'red', textAlign: 'center' }}>Selecione uma nota</Text>}
                              </View>
                            </>
                            :
                            index > 55 && index < 61 || index == 14 || index == 21 || index == 28 || index == 31 || index == 32 || index == 77 || index == 78 || index == 79 || index == 14 ?
                            <>
                              <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                                <TouchableOpacity
                           
                                  style={[styles.checkbox, respostas[index]=="SIM" && styles.checkedYes, { flex: 1, alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center' }]}
                                  onPress={() =>{ handleToggle(index, true); onChange("valor")}}>
                                  <Text style={ respostas[index]== "SIM"? styles.labelSelect: styles.labelNotSelect}>SIM</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                            
                                  style={[styles.checkbox,  respostas[index]=="NÃO" && styles.checkedNo, { flex: 1, alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center' }]}
                                  onPress={() => {handleToggle(index, false); onChange("valor")}} >
                                  <Text style={ respostas[index]== "NÃO"? styles.labelSelect: styles.labelNotSelect}>NÃO</Text>
                                </TouchableOpacity>
                              </View>
                              {errors[index] && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione sim ou não</Text>}
                            </>
                            :
                            <View>
                            <SelectList 
                              setSelected={(valor: any) => { onChange(valor); updateRespostas(index, valor); }}
                              data={RespostasPesquisa3[index]}
                              save="value"
                              placeholder='Selecione a opção'
                              notFoundText='Dado não encontrado'
                              searchPlaceholder='Digite o item que deseja encontrar'
                            />
                            {errors[index] && <Text style={{ color: 'red', textAlign: 'center' }}>Selecione uma opção</Text>}
                            {respostas[index] ? <Text style={{ color: 'green', textAlign: 'center' }}>{respostas[index]}</Text> : null}
                          </View> 
                      }
                     
                    </View>
                  )}
                  name={index.toString()}
                  rules={{ required:  index == 22 || index == 36 || index == 55  || index == 63 || index == 80 ? false : true }}
                  />
              </View>)
            }) 
          }
          </View>
          <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={teste} >
                <Feather name="download" size={30} color="purple" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Button mode="contained" style={styles.buttons} onPress={()=> handleSubmit(handleSaveData)}>
                <Text style={{ fontFamily: 'Roboto', fontWeight: "700", fontSize: 18 }}>
                  Salvar 2
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
            onChangeText={(text) => { setNome(text) }}
            style={styles.inputText}
          />
          <Button mode="contained" style={[styles.buttons, { marginTop: '5%', marginBottom: '60%' }]} onPress={primeiroAcesso} disabled={nome != '' ? false : true}>
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
  labelSelect: {
    color: 'white',
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