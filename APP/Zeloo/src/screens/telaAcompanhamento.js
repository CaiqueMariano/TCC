import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  FlatList,
  TextInput
} from 'react-native';

const ICONE = {
    ADD: '➕', 
    REMOVE: '❌',
    CHECK: '✓'
};

const Checkbox = ({ item, onToggle }) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onToggle(item.id)}
      activeOpacity={0.7}
    >
      <View 
          style={[
              styles.checkbox, 
              { borderColor: item.concluido ? '#4CAF50' : '#888' }
          ]}
      >
        {item.concluido && <Text style={styles.checkText}>✓</Text>}
      </View>
      <Text style={[
          styles.text, 
          { color: item.cor || 'black' },
          item.concluido && styles.textConcluido
      ]}>
          {item.titulo} 
      </Text>
    </TouchableOpacity>
);

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false); 

  const adicionarTarefa = () => {
      if (!mostrarInput) {
          setMostrarInput(true); 
          return;
      }

      if (novaTarefa.trim() === '') return;

      const nova = {
        id: Date.now().toString(),
        titulo: novaTarefa.trim(),
        concluido: false,
        cor: 'black'
      };

      setTarefas(prev => [...prev, nova]);
      setNovaTarefa('');
      setMostrarInput(false); 
  };

  const excluirTarefa = () => {
      if (tarefas.length === 0) return;
      const novasTarefas = tarefas.slice(0, -1);
      setTarefas(novasTarefas);
  };
    
  const toggleConclusao = (id) => {
    setTarefas(prevTarefas =>
      prevTarefas.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, concluido: !tarefa.concluido }
          : tarefa
      )
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentArea}> 
        
        <Text style={styles.sectionTitle}>Lista de Tarefas</Text>

        {mostrarInput && (
          <TextInput
            style={styles.input}
            placeholder="Digite a tarefa"
            value={novaTarefa}
            onChangeText={setNovaTarefa}
          />
        )}

        <FlatList
            data={tarefas}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Checkbox item={item} onToggle={toggleConclusao} />}
            scrollEnabled={true}
            ListEmptyComponent={() => (
                <Text style={styles.listaVaziaText}>Nenhuma tarefa no momento. Adicione uma!</Text>
            )}
            contentContainerStyle={styles.listContent}
        />

        {/* Botões em coluna */}
        <View style={styles.bottomButtonsColumn}>
          <TouchableOpacity style={styles.actionButton} onPress={adicionarTarefa}>
            <Text style={styles.actionText}>Adicionar</Text>
            <Text style={styles.actionIcon}>{ICONE.ADD}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={excluirTarefa}>
            <Text style={styles.actionText}>Excluir</Text>
            <Text style={styles.actionIcon}>{ICONE.REMOVE}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Conversar</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Informações (Muda conforme o idoso)</Text>
            <Text style={styles.infoText}>10:00 - 18:30</Text>
            <Text style={styles.infoText}>Em casa</Text>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 20 
  }, 

  contentArea: { 
    flex: 1, 
    paddingHorizontal: 20
  },

  sectionTitle: { 
    textAlign: 'center',
    fontSize: 22, 
    fontWeight: 'bold', 
    marginVertical: 20, 
    color: '#333' 
  },

  input: { 
    fontSize: 18,
    borderWidth:1, 
    borderColor:'#ccc', 
    padding:10, 
    borderRadius:5, 
    marginBottom:10 
  },

  listaVaziaText: { 
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20, 
    fontStyle: 'italic', 
    color: '#888' 
  },

  listContent: { 
    paddingBottom: 20 
  },

  checkboxContainer: { 
    flexDirection:'row',
    alignItems:'center',
    marginBottom: 10,
  },

  checkbox: { 
    width:24, 
    height:24, 
    borderWidth:2, 
    borderRadius: 0, 
    justifyContent:'center', 
    alignItems:'center', 
    marginRight:10 
  },

  checkText: { 
    fontSize:22, 
    color:'#4CAF50', 
    lineHeight: 22 
  },

  text: { 
    fontSize:18,
  },

  textConcluido: { 
    fontSize:18, 
    extDecorationLine:'line-through', 
    color:'#888' 
  },
  
  bottomButtonsColumn: { 
    flexDirection:'column', 
    justifyContent:'center', 
    marginTop: 20,
    gap: 10 // espaçamento entre os botões (opcional)
  },

  actionButton: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center',
    padding:10, 
    borderRadius:10 
  },

  actionText: { 
    fontSize:20,
    marginRight: 7
  },

  actionIcon: { 
    fontSize: 18
  },

  mainButton: { 
    backgroundColor: '#D8BFD8', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop:30 
  },
  
  mainButtonText: { 
    fontSize: 20,
    fontWeight: 'bold', 
    color: '#333' 
  },
  
  infoSection: { 
    alignItems: 'center', 
    marginTop:20 
  },

  infoTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    paddingBottom: 20 
  },

  infoText: { 
    fontSize: 18, 
    color: '#555', 
    paddingBottom: 25 
  },
});