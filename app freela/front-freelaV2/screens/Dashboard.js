import React, { useState, useEffect, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    ActivityIndicator,
    Dimensions 
} from 'react-native';
import axios from 'axios';
import { API_URL } from './link';
import { UserContext } from './userContext';
import { LineChart } from 'react-native-chart-kit'; 
const screenWidth = Dimensions.get('window').width;


export default function Dashboard() {
    const {user} = useContext(UserContext);
    const [meses, setMeses] =useState([
        'Jan', 'Fev', 'Mar', 'Abril', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ])
    const [isLoading, setIsLoading] = useState(true);
    const [rendaMensal, setRendaMensal] = useState([]);
    //const [dataAtual, setDataAtual]=useState("");
    
    
    
    const [extrato, setExtrato] = useState([]);
    useEffect(() => {
        const calcularData = () => {
            const dataObj = new Date();
            const m = dataObj.getMonth() + 1;
            console.log(m);
            axios
            .get(`${API_URL}/api/contasExtrato/${user.idProfissional}/${m}`)
            .then(
                response =>{
                    setRendaMensal(response.data.data)
                }
            ).catch(error => console.log("erro:", error));
            console.log("RENDAAAAAAAAAAAA",rendaMensal);

        };
    
        calcularData();
    }, []);
   
    useEffect(()=>{
        
        axios
          .get(`${API_URL}/api/buscarExtrato/${user.idProfissional}`)
          .then(response => {
            setExtrato(response.data.data);
          })
          .catch(error => console.log("ERRO:", error));
      },[])
    return (
        <ScrollView style={styles.container}>
           

           
            <View style={styles.summaryContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Total Recebido (Mês)</Text>
                    <Text style={styles.cardValue}>R${rendaMensal}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Média Diária</Text>
                    <Text style={styles.cardValue}>R$ </Text>
                </View>
            </View>


            <View style={styles.cardsGanhos}>
            {extrato
            .sort((a, b) => new Date(`${b.dataExtrato}T${b.horarioExtrato}`) - new Date(`${a.dataExtrato}T${a.horarioExtrato}`))
            .map((item, index) => {


            const data = new Date(`${item.dataExtrato}T${item.horarioExtrato}`);

            const dia = String(data.getDate()).padStart(2, "0");
            const mesIndex = data.getMonth(); 
            const mes = meses[mesIndex]; 

            const hora = String(data.getHours()).padStart(2, "0");
            const min = String(data.getMinutes()).padStart(2, "0");

            return (
                <View style={styles.cardG} key={index}>
                    <Text style={styles.data}>{dia}/{mes}</Text>
                    <Text style={styles.titulo}>{item.nomeServico}</Text>
                    <Text style={styles.horario}>{hora}h{min}</Text>

                    <View style={styles.valorContainer}>
                        <Text style={styles.valor}>R$ {item.valor}</Text>
                    </View>
                </View>
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
   
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 5,
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
        fontWeight: '600',
        marginBottom:5
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
        fontSize: 16,
        fontWeight: '600',
    },
    horario:{
        fontSize:15,
        color:'gray',
        position: 'absolute',
        bottom: 10,  
        left:15   

    },
});