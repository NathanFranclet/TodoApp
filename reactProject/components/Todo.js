import React, { useState, useEffect, useContext } from "react"
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity, TextInput, Button } from 'react-native'
import { updateDoneTodo, updateTitleTodo } from '../API/todoAPI'
import { TokenContext } from '../Context/Context'


export default function Todo(props) {

    const [token, setToken] = useContext(TokenContext)
    const [done, setDone] = useState(props.item.done)
    const [edit, setEdit] = useState(false)
    const [todoTitle, setTodoTitle] = useState(props.item.title)
    const [newTodoTitle, setNewTodoTitle] = useState(todoTitle)
    const [error, setError] = useState('') 

    const toggleSwitch = () => {
        updateDoneTodo(props.item.id, !props.item.done, token)
        .then(tasks => {
            setDone(previousState => !previousState)
          })
          .catch(err => {
            setError(err.message)
          })
    }

    const updateTitle = () => {
        updateTitleTodo(props.item.id, newTodoTitle, token)
        .then(tasks => {
            setTodoTitle(newTodoTitle)
            setEdit(false)
          })
          .catch(err => {
            setError(err.message)
          })        
    }
    
    useEffect(() => {
        props.item.done = done
        props.updateProgessBar()
    }, [done])

    return (
        <View style={styles.content}>
            {edit === true ? (
                <View style={{flexDirection:"row", gap: 10}}>
                    <TextInput style={styles.text_input}
                            onChangeText={setNewTodoTitle}
                            placeholder=' Saisir le nouveau titre de votre tâche'
                            onSubmitEditing={updateTitle}
                            value={newTodoTitle}
                    />
                    <Button
                        onPress={updateTitle}
                        title="Valider la nouveau titre"
                    />
                    <Button
                        onPress={() => setEdit(false)}
                        title="Annuler la modification"
                    />
                    {error ? (
                        <Text style={{color:'red'}}>{error}</Text>
                    ) : (
                        []
                    )}
                </View>
            ):(
                <>
                    <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{todoTitle}</Text>
                    <Switch style={{marginRight: 10}} value={done} onValueChange={toggleSwitch} />
                    <TouchableOpacity onPress={() => setEdit(true)}>
                        <Image source={require('../assets/edit-todo.png')} style={{ height: 24, width: 24 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.deleteTodo}>
                        <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
                    </TouchableOpacity>
                </>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        margin: 10
    },
    text_item: {
        marginRight: 40,
        width: 100
    },
    text_input: {
        backgroundColor: 'white',
        width: 100
    }
})