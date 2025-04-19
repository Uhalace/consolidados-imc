import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

// Componente para mostrar o resultado do IMC
function ResultImc({ messageResultImc, resultImc }) {
  return (
    <View style={styles.result}>
      <Text style={styles.resultImcText}>
        {messageResultImc} {/* Mensagem do IMC */}
      </Text>
      {/* Só mostra o resultado se existir */}
      {resultImc !== '' && (
        <Text style={styles.infoImc}>
          {resultImc}  {/* Exibe o resultado do IMC */}
        </Text>
      )}
    </View>
  );
}

export default function App() { // Componente principal do aplicativo
  // Estados para armazenar altura, peso, mensagens, IMC e texto do botão
  const [height, setHeight] = useState(''); // Altura
  const [weight, setWeight] = useState(''); // Peso
  const [messageImc, setMessageImc] = useState("Preencha o peso e a altura"); // Mensagem inicial
  const [imcClassification, setImcClassification] = useState(''); //classificação do IMC
  const [textButton, setTextButton] = useState("Calcular"); // Texto do botão

  // Função que classifica o IMC baseado no valor
  function getImcClassification(imc) {
    const value = parseFloat(imc); // Converte o IMC para número
    if (value < 18.5) return 'Abaixo do peso'; // Abaixo do peso
    if (value < 25) return 'Peso normal'; // Peso normal
    if (value < 30) return 'Sobrepeso'; // Sobrepeso
    if (value < 35) return 'Obesidade grau I'; // Obesidade grau I
    if (value < 40) return 'Obesidade grau II'; // Obesidade grau II
    return 'Obesidade grau III'; // Obesidade grau III
  }

  // Função que calcula o IMC e define a classificação
  function imcCalculator() {
    const heightFloat = parseFloat(height); // Converte a altura para número
    const weightFloat = parseFloat(weight); // Converte o peso para número

    // Verifica se os valores são válidos
    if (heightFloat && weightFloat) {
      const result = (weightFloat / (heightFloat * heightFloat)).toFixed(2);
      const classification = getImcClassification(result);
      
      // Atualiza os estados com o IMC e a classificação
      setImcClassification(`${result} - ${classification}`);
      setMessageImc("Seu IMC é:");
      setTextButton("Calcular novamente");
    } else {
      // Se os dados forem inválidos
      setImcClassification('');
      setMessageImc("Preencha o peso e a altura corretamente");
      setTextButton("Calcular");
    }
  }

  // Função que valida os campos antes de calcular
  function validationImc() {
    if (weight && height) {
      imcCalculator();
    } else {
      // Campos vazios
      setImcClassification('');
      setMessageImc("Preencha o peso e altura");
      setTextButton("Calcular"); 
    }
  }

  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.boxTitle}>
        <Text style={styles.textTitle}>Consolidados IMC</Text>
      </View>

      {/* Formulário */}
      <View style={styles.formContext}>
        <View style={styles.form}>
          {/* Campo altura */}
          <Text style={styles.formLabel}>Altura:</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Ex: 1.75" // Exemplo de altura
            keyboardType="numeric" // Tipo numérico
            value={height} // Valor da altura
            onChangeText={(text) => setHeight(text.replace(',', '.'))} // Substitui vírgula por ponto
          />

          {/* Campo peso */}
          <Text style={styles.formLabel}>Peso:</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Ex: 80.5" // Exemplo de peso
            keyboardType="numeric" //Tipo numérico
            value={weight} // Valor do peso
            onChangeText={(text) => setWeight(text.replace(',', '.'))} // Substitui vírgula por ponto
          />

          {/* Botão */}
          <TouchableOpacity onPress={validationImc} style={styles.formButton}>
            <Text style={styles.formTextButton}>{textButton}</Text>
          </TouchableOpacity>
        </View>

        {/* Resultado do IMC */}
        <ResultImc messageResultImc={messageImc} resultImc={imcClassification} />
      </View>
    </View>
  );
}

// Estilos do aplicativo
const styles = StyleSheet.create({
  container: { // Estilo do container
    flex: 1,
    backgroundColor: '#e0e5e5',
    paddingTop: 80,
  },
  boxTitle: { // Estilo do título
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textTitle: { // Estilo do título
    color: "#FF0043",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    padding: 10,
  },
  formContext: { // Estilo do formulário
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  form: { // Estilo do formulário
    width: "100%",
    padding: 10,
    marginTop: 30,
  },
  formLabel: { // Estilo do texto dos campos
    color: "#000000",
    fontSize: 18,
    paddingLeft: 20,
  },
  formInput: { // Estilo dos campos de entrada
    width: "90%",
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
    height: 40,
    margin: 12,
    paddingLeft: 10,
  },
  formButton: { // Botão de calcular
    backgroundColor: "#FF0043",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 12,
    marginTop: 30,
  },
  formTextButton: { // Texto do botão
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  result: { // Estilo do resultado
    alignItems: "center",
    marginTop: 30,
    padding: 20,
    width: "90%",
    borderRadius: 10,
  },
  resultImcText: { // Texto do resultado
    fontSize: 24,
    color: "#FF0043",
    textAlign: "center",
    fontWeight: "bold",
  },
  infoImc: { // Texto do resultado
    fontSize: 24,
    color: "#FF0043",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
});
