import React, { useRef, useState, useEffect } from "react";
import {View,Text,StyleSheet,TouchableWithoutFeedback,Dimensions,Image,FlatList,} from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    imagem: require("../assets/fundo2.jpg"),
    title: "Bem Vindo! ",
    subtitle: " Seja bem vindo ao Zeloo para cuidadores."
  },
  {
    imagem: require("../assets/fundo.jpg"),
    title: "Trabalhe conosco",
    subtitle: "Encontre clientes, dê suas propostas, controle seus ganhos tudo no mesmo lugar."
  },
  {
    imagem: require("../assets/fundo1.jpg"),
    title: "Bom para ambas as partes",
    subtitle: "Trabalhe e ganhe o justo e o ideal para ambas as partes."
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
                <Image
                  source={require('../assets/logo.png')}
                  style={{ width: 130, height: 130 }}
                />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
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
              <Text style={styles.buttonText}>Acessar</Text>
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
    color: "#FFFFFF", 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 18, 
    color: "#FFFFFF"
  },
  mainButtons: { 
    position: "absolute", 
    bottom: 100, 
    width: "100%", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center"
  },
  button: { 
    width: width * 0.5, 
    height: 50, 
    backgroundColor: "#b08cff", 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10 
  },
  buttonText: { 
    color: "#ffffffff", 
    fontSize: 18, 
    fontWeight: "600" 
  }
});