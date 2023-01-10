import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native'
import { UsernameContext, TokenContext } from '../Context/Context'
import { createTodo, getTodo, deleteTodo } from '../API/todoAPI'
import ProgressBar from 'react-native-progress/Bar'
import Todo from '../components/Todo'
import Export from '../components/Export'

export default function TodoLists() {

  const [username, setUsername] = useContext(UsernameContext)
  const [token, setToken] = useContext(TokenContext)
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [newTodoText, setNewTodoText] = useState('')
  const [visibleMode, setVisibleMode] = useState('all')
  const [percentage, setPercentage] = useState(0)

  const addNewTodo = () => {
    if (newTodoText == '') return
    createTodo(newTodoText, false, username, token)
    .then(tasks => {
      setTodos([...todos, tasks.tasks[0]])
      setNewTodoText('')
    })
    .catch(err => {
      setError(err.message)
    })
  }

  const updateProgessBar = () => {
    setPercentage(Object.values(todos).filter(todo => todo.done === true).length/todos.length)
  }

  const deleteTodoById = (id) => {
    deleteTodo(id, token)
    .then(nodesDeleted => {
      if(nodesDeleted.nodesDeleted > 0) setTodos(todos.filter(item => item.id !== id))
    })
    .catch(err => {
      setError(err.message)
    })
  }

  useEffect(() => {
    getTodo(username, token)
    .then(tasks => {
        setTodos(tasks)
      })
      .catch(err => {
        setError(err.message)
      })
    setTodos(getTodo(username, token))
  }, [])

  useEffect(() => {
    setCount(Object.values(todos).filter(item => (visibleMode == 'all' || (visibleMode == 'done' && item.done == true) || (visibleMode == 'undone' && item.done == false))).length)
    setTotalCount(todos.length)
    updateProgessBar()
  }, [todos, visibleMode, percentage])



  return (
      <View
        style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <View style={{flexDirection:"row", gap: 10, paddingTop: 10}}>
          <Button
              onPress={() => setVisibleMode('all')}
              title="Tous"
          />
          <Button
              onPress={() => setVisibleMode('done')}
              title="Tâches réalisées"
          />
          <Button
              onPress={() => setVisibleMode('undone')}
              title="Tâches non réalisées"
          />
        </View>
        <Export visibleMode={visibleMode} todos={todos} />
        <View style={{zIndex: -1, flexDirection:"row", gap: 10, paddingTop: 20, marginBottom: 30}}>
          <TextInput style={styles.text_input}
                  onChangeText={setNewTodoText}
                  placeholder=' Saisir ici une nouvelle tâche'
                  onSubmitEditing={addNewTodo}
                  value={newTodoText}
          />
          <Button
              onPress={addNewTodo}
              title="Créer la tâche"
          />
        </View>
        <View style={{zIndex: -1}}>
          <Text>Nombre total de tâches : {totalCount}</Text>
        {count > 0 ? (  
          <>
            <ProgressBar progress={percentage} width={200} />
            <Text style={{marginBottom:30}}>{(percentage*100).toFixed()}% des tâches ont été réalisées</Text>
            <Text>Liste des tâches ({count} affichées) :</Text>
            <FlatList
                style={{ marginBottom: 20 }}
                data={todos}
                renderItem={({item}) => {
                  if(visibleMode == 'all' || (visibleMode == 'done' && item.done == true) || (visibleMode == 'undone' && item.done == false)) return <Todo item={item} updateProgessBar={updateProgessBar} deleteTodo={() => deleteTodoById(item.id)} />
            }} />
          </>
        ):(
          <Text>Aucune tâche à afficher</Text>
        )}
          {error ? (
            <Text style={{color:'red'}}>{error}</Text>
          ) : (
            []
          )}

        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  text_input: {
    backgroundColor: 'white',
    width: 300
  }
})