import React, { useState, useEffect } from 'react'
import uuid from 'uuid-random'
import { Button, View, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Header from './components/Header'
import Form from './components/Form'
import Contact from './components/Contact'

const initialContacts = {
  'blue': {
    id: 'blue',
    name: 'Leonardo',
    surname: 'Da Vinci',
    phone: '+7-952-5552-842'
  },
  'red': {
    id: 'red',
    name: 'Raphael',
    surname: 'Santi',
    phone: '+7-903-5551-032'
  },
  'purple': {
    id: 'purple',
    name: 'Donatello',
    surname: 'Bardi',
    phone: '+7-953-5556-906'
  }
}

const App = () => {
  const [contacts, setContacts] = useState(initialContacts)
  const [isFormOpened, setIsFormOpened] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    updateContacts()
  }, [contacts])

  const loadContacts = async () => {
    try {
      const data = await AsyncStorage.getItem('contacts')
      data && setContacts(JSON.parse(data))
      setIsLoaded(true)
    } catch (error) {
      console.error(error)
    }
  }

  const updateContacts = async () => {
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts))
  }

  const onFormChange = () => {
    setIsFormOpened(prevState => !prevState)
  }

  const onContactAdd = (name, surname, phone) => {
    const id = uuid()
    setContacts(prevState => ({
      ...prevState,
      [id]: { id, name, surname, phone }
    }))
  }

  const onContactEdit = (id, name, surname, phone) => {
    setContacts(prevState => ({
      ...prevState,
      [id]: { id, name, surname, phone }
    }))
  }

  const onContactDelete = id => {
    const { [id]: deletedValue, ...newState } = contacts
    setContacts(newState)
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {
        !isFormOpened
          ? (
            <Button
              title="Добавить контакт"
              onPress={onFormChange}
            />
          )
          : (
            <Form
              onFormChange={onFormChange}
              onFormSubmit={onContactAdd}
            />
          )
      }
      {
        isLoaded && (
          <FlatList
            data={Object.values(contacts)}
            renderItem={({ item: { id, name, surname, phone } }) => {
              return (
                <Contact
                  id={id}
                  name={name}
                  surname={surname}
                  phone={phone}
                  onContactDelete={onContactDelete}
                  onContactEdit={onContactEdit}
                />
              )
            }}
          />
        )
      }
    </View>
  )
}

export default App
