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
import CheckboxList from './components/myCheckBox.jsx';
 
export default function App() {
  const nomeArquivo = 'baraunasRespostas.csv'
  const key = 'testando3' 
  const [nomeDoAplicador, setNomeDoAplicador] = useState('');
  const [nome, setNome] = useState('');
  const [aplicadorExistente, setAplicadorExistente] = useState(false);
  const [casaVeiculo, setCasaVeiculo] = useState('');
  const [escolhaCandidato, setEscolhaCandidato] = useState('')
  const [bomCandidatoCaracteristica, setBomCandidatoCaracteristica] = useState('') 

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
  function teste() { 
    setCasaVeiculo('')
    setEscolhaCandidato('')
    setBomCandidatoCaracteristica('')
  }
  // const scrollToBottom = () => {
  //   scrollViewRef.current.scrollTo(0, 0, { animated: true });
  // };
 
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
    updateRespostas(colunasPesquisa3.length + 1, dataHoraFormatada)
    updateRespostas(35, substituirVirgulaPorPonto(bomCandidatoCaracteristica))
    updateRespostas(33, substituirVirgulaPorPonto(escolhaCandidato))
    updateRespostas(20, substituirVirgulaPorPonto(casaVeiculo))

    for (let i = 0; i < respostas.length-1; i++) { 
        if (respostas[i] == '' && !( i == 22 || i == 36 || i == 55 || i == 63 || i == 80 || i == 35 || i == 33 || i == 20  )) {//
          alert('Preencha todos os campos obrigatorios \n Falta responder a pergunta:\n  '+ colunasPesquisa3[i]);
          return;
        }
    } 
    try{
      
      saveDataToCSV(respostas);
      setRespostas(initialState)
      setCasaVeiculo('')
      setEscolhaCandidato('')
      setBomCandidatoCaracteristica('')
      alert('Dados salvos com sucesso!'); 
    }
    catch(e){
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
      {value:"CENTRO"},
      {value:"PRIMAVERA"},
      {value:"ALTO DA AVENIDA"},
      {value:"CAMPO VERDE"},
      {value:"CINDERELA"},
      {value:"SUB-ESTAÇÃO"},
      {value:"DAS PALMEIRAS"},
      {value:"FILADELFIA"}, 
    ],
    [ //Norte
      {value:"Florêncio"},
      {value:"Vila Nova III"},
      {value:"Angicos"},
      {value:"PA Pico Estreito"},
      {value:"Vila Nova II"},
      {value:"Vila Nova I"},
      {value:"PA Real"},
      {value:"Córrego de Pedra"},
      {value:"Santa Maria"},
      {value:"Aroeira Grande"},
      {value:"AV. Senhor Petrolino Portela"},
      {value:"PA Tiradentes"},
      {value:"PA Vitória"},
    ],
    [ // SUL
      {value:"PA Bom Sucesso dos Militares"},
      {value:"Canaã"},
      {value:"Lajedo do Sebo"},
      {value:"KM.31"},
      {value:"Boa Sorte"},
      {value:"PA Poço Novo II"},
      {value:"PA Fazenda Poço Baraúna (Poco I)"},
      {value:"Baixa Branca"},
      {value:"Veneza"},
      {value:"Recreio"},
      {value:"PA Santa Clara"},
      {value:"Boa Água"},
      {value:"PA Formosa"},
      {value:"Banco da Terra"},
      {value:"PA Ouro Verde"},
      {value:"Rancho do"},
    ],
    [ // Leste
      {value:"Juremal"},
      {value:"Primavera"},
      {value:"Vertentes"},
    ],
    [ //OESTE
      {value:"PA Caatingueira"},
      {value:"Mato Alto"},
      {value:"Velame I"},
      {value:"Formigueiro"},
      {value:"Velame II"},
      {value:"Lajedo de Ouro"},
      {value:"Maxixe"},
      {value:"Olho d'gua da Escada"},
      {value:"Lajedo Mel"},
      {value:"Sumidouro"},
      {value:"Mata Burro"},
    ],
  ]
  const colunasPesquisa3 = [
    "0 - SEXO",
    "1 - PERFIL DO ENTREVISTADO (ESTIMULADA)",
    "2 - ZONA  (ESPOTANIA)",
    "3 - REGIAO  (ESPONTANEA)",
    "4 - Qual e a sua orientacao sexual?  (ESTIMULADA)",
    "5 - Voce se identifica como?  (ESTIMULADA)",
    "6 - IDADE",
    "7 - Estado Civil",
    "8 - Voce estuda ou estudou em escola publica ou privada (ESTIMULADA E UNICA)",
    "9 - NIVEL DE ESCOLARIDADE  (ESTIMULADA)",
    "10 - Voce poderia me dizer qual e aproximadamente a sua renda mensal pessoal? (SE NAO RESPONDER ESPONTANEAMENTE APRESENTE AS OPCOES)",
    "11 - De onde vem sua fonte de renda?  (ESTIMULADA)",
    "12 - Quantas pessoas moram contigo na sua casa?  (ESPONTANEA)",
    "13 - O(a) sr(a). poderia me dizer qual e aproximadamente a sua renda mensal de sua casa caso tenha? (ESPONTANEA/ ESTIMULADA)",
    "14 - Em sua casa alguem recebe auxilio do Governo Federal?  (ESTIMULADA)",
    "15 - Quantos filhos com menos de 18 anos o(a) Sr(a) tem? (ESPONTANEA)",
    "16 - SE SIM O(s) filho(s) do(a) Sr(a) estuda(m) ou estudara(m) em escola publica ou particular? (ESTIMULADA)",
    "17 - Quando o(a) Sr(a) tem algum problema de saude o(a) Sr(a): (ESTIMULADA)",
    "18 - Sua moradia e:  (ESTIMULADA)",
    "19 - Qual sua religiao?  (ESPONTANEO)",
    "20 - Na sua casa qual tipo de veiculo existe? (ESTIMULADA)  (selecione  as opcoes que existir em ordem)",
    "21 - O(a)    Sr(a)    tem    titulo    de    eleitor?    (INSTRUCAO: Pessoas que perderam o titulo entram como opcao sim) (ESTIMULADA)",
    "22 - QUAL VEICULO DE COMUNICACAO VOCe MAIS ULTILIZA PARA SE INFORMAR? DE 1 ATE 5  (ESTIMULADA)",
    "TELEVISAO",
    "CELULAR",
    "JORNAIS/ REVISTAS",
    "RADIO",
    "23 - Voce costuma discutir politica com amigos/familia/colegas?  (ESTIMULADA)",
    "24 - Voce ja participou de alguma manifestacao politica? Seja participacao em carreata ou qualquer coisa do genero   (ESTIMULADA)",
    "25 - SE SIM Durante a ultima campanha eleitoral para prefeito em Barauna-RN o(a) Sr(a) tentou convencer alguem a votar em algum candidato ou partido? (ESTIMULADA)",
    "26 -  SE SIM Durante    as ultimas eleicoes para prefeito deste municipio o(a) Sr(a) mostrou seu apoio a algum candidato ou partido participando de    reunioes colando cartazes ou distribuindo panfletos?    (Se    sim) Com    que frequencia: (ESTIMULADA)    ",
    "27 -  SE SIM E    o(a)    Sr(a)    colocou    faixas    ou    cartazes    de    algum    candidato em sua casa no trabalho ou colou    adesivo    no    carro? ",
    "28 -  SE SIM Durante    a    campanha    eleitoral    um    candidato    ou    uma    pessoa    de    qualquer    partido    entrou    em    contato    com    o(a)    Sr(a)    para    pedir    o    seu    voto?",
    "29 - Quais questoes sao mais importantes para voce na escolha de um candidato? (Escolha as tres mais importantes DA MAIOR PARA A MENOR)  (ESTIMULADA)",
    "30 - Qual dessas questoes voce acredita que seu candidato ideal deveria priorizar?  (ESTIMULADA)",
    "31 - Na sua opiniao quais caracteristicas um bom candidato deve ter? (Escolha ate tres opcoes) (ESTIMULADA)",
    "32 - Agora usando as notas de zero a dez gostaria que o(a) Sr(a) me dissesse o quanto gosta de alguns politicos que vou mencionar. Quero lembrar que zero significa que o(a) Sr(a) NAO gosta do politico que vou mencionar e dez que o(a) Sr(a) gosta muito. De novo se o(a) Sr(a) nao conhecer o politico que eu disser diga apenas que nao o conhece. (ESTIMULADA E UNICA PARA CADA ITEM DA BATERIA) (LER CANDIDATOS – RODIZIAR) ",
    "LULA",
    "BOLSONARO",
    "SIMONE TEBET",
    "CIRO GOMES",
    "FELIPI D AVILA",
    "CABO DARCIOLO",
    "PADRE KELMON",
    "33 - Qual    o    partido    que    melhor    representa    a    maneira    como    o(a)    Sr(a)    pensa?    (ESPONTANEA    E    UNICA)",
    "34 - ENTRE OS CANDIDATOS ABAIXO QUEM VOCe VOTOU NA ULTIMA ELEIcaO PARA GOVERNADOR?  (ESPONTANEO)",
    "35 - Em quem o(a) Sr(a) votou para prefeito na ultima eleicao municipio de barauna? (ESPONTANEO)",
    "36 - Se a eleicao fosse hoje em quem voce votaria para PREFEITO? (ESPONTANEO)",
    "37 - Voce votaria em Divanize para ser reeleita Prefeita?  (ESPONTANEO)",
    "38 - Voce votaria em Zeze Da Agricola para Prefeito?  (ESPONTANEO)",
    "39 - Voce votaria em Saldanha para Prefeito? (ESPONTANEO)",
    "40 Voce votaria em Izoares Martins para Prefeito? (ESPONTANEO)",
    "41 -  Na    ultima campanha municipal em Barauna/RN em quem o(a) Sr(a) votou para VEREADOR? (ESPONTANEA) SE NECESSARIO LER OPcoES",
    "42 - Como    o(a)    sr(a)    avalia a    atuacao do vereador que votou em 2020 caso ele tenha sido eleito? (ESTIMULADO)",
    "43 - Na sua opiniao de uma maneira geral a Gestao da atual prefeita nos ultimos 3 anos foi  (ESTIMULADA)",
    "44 - Eu vou ler varias situacoes e gostaria que o(a) Sr(a) dissesse se o    senhor votaria: (ESTIMULADA)",
    "  • Em um candidato que oferece cestas basicas de alimentos para familias muito pobres:",
    "  • Em um candidato que conseguisse para uma mae vaga para matricular seu filho na escola.	",
    "  • Em um candidato que oferecesse um caminhao de tijolos para varias familias que precisam acabar de construir suas casas	",
    "  • Em um candidato que  oferece reformar um campo de futebol para um grupo de amigos que jogam bola juntos toda semana	",
    "  • Em um candidato que so fizesse o bem pensando no coletivo buscando melhorias para o bem comum de varios ou de toda uma populacao atraves de leis projetos prestacao de contas do dinheiro publico e nao desse prioridade a necessidades individuais e particulares como as citadas anteriormente:	",
    "45 - Minha confianca em relacao a prefeita atual e de: (ESTIMULADA)",
    "46 - Eu me sinto representado pelos politicos locais: (ESTIMULADA)",
    "47 - Vou citar alguns servicos publicos da cidade e gostaria que o (a) Sr. (a) desse uma nota de 0 a 5 para dizer o quanto esta satisfeito com cada um deles em Barauna/RN. De 0 a 5 que nota o (a) Sr(a) da para. (ESTIMULADA)",
    " A coleta de lixo	",
    "A policia	",
    "A limpeza das ruas e calcadas	",
    "O estado de manutencao das ruas e calcadas da cidade	",
    "O controle dos camelos mesas de bar e bancas de lojas	",
    "As quadras pracas e espacos de lazer da cidade",
    "As escolas publicas",
    "O servico de saude publica	",
    "A iluminacao das ruas e pracas",
    "O servico de agua	",
    "O servico de esgoto",
    "48 - Minha visao sobre a politica municipal e influenciada por:  (ESTIMULADA)",
    "49 - O que mais influencia sua decisao de voto? (ESTIMULADO)",
    "50 - Voce acha que deveria existir uma mudanca na prefeitura da cidade?",
    "51 - Nos ultimos 3 anos o(a) Sr(a) fez contato com algum politico ou alguem que trabalha na gestao municipal para    pedir a solucao de algum problema que prejudicava muitas pessoas    ou reclamar do proprio    governo?    (ESPONTaNEA)",
    "52 - SE SIM O problema apos contato ou reclamacao foi resolvido",
    "54 - AVALIE OS PROBLEMAS DA CIDADE DE BARuNA NA SUA OPNIaO COM NOTAS DE 1 A 5. SENDO QUANDO MAIS PROXIMO DE 1 MENOR PRIORIDADE VOCe Da A ESSE PROBLEMA E QUANTO MAIS PROXIMO DE 5 MAIOR e A PRIORIDADE DESSE PROBLEMA.  (ESTIMULADO) ",
    "1 Desemprego",
    "2 Saude",
    "3 Educacao",
    "4 Pobreza",
    "5 Salario",
    "6 Violencia",
    "7 Corrupcao",
    "11 Politica",
    "12 Fome",
    "13 Desigualdade	",
    "14 Transito",
    "15 Enchentes",
    "17 Favelas",
    "18 agua	",
    "19 Esgoto	",
    "20 Urbanismo	",
    "21 Estacionamento	",
    "22 Transporte publico	",
    "23 Infraestrutura	",
    "24 Lazer	",
    "55 - Representando sua comunidade/ regiao voce teria alguma ideia inovadora ou sugestao criativa que acredita que poderia melhorar Barauna e que gostaria que a proxima gestao implementasse na sua comunidade ou regiao? (ESPONTANEO)",
    "56 - Como voce imagina nossa comunidade nos proximos anos? O que voce gostaria de ver mudado ou melhorado?  (ESPONTANEO)",
    "57 - QUAL O PRINCIPAL PROBLEMA DA SUA REGIaO SITIO/BAIRRO NA SUA OPNIaO?  (ESPONTANEO)",
    "58- Quais acoes ou mudancas voce gostaria que a prefeitura implementasse em Barauna para melhorar a qualidade de vida na cidade?  (ESPONTANEO)",
    "59 - MANDE UMA MENSAGEM PARA OS POLITICOS DA CIDADE DE BARAuNA  (ESPONTANEO)",
    "60 - Para terminar eu gostaria de ouvir sua opiniao sobre o questionario. O que o(a) Sr(a) achou do questionario: longo interessante chato ou importante? Voce pode dar mais de uma resposta.(ESTIMULADO)",
  ]
  const RespostasPesquisa3 = [
    //[],// Horario
    [{value:"MASCULINO"}, {value:"FEMININO"}],
    [{value:"ESTUDANTE DO ENSINO MEDIO"}, {value:"SERVIDOR PuBLICO"}, {value:"COMERCIANTE"}, {value:"UNIVERSITARIO"}, {value:"COMUNIDADE GERAL"}, {value:"AGRICULTOR"}],
    [{value:"NORTE"}, {value:"SUL"}, {value:"LESTE"}, {value:"OESTE"}, {value:"URBANA"}],
    [{value:"Campestre"}, {value:"Juremal"}, {value:"Primavera"}, {value:"Vertentes"}, {value:"CENTRO"}, {value:"PRIMAVERA"}, {value:"ALTO DA AVENIDA"}, {value:"CAMPO VERDE"}, {value:"CINDERELA"}, {value:"SUB-ESTAcaO"}, {value:"DAS PALMEIRAS"}, {value:"FILADELFIA"}, {value:"Florencio"}, {value:"Vila Nova III"}, {value:"Angicos"}, {value:"PA Pico Estreito"}, {value:"PA Caatingueira"}, {value:"Vila Nova II"}, {value:"Vila Nova I"}, {value:"PA Real"}, {value:"Corrego de Pedra"}, {value:"Santa Maria"}, {value:"Aroeira Grande"}, {value:"AV. Senhor Petrolino Portela"}, {value:"PA Tiradentes"}, {value:"PA Vitoria"}, {value:"Mato Alto"}, {value:"Velame I"}, {value:"Formigueiro"}, {value:"Velame II"}, {value:"Lajedo de Ouro"}, {value:"Maxixe"}, {value:"Olho d'gua da Escada"}, {value:"Lajedo Mel"}, {value:"Sumidouro"}, {value:"Mata Burro"}, {value:"PA Bom Sucesso dos Militares"}, {value:"Canaa"}, {value:"Lajedo do Sebo"}, {value:"KM.31"}, {value:"Boa Sorte"}, {value:"PA Poco Novo II"}, {value:"PA Fazenda Poco Barauna (Poco I)"}, {value:"Baixa Branca"}, {value:"Veneza"}, {value:"Recreio"}, {value:"PA Santa Clara"}, {value:"Boa agua"}, {value:"PA Formosa"}, {value:"Banco da Terra"}, {value:"PA Ouro Verde"}, {value:"Rancho DO"},],
    [{value:"Heterossexual"}, {value:"Bissexual"}, {value:"Lesbica"}, {value:"Pansexual"}, {value:"Queer"}, {value:"Outra"}],
    [{value:"1 Preto"}, {value:"2 Pardo"}, {value:"3 Branco"}, {value:"4 Amarelo"}, {value:"5 indio"},],
    [ /* Idade*/],
    [{value:"Solteiro(a)"}, {value:"Casado(a)/ comp.(a)"}, {value:"Viuvo(a)"}, {value:"Desquitado(a)/ Divorciado(a)"}, {value:"Separado(a)"},],
    [{value:"1 Escola publica"}, {value:" 2 Escola particular"}, {value:"3 Em escola publica E particular"}, {value:" 4 Nunca frequentei a escola"},],
    [{value:"ANALFABETO"}, {value:"ENSINO FUNDAMENTAL I"}, {value:"ENSINO FUNDAMENTAL II"}, {value:"ENSINO MeDIO INCOMPLETO"}, {value:"ENSINO MeDIO COMPLETO"}, {value:"ENSINO SUPERIOR INCOMPLETO"}, {value:"ENSINO SUPERIOR COMPLETO"}, {value:"PoS GRADUAcaO"}, {value:"DOUTORADO"},],
    [{value:"Ate R$ 260.00"}, {value:"De R$ 260.01 ate R$ 520.00"}, {value:"De R$ 520.01 ate R$ 780.00"}, {value:"De R$ 780.01 ate R$ 1.320.00"}, {value:"De R$ 1.320,01 ate R$ 2.600.00"}, {value:"De R$ 2.600,01 ate R$ 5.200.00"}, {value:"De R$ 5.200,01 ate R$ 7.800.00"}, {value:"Mais de R$ 7.800.00"}, {value:"Nao tem renda pessoal"}, {value:"Nao sei/Nao respondeu"}],
    [{value:"Agricultor"}, {value:"Aposentadoria"}, {value:"Autonomo"}, {value:"Auxilio governamental"}, {value:"Bolsa de Estudos"}, {value:"Comerciante"}, {value:"Desemprego"}, {value:"Servidor Publico"}, {value:"Trabalho com carteira assinada (CLT)"}, {value:"Outra"}],
    [/*Quantidade de pessoas moram na sua casa*/],
    [{value:"Menos de 1 salario minimo"}, {value:"Entre 1 e 3 salarios minimos"}, {value:"De 3 ate 5 salarios minimos"}, {value:"De 5 ate 10 salarios minimos"}, {value:"Mais de 10 salarios minimos"}, {value:"Prefiro nao declarar"}, {value:"Nao tem renda pessoal"},],
    [{value:"SIM"}, {value:"NaO"}],
    [/*Quantos filhos*/],
    [{value:"Nao tem filho"}, {value:" 1 Escola publica"}, {value:"2 Escola particular"}, {value:" 3 Em escola publica E particular"}, {value:"4 Eles ainda nao estudam/Nunca estudaram"},],
    [{value:"Vai ao hospital publico /posto de saude  "}, {value:"Vai ao hospital particular /clinica/consultorio"}, {value:"Vai aos hospitais publico E particular"},],
    [{value:"casa propria"}, {value:"aluguel"}, {value:"mora de favor"},],
    [{value:"Agnostico"}, {value:"Ateu"}, {value:"Catolico"}, {value:"Candomble"}, {value:"Evangelico"}, {value:"Evangelico Pentecostal"}, {value:"Protestante"}, {value:"Umbandista"}, {value:"Nenhuma/Nao tem religiao"}, {value:"Outra"}],
    [{value:"Nao temos transporte"}, {value:"carro"}, {value:"moto"}, {value:"bicicleta"}, {value:"Carroca"}, {value:"veiculo de trabalho (caminhao trator e afim)"}, {value:"Outra"}],
    [{value:"Sim"}, {value:"Nao"},],
    [],
    /* 22 */[/*TELEVISaO Estrelas */], [/*CELULAR Estrelas */], [/*JORNAIS/ REVISTAS Estrelas */], [/*RaDIO Estrelas */],
    [{value:"Sim frequentemente"}, {value:"Às vezes"}, {value:"Raramente"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Muitas vezes"}, {value:"Algumas vezes"}, {value:"Poucas vezes"}, {value:"Nao"},],
    [{value:"Muitas vezes"}, {value:"Algumas vezes"}, {value:"Poucas vezes"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Saude"}, {value:"Educacao"}, {value:"Seguranca publica"}, {value:"Economia"}, {value:"Meio ambiente"}, {value:"Emprego"}, {value:"Infraestrutura"}, {value:"Outra"},],
    [{value:"Saude (exemplo: melhorar o acesso a hospitais e servicos de saude)"}, {value:"Educacao (exemplo: investir na melhoria de escolas e programas educacionais)"}, {value:"Seguranca publica (exemplo: implementar politicas de combate à criminalidade)"}, {value:"Meio ambiente (exemplo: promover a preservacao de areas verdes e reduzir a poluicao)"}, {value:"Emprego (exemplo: criar programas para incentivar a geracao de empregos)"}, {value:"Infraestrutura (exemplo: melhorar estradas transporte publico e servicos basicos)"}, {value:"Outra"}],
    [{value:"Honestidade ( FALAR A VERDADE DOA A QUEM DOER)"}, {value:"Competencia tecnica (PESSOA QUE SABE COMO FAZER AS COISAS)"}, {value:"Empatia ( QUE ENTENDA AS PESSOAS E SUAS NECESSIDADES)"}, {value:"Experiencia politica (PESSOA QUE Ja TENHA UMA CARREIRA POLITICA)"}, {value:"Transparencia (PESSOA NO QUAL SEJA ACESSIVEL E MOSTRE SEU TRABALHO RECORRENTEMENTE)"}, {value:"Caridosa (AJUDA AS PESSOAS MAIS NECESSITADAS)"}, {value:"Bons Valores (PESSOA NO QUAL PRESERVAM OS VALORES FAMILIARES)"}],
    [],
    /**23  */[/*LULA	 */], [/*BOLSONARO*/], [/*SIMONE TEBET	*/], [/*CIRO GOMES	*/], [/*FELIPI D'aVILA */], [/*CABO DARCIOLO*/], [/*PADRE KELMON */],
    [{value:"NaO TENHO"}, {value:"NaO SEI"}, {value:"PARTIDO DEMOCRaTICO TRABALHISTA - PDT"}, {value:"PARTIDO DOS TRABALHADORES - PT"}, {value:"MOVIMENTO DEMOCRaTICO BRASILEIRO - MDB"}, {value:"PARTIDO COMUNISTA DO BRASIL - PCdoB"}, {value:"PARTIDO SOCIALISTA BRASILEIRO - PSB"}, {value:"PARTIDO DA SOCIAL DEMOCRACIA BRASILEIRA - PSDB"}, {value:"AGIR - AGIR"}, {value:"PARTIDO DA MOBILIZAcaO NACIONAL - PMN"}, {value:"CIDADANIA - CIDADANIA"}, {value:"PARTIDO VERDE - PV"}, {value:"AVANTE - AVANTE"}, {value:"PROGRESSISTAS - PP"}, {value:"PARTIDO SOCIALISTA DOS TRABALHADORES UNIFICADO - PSTU"}, {value:"PARTIDO COMUNISTA BRASILEIRO - PCB"}, {value:"PARTIDO RENOVADOR TRABALHISTA BRASILEIRO - PRTB"}, {value:"DEMOCRACIA CRISTa - DC"}, {value:"PARTIDO DA CAUSA OPERaRIA - PCO"}, {value:"PODEMOS - PODE"}, {value:"REPUBLICANOS - REPUBLI"}, {value:"PARTIDO SOCIALISMO E LIBERDADE - PSOL"}, {value:"PARTIDO LIBERAL - PL"}, {value:"PARTIDO SOCIAL DEMOCRaTICO - PSD"}, {value:"SOLIDARIEDADE - SOL"}, {value:"PARTIDO NOVO - NOVO"}, {value:"REDE SUSTENTABILIDADE - REDE"}, {value:"PARTIDO DA MULHER BRASILEIRA - PMB"}, {value:"UNIDADE POPULAR - UP"}, {value:"UNIaO BRASIL - UNIaO"}, {value:"Partido Renovacao Democratica - PRD"}],
    [{value:"Fatima Bezerra"}, {value:"Fabio Dantas"}, {value:"Capitao Styvenson"}, {value:"Clorisa Linhares"}, {value:"NaO VOTEI"}, {value:"VOTEI EM BRANCO"}, {value:"VOTEI NULO"}, {value:"PREFIRO NaO DECLARAR"}],
    [{value:"a) Divanize"}, {value:"c) Izoares"}, {value:"b) Saldanha"}, {value:"h) Nao votou por ser maior de 70 anos"}, {value:"i) Nao votou por opcao"}, {value:"j) Nao votou por ter entre 16 e 17 anos"}, {value:"k) Nao votou apenas justificou o voto "}, {value:"g) Prefere nao declarar"}, {value:"Justificou o voto"}, {value:"Voto nulo"}, {value:"Voto em branco"}, {value:"Nao lembra"}, {value:"Outro"}],
    [{value:"Divanize"}, {value:"Zeze da Agricola"}, {value:"Izoares"}, {value:"Lucia Nascimento"}, {value:"Luciano Testinha"}, {value:"Fabricio Equipadora"}, {value:"Marcos Antònio"}, {value:"Nao sei sou eleitor indeciso"}, {value:"Outra"}],
    [{value:"Sim"}, {value:"Nao"}, {value:"Talvez"}, {value:"Nao sei quem e"},],
    [{value:"Sim"}, {value:"Nao"}, {value:"Talvez"}, {value:"Nao sei quem e"},],
    [{value:"Sim"}, {value:"Nao"}, {value:"Talvez"}, {value:"Nao sei quem e"},],
    [{value:"Sim"}, {value:"Nao"}, {value:"Talvez"}, {value:"Nao sei quem e"},],
    [{value:"Fabio Jr"}, {value:"Fabricio Equipadora"}, {value:"Zeze da Agricola"}, {value:"David Simao"}, {value:"Neuza"}, {value:"Helena de Lair"}, {value:"Artilho"}, {value:"Raimundo do Poco NOVO"}, {value:"EDILSON"}, {value:"MELQUE"}, {value:"Justificou o voto"}, {value:"Voto nulo"}, {value:"Voto em branco"}, {value:"Outra"}],
    [{value:"otima"}, {value:"Boa"}, {value:"Ruim"}, {value:"Pessima"}, {value:"Regular para bom"}, {value:"Regular para ruim"}, {value:"Nao foi eleito"},],
    [{value:"MUITO BOA"}, {value:"BOA"}, {value:"RUIM"}, {value:"PeSSIMA"},],
    [],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:'otima'}, {value:'Boa'}, {value:'Regular'}, {value:'Ruim'}, {value:'Pessima'}, {value:'Nao sei/Nao quero responder'},],
    [{value:"Concordo plenamente sinto que eles refletem minhas preocupacoes. (Sentimento: Identificacao Contentamento)"}, {value:"Nem sempre acho que ha certa desconexao com as necessidades da populacao. (Sentimento: Desconexao Insatisfacao)"}, {value:"Discordo sinto-me completamente sub-representado. (Sentimento: Descontentamento Alienamento)"},],
    [],
    /**47*/[/*A coleta de lixo	*/], [/*A polecia	*/], [/*A limpeza das ruas e calcadas	*/], [/*O estado de manutencao das ruas e calcadas da cidade	*/], [/*O controle dos camelos, mesas de bar e bancas de lojas	*/], [/*As quadras, pracas e espacos de lazer da cidade	*/], [/*As escolas publicas	*/], [/*O servico de saude publica	*/], [/*A iluminacao das ruas e pracas	*/], [/*O servico de agua	*/], [/*O servico de esgoto	*/],
    [{value:"Resultados e projetos realizados pela gestao. (Sentimento: Aprovacao, Confianca)"}, {value:"Escandalos de corrupcao ou ma gestao. (Sentimento: Desconfianca, Desilusao)"}, {value:"Falta de transparencia e comunicacao por parte dos poleticos. (Sentimento: Descontentamento Desconfianca)"}, {value:"Ajuda por parte dos poleticos com minhas necessidades ( Sentimento de necessidade)"},],
    [{value:"Propostas de campanha"}, {value:"Historico do candidato"}, {value:"Ideologia poletica"}, {value:"Debates eleitorais"}, {value:"Amizade com candidato"}, {value:"Amizade com as pessoas"}, {value:"Uma ajuda com algum favor"}, {value:"Escolho na hora mesmo"}, {value:"Outra"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"},],
    [{value:"Sim"}, {value:"Nao"}],
    [],
    /**30 */
    [/*1 Desemprego	*/],
    [/*2 Saude	*/],
    [/*3 Educacao	*/],
    [/*4 Pobreza	*/],
    [/*5 Salario	*/],
    [/*6 Violencia	*/],
    [/*7 Corrupcao	*/],
    [/*11 Poletica	*/],
    [/*12 Fome	*/],
    [/*13 Desigualdade	*/],
    [/*14 Transito	*/],
    [/*15 Enchentes	*/],
    [/*17 Favelas	*/],
    [/*18 agua	*/],
    [/*19 Esgoto	*/],
    [/*20 Urbanismo	*/],
    [/*21 Estacionamento	*/],
    [/*22 Transporte publico	*/],
    [/*23 Infraestrutura	*/],
    [/*24 Lazer*/],
    [""],
    [""],
    [""],
    [""],
    [""],
    [{value:"Importante"}, {value:"Longo"}, {value:"Interessante"}, {value:"Chato"},],
  ]
  const initialState = Array(colunasPesquisa3.length + 1).fill('');
  const [respostas, setRespostas] = useState(Array(colunasPesquisa3.length).fill(''));
  const downloadFromUrl = async () => {
    try {
      const origem = `${FileSystem.documentDirectory}${nomeArquivo}`;
      const destino = `${FileSystem.cacheDirectory}Download/${nomeArquivo}`; // Pasta de Downloads
      // Verificar se o arquivo já existe no destino
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
      // Verificar se o arquivo CSV já existe
      const fileInfo = await FileSystem.getInfoAsync(csvFilePath);
      if (!fileInfo.exists) {
        // Se o arquivo nao existir, criar um novo
        const initialCSVData = [
          colunasPesquisa3
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
      // Verificar se o arquivo CSV já existe
      const fileInfo = await FileSystem.getInfoAsync(csvFilePath);
      if (!fileInfo.exists) {
        // Se o arquivo nao existir, criar um novo com cabecalho
        const initialCSVData = [colunasPesquisa3];
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
  function handleToggle(index: number, value: boolean) {
    updateRespostas(index, value ? 'SIM' : 'NaO');
  }

  function updateRespostas(index: number, resposta: any) {
    setRespostas((prevRespostas) => {
      const newRespostas = [...prevRespostas];
      newRespostas[index] = resposta;
      return newRespostas;
    });
  }
  useEffect(()=>{
    updateRespostas(20, substituirVirgulaPorPonto(casaVeiculo));
  },[casaVeiculo])
  useEffect(()=>{
    updateRespostas(33, substituirVirgulaPorPonto(escolhaCandidato));
  },[escolhaCandidato])
  useEffect(()=>{
    updateRespostas(35, substituirVirgulaPorPonto(bomCandidatoCaracteristica));
  },[bomCandidatoCaracteristica]) 
 
  if (!aplicadorExistente) {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: "#d3d3d3" }}>
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
          Comecar a pesquisa
        </Text>
      </Button>
      <Text style={{ alignItems: 'flex-end', color: '#0c0c0c' }}>
        Versao Beta
      </Text>
    </View>)
  }
  else {
    return (
      <ScrollView  // ref={scrollViewRef}
      > 
        <StatusBar backgroundColor={'purple'} animated={true} showHideTransition={"fade"} />
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 60, backgroundColor: 'purple', borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: "700", fontFamily: "Roboto" }}>
            Pesquisa Baraunas
          </Text>
        </View>
        <View style={{ padding: 8 }}>{
            colunasPesquisa3.map((pergunta, index) => {
              return (<View key={"ViewP-" + index.toString()}>
                {/* <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => ( */}
                    <View >
                      <Text style={styles.pergunta}>
                        {/* {index}- */}
                        {pergunta}
                      </Text>
                      {
                        index == 22 || index == 36 || index == 55 || index == 63 || index == 80 ?
                          null
                          :
                          index == 6 || index == 12 || index == 15 || index > 100 && index < 106 ?
                            <>
                              <TextInput 
                                label={index === 6 || index === 12 || index === 15 ? "Digite a quantidade" : "Digite a mensagem"}
                                // value={text}
                                inputMode={index === 6 || index === 12 || index === 15 ? 'numeric' : 'text'}
                                onChangeText={(text) => { /*onChange(text);*/ updateRespostas(index, text); }}
                                style={styles.inputText}
                              />
                              
                            </>
                            :
                            index == 35 || index == 33 || index == 20 ?
                              <View  >
                                {/* <MultipleSelectList 
                                  setSelected={(valor: any) => {  console.log("valor: " + valor);  console.log("Veiculo: " + casaVeiculo); console.log("Candidato: " + escolhaCandidato);  }}
                                  data={RespostasPesquisa3[index]}
                                  save="value"
                                  label={"Pergunta-" + index.toString()}
                                  placeholder='Selecione as opcoes'
                                  searchPlaceholder='Digite o veiculo da casa que deseja encontrar'
                                /> */}
                                <CheckboxList options={RespostasPesquisa3[index]} selectedOptions={index == 35 ? bomCandidatoCaracteristica : index == 33 ? escolhaCandidato : casaVeiculo} onSelect={index == 35 ? setBomCandidatoCaracteristica : index == 33 ? setEscolhaCandidato : setCasaVeiculo} />
                         
                              {respostas[index] ? <Text style={{ color: 'green', textAlign: 'center' }}>{respostas[index]}</Text> : null}
                              </View>
                              : (index > 22 && index < 27) || (index > 36 && index < 44) || (index > 63 && index < 75) || index > 80 && index < 101 ?
                                <>
                                  <View >
                                    <StarRating rating={respostas[index]} onStarPress={(nota: any) => { /*onChange(nota);*/ updateRespostas(index, nota); }} />
                                   </View>
                                </>
                                :
                                index > 55 && index < 61 || index == 14 || index == 21 || index == 28 || index == 31 || index == 32 || index == 77 || index == 78 || index == 79 || index == 14 ?
                                  <>
                                    <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                                      <TouchableOpacity

                                        style={[styles.checkbox, respostas[index] == "SIM" && styles.checkedYes, { flex: 1, alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center' }]}
                                        onPress={() => { handleToggle(index, true); /*onChange("valor") */}}>
                                        <Text style={respostas[index] == "SIM" ? styles.labelSelect : styles.labelNotSelect}>SIM</Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity

                                        style={[styles.checkbox, respostas[index] == "NaO" && styles.checkedNo, { flex: 1, alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center' }]}
                                        onPress={() => { handleToggle(index, false); /*onChange("valor")*/ }} >
                                        <Text style={respostas[index] == "NAO" ? styles.labelSelect : styles.labelNotSelect}>NÃO</Text>
                                      </TouchableOpacity>
                                    </View>
                                    
                                  </>
                                  :
                                  <View>
                                    <SelectList
                                      setSelected={(valor: any) => { /*onChange(valor);*/ updateRespostas(index, valor); }}
                                      data={index == 3  ? regioesDiferentes[respostas[2] == 'CENTRO'? 0 : respostas[2] == 'NORTE'? 1 : respostas[2] == 'SUL'? 2 : respostas[2] == 'LESTE'? 3 : respostas[2] == 'OESTE'? 4 :0] : RespostasPesquisa3[index]}
                                      save="value"
                                      placeholder='Selecione a opcao'
                                      notFoundText='Dado no encontrado'
                                      searchPlaceholder='Digite o item que deseja encontrar'
                                    />
                                     
                                    {respostas[index] ? <Text style={{ color: 'green', textAlign: 'center' }}>{respostas[index]}</Text> : null}
                                  </View>
                      }
                    </View>
                  {/* )}
                  name={"Pergunta-"+index.toString()}
                  rules={{ required: index == 22 || index == 36 || index == 55 || index == 63 || index == 80 ? false : true }}
                /> */}
              </View>)
            })
          }
        </View>
        <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={downloadFromUrl}
            // teste
            >
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

