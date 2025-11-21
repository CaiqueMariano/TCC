import React, { useState, useEffect, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions 
} from 'react-native';
import axios from 'axios';
import { API_URL } from './link';
import { UserContext } from './userContext';

const screenWidth = Dimensions.get('window').width;


export default function ListaConversas({navigation}) {
    const {user} = useContext(UserContext);
    const [meses, setMeses] =useState([
        'Jan', 'Fev', 'Mar', 'Abril', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ])
    const [isLoading, setIsLoading] = useState(true);
    const [rendaMensal, setRendaMensal] = useState([]);
    const[converSelecionada, setConversaSelecionada] = useState([]);
    //const [dataAtual, setDataAtual]=useState("");
    
    
    
    const [conversas, setConversas] = useState([]);


    const atualizarConversas = async () => {
        axios
        .get(`${API_URL}/api/verConversas/${user.idUsuario}`)
        .then(
            response =>{
                setConversas(response.data.data)
            }
        ).catch(error => console.log("erro:", error));
    }
    useEffect(() => {
        atualizarConversas()
        const interval = setInterval(() => {
            atualizarConversas();
          }, 2000); 
        
          return () => clearInterval(interval);
    }, []);
   
   
    return (
        <ScrollView style={styles.container}>       

            <View style={styles.cardsGanhos}>
            {conversas
            .sort((a, b) => new Date(`${b.horaConversa}T${b.horaConversa}`) - new Date(`${a.horaConversa}T${a.horaConversa}`))
            .map((item, index) => {

                const data = new Date(item.horaConversa);
                const h= data.getHours();
                const m = data.getMinutes();



            return (
                <TouchableOpacity onPress={()=>{
                    setConversaSelecionada(item);
                    
                    navigation.navigate("Conversas",{ converSelecionada: item })}}>
                <View style={styles.cardG} key={index}>
                    
                    <View style={styles.mensagem}>
                        <Image
                            source={{uri: `${API_URL}/storage/${item.fotoProfissional}`}}
                            style={styles.foto}
                            />   
                        <Text style={styles.titulo}>{item.nomeProfissional}</Text>
                    </View>
                    <Text style={styles.data}>{h}h:{m}</Text>
                    <Text style={styles.horario}>{item.conteudoMensagens}</Text>
                    
        
                </View>
                </TouchableOpacity>
            );
            })}
                
            </View>
            
            
            
    
            
            <View style={{ height: 50 }} />
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
        paddingTop: 40, 
    },
    foto: { 
        width: 80, 
        height: 80,
        borderRadius: 50 
        },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 5,
    },

    mensagem:{
        flexDirection:'row',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 14,
        color: '#666',
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#b08cff', 
        marginTop: 5,
    },
   
    cardsGanhos:{
        width:'100%',
    },

    cardG:{
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#DBDBDB',   
        width:'100%',
        flexDirection: 'column',
      
    },
    data:{
        fontSize: 18,
        fontWeight: '400',
        marginBottom:5,
        position:"absolute",
        marginTop:10,
        left:310,
    },
      
    valorContainer: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 5,
    },
        

    valor:{
        color:'green',
        fontSize:15,
        fontWeight:'500',
       
    },
    titulo:{
        marginLeft:10,
        marginTop:20,
        fontSize: 20,
        fontWeight: '600',
    },
    horario:{
        fontSize:15,
        color:'gray',
        position: 'absolute',
        bottom: 30,  
        left:105   

    },
});