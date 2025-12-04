import React, { useState, useEffect, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Image,
    TextInput,
    
    TouchableOpacity,
    ActivityIndicator,
    Dimensions 
} from 'react-native';
import axios from 'axios';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
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
    const [pesquisa, setPesquisa] = useState('');
    const[converSelecionada, setConversaSelecionada] = useState([]);
    //const [dataAtual, setDataAtual]=useState("");
    
    
    const pegarConversas  = (item) => {
        setConversaSelecionada(item)
        navigation.navigate("Conversas",{ converSelecionada: item });
    }
    const [conversas, setConversas] = useState([]);


    const atualizarConversas = async () => {
        axios
        .get(`${API_URL}/api/verConversasFree/${user.idProfissional}`)
        .then(
            response =>{
                setConversas(response.data.data)
            }
        ).catch(error => console.log("erro é esse?:", error));
    }
    useEffect(() => {
        atualizarConversas()
        const interval = setInterval(() => {
            atualizarConversas();
          }, 15000); 
        
          return () => clearInterval(interval);
    }, []);

    const filtrados = conversas.filter((item) =>
        item.nomeUsuario?.toLowerCase().includes(pesquisa.toLowerCase())
      );
   
    return (
        <ScrollView style={styles.container}>   


<View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#555" style={{ marginHorizontal: 8 }} />
          <TextInput
            style={styles.input}
            placeholder="Pesquise"
            placeholderTextColor="#666"
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>

        {filtrados.length === 0 && (
           
           <Text style={styles.semContratos}>Nenhuma conversa foi encontrada.</Text>

          )}

       
      </View> 

            <View style={styles.cardsGanhos}>
            {filtrados
            .sort((a, b) => new Date(`${b.horaConversa}T${b.horaConversa}`) - new Date(`${a.horaConversa}T${a.horaConversa}`))
            .map((item, index) => {

                const data = new Date(item.horaConversa);
                const h= data.getHours();
                const m = data.getMinutes();



            return (
                <TouchableOpacity onPress={()=> pegarConversas(item)}>
                <View style={styles.cardG} key={index}>
                    
                    <View style={styles.mensagem}>
                        <Image
                            source={{uri: `${API_URL}/storage/${item.fotoUsuario}`}}
                            style={styles.foto}
                            />   
                        <Text style={styles.titulo}>{item.nomeUsuario}</Text>
                    </View>
                    <Text style={styles.data}>{h}h{m}</Text>
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

    semContratos:{
        textAlign:'center',
        textDecorationLine: 'underline',
        fontStyle:'italic',
        marginTop:'50%',
        fontSize:23,
        color:"gray"
       },

    searchContainer: {
        width: '90%',
        alignItems: 'center',
        marginLeft:20,
        marginBottom:30,
        marginTop: 15,
      },
      searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#b08cff',
        width: '100%',
        height: 45,
      },
      input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
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