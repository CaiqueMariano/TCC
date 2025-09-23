import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';
import colors from './colors';
import { UserContext } from "./userContext";

const { width, height } = Dimensions.get("window");
export default function Conta({route, navigation}){
  
    const[mostrarExcluir, setMostrarExcluir] = useState(false);
    const { user } = useContext(UserContext);

    const excluirPerfil = async()=>{
        try{
           await axios.delete(`http://localhost:8000/api/excluirPerfil/${user.idUsuario}`);
           setMostrarExcluir(false);
           navigation.navigate("BemVindo");
    
        }catch(error){
          console.log(error);
        }
      }


    return(
        <View style={styles.container}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/volte.png')} style={styles.som} />
        </TouchableOpacity>


            <TouchableOpacity style={styles.botao}
              onPress={() => setMostrarExcluir(true)}
            >
             <Ionicons 
               style={styles.icon} 
               name="close-circle-sharp" 
               size = {40}     
               color="red"/>
               <Text style={styles.texto}>Excluir Conta</Text>

                <Ionicons 
              style={styles.icon} 
              name="chevron-forward" 
              size = {30} 
              color="red"/>
            </TouchableOpacity>

            <Modal
          visible={mostrarExcluir}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMostrarExcluir(false)}
          style={styles.modal}
        >

          
<View style={styles.view2}>

      <View style={styles.view3}>
       
                
                  <Text style={styles.textoExcluir}>Você tem certeza que deseja excluir?</Text>
                  <View style={styles.botoes}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText} onPress={()=>setMostrarExcluir(false)}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}>
                      <Text style={styles.buttonText2} onPress={excluirPerfil} >Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                </View>
        </Modal>


        </View>
    );
      
}



const styles = StyleSheet.create({
  textoExcluir:{
      fontSize:20,
      paddingTop:50,
      paddingBottom:30,
  },
  navbar:{
    paddingBottom:20,
  },    
    container: {
      flex: 1,
      backgroundColor: colors.branco,
      paddingTop:20,
    },

    view2:{
      flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', 
      justifyContent:'center',
      flexDirection:'column',
      
    },
    view3:{
      backgroundColor:'white',
      height:'50%',

    },
     texto:{
        marginBottom:5,
        fontSize:25,
        color: 'red',
        
    },  

    botao:{
      marginBottom:10,
      marginLeft:5,
      width:'96%',
      verticalAlign:'center',
      borderWidth:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderRadius:8,
      borderColor:'red',
      
    },
     botoes: {
    flexDirection: 'row',
    justifyContent:'center',
    gap:40
  
  },
  som: { 
    width: 40, 
    height: 40, 
    resizeMode: 'contain', 
    paddingBottom:60,
  },
  button: {
    width: width * 0.3,
    height: 50,
    borderColor: '#202020',
    borderWidth: 2,
    backgroundColor: colors.azul,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  button2: {
    width: width * 0.3,
    height: 50,
    backgroundColor: '#EF4B38',
    borderColor: colors.preto,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.preto,
    fontSize: 18,
    fontWeight: '600',
  },
   buttonText2: {
    color: colors.preto,
    fontSize: 18,
    fontWeight: '600',
  },
  });
  