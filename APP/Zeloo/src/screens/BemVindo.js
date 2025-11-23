import React, { useRef, useState, useEffect } from "react";
import {View,Text,StyleSheet,TouchableWithoutFeedback,Dimensions,Image,FlatList,} from "react-native";
import colors from "./colors";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const { width, height } = Dimensions.get("window");

const slides = [
  {
    imagem: require("../../assets/images/fundo2.jpg"),
    title: "Bem-vindo ao Zeloo!",
    subtitle: "Um App que visa te ajudar a encontrar um cuidador de idoso ideal"
  },
  {
    imagem: require("../../assets/images/fundo.jpg"),
    title: "Encontre cuidadores confiáveis",
    subtitle: "Busque profissionais freelancer qualificados perto de você"
  },
  {
    imagem: require("../../assets/images/fundo1.jpg"),
    title: "Viva com tranquilidade",
    subtitle: "Conte com o apoio que você merece"
  }
];

export default function BemVindo({ navigation }) {
  const flatListRef = useRef(null);
  const [indexAtual, setIndexAtual] = useState(0);

  const irProximoSlide = () => {
    const novoIndex = (indexAtual + 1) % slides.length;
    flatListRef.current?.scrollToIndex({ index: novoIndex, animated: true });
    setIndexAtual(novoIndex);
  };
  
  /*
  useEffect(() => {
    const pedirPermissao = async () => { 
      const { status } = await Notifications.requestPermissionsAsync();
  
      if (status !== 'granted') {
        alert('Você negou a permissão de notificações.');
      } else {
        console.log("Permissão concedida!");
      }
    };
  
    pedirPermissao();
  }, []);*/

  useEffect(() => {
    const intervalo = setInterval(irProximoSlide, 4000);
    return () => clearInterval(intervalo);
  }, [indexAtual]);

  return (
    //Detecta toques na tela isso aqui
    <TouchableWithoutFeedback onPress={irProximoSlide}> 
      <View style={styles.Container}>
        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled //pra ele para em cada foto
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}  //nao arrasta com dedo só cloqie
          renderItem={({ item }) => (
            <View style={{ width, height }}>
              <Image source={item.imagem} style={styles.backgroundImage} />
              <View style={styles.overlay} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          )} //cada item desse renderItem ai vai ter as coisa dentro, cada slide, no caso
          onMomentumScrollEnd={(event) => {
            const novoIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setIndexAtual(novoIndex); //contentOffset.x é a posiçao atual do slide, ele pega isso ae e calcula pra atualiza a indexAtual e manter as coisa (textos e tals?) sincronizada
          }}
        />

        <View style={styles.mainButtons}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Cadastro")}>
            <View style={styles.button2}>
              <Text style={styles.buttonText}>Cadastro</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Container: { 
    flex: 1 
  },
  backgroundImage: { 
    width,
    height, 
    resizeMode: "cover", 
    position: "absolute" 
  },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "rgba(0,0,0,0.4)" 
  },
  textContainer: { 
    position: "absolute", 
    top: 80, 
    left: 20, 
    right: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: colors.branco, 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 18, 
    color: colors.branco
  },
  mainButtons: { 
    position: "absolute", 
    bottom: 100, 
    width: "100%", 
    flexDirection: "row", 
    justifyContent: "center", 
    gap: 20 
  },
  button: { 
    width: width * 0.3, 
    height: 50, 
    backgroundColor: colors.azul, 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10 
  },
  button2: {
    width: width * 0.3, 
    height: 50, 
    backgroundColor: colors.azul, 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10 
  },
  buttonText: { 
    color: colors.preto, 
    fontSize: 18, 
    fontWeight: "600" 
  }
});
