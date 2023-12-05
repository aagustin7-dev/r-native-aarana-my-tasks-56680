import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal, ImageBackground, Pressable } from 'react-native'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { StatusBar } from 'expo-status-bar';

export default function App() {

    // Define vars
    const [textItem, setTextItem] = useState('') /* Variable definida para guardar las tareas */
    const [itemList, setItemList] = useState([]) /* Array definido para guardar todas las tareas creadas */
    const [itemSelectedToDelete, setItemSelectedToDelete] = useState({}) /* Variable que almacena el item(como objeto) a borrar de la lista de tareas */
    const [modalVisible, setModalVisible] = useState(false) /* Variable que almacena el estado del modal, si es visible o no */
    
    // Define Functions

    /* Función que va guardando el texto que se ingresa en el TextInput */
    const onChangeTextHandler = (text) => {
        setTextItem(text)
    }

    /* Función que agrega items al array */
    /* Los items serán agregados como objetos que tendrán un ID y un value */
    /* Se utiliza la sentencia de prevState para asegurarnos de que el estado de la variable es puro e inmutable */
    const addItemToList = () => {
        setItemList(prevState => [...prevState,{id: Math.random().toString(),value:textItem}])
        setTextItem('')
    }

    const onSelectItemHandler = (id) => {
      setModalVisible(!modalVisible)
      setItemSelectedToDelete(itemList.find((item)=>item.id===id))
    }
    
    const onDeleteItemHandler = () => {
      setItemList(itemList.filter((item)=>item.id!==itemSelectedToDelete.id))
      setModalVisible(!modalVisible)
    }

    /* Se define la función renderListItem proveniente de la prop correspondiente del componente FlatList */
    const renderListItem = ({item})=>(
        <View style={styles.itemList}>
            <Text style={styles.textList}>{item.value}</Text>
            <Pressable onPress={()=> onSelectItemHandler(item.id)}>
                <FontAwesomeIcon style={styles.iconTrash} icon={ faTrash } />
            </Pressable>
        </View>
    )

  return (
      <>
        <View style={styles.header}>
            <StatusBar backgroundColor='#292929' />
            <Text style={styles.headerText}>❖   Lista de compras   ❖</Text>
        </View>
        <View style={styles.addSpace}></View>
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Cargá tu producto"
                    onChangeText={onChangeTextHandler}
                    value={textItem}
                />
                <View style={styles.addSpace}></View>
                <Button
                    color="#7F7979"
                    title="Agregar"
                    onPress={addItemToList}
                />
            </View>
            <View style={styles.addSpace}></View>
            <FlatList
                data={itemList}
                renderItem={renderListItem}
                keyExtractor={item=>item.id}
            />
        </View>
        <Modal style={styles.modalGeneric} animationType="slide" visible={modalVisible}>
            <View style={styles.modalMessageContainer}>
                <Text style={styles.modalMessageContainerText}>El item <Text style={styles.itemContainerText}>{itemSelectedToDelete.value}</Text> será borrado...</Text>
                <Text style={styles.modalMessageContainerTextConfirmation}>¿Desea continuar?</Text>
            </View>
            <View style={styles.modalButtonContainer}>
                <Button title="Cancelar" color="#474747" onPress={()=>setModalVisible(!modalVisible)} />
                <Button title="Eliminar" color="#ef233c" onPress={()=>onDeleteItemHandler()} />
            </View>
        </Modal>
      </>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEA',
        padding: 50
    },
    inputContainer: {
        justifyContent: 'space-evenly'
    },
    textInput: {
        width: 300,
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
        alignSelf: 'center'
    },
    itemList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        margin: 5,
        backgroundColor: "#FFF6F6",
        borderRadius: 5
    },
    modalMessageContainer: {
        marginTop: 200,
        alignItems: "center",
        backgroundColor: '#4D1923',
        padding: 50
    },
    modalButtonContainer:{
        flexDirection:"row",
        justifyContent: "space-evenly",
        backgroundColor: '#4D1923',
        padding: 20
    },
    addSpace: {
        marginTop: 15
    },
    iconTrash: {
        color: "red"
    },
    textList: {
        fontSize: 15,
        letterSpacing: 1
    },
    modalMessageContainerText: {
        color: "white",
        fontSize: 20
    },
    modalMessageContainerTextConfirmation: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemContainerText: {
        fontStyle: 'italic'
    },
    header: {
        padding: 30,
        backgroundColor: '#230612',
        marginTop: 30
    },
    headerText: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white'
    }
});
