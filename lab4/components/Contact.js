import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Swipeout from 'react-native-swipeout'
import Emoji from 'react-native-emoji'
import Form from './Form'

const Contact = ({ id, name, surname, phone, onContactEdit, onContactDelete }) => {
  const [isFormOpened, setIsFormOpened] = useState(false)

  const onFormChange = () => {
    setIsFormOpened(prevState => !prevState)
  }

  const onEditButtonClick = (name, surname, phone) => {
    onContactEdit(id, name, surname, phone)
  }

  let swipeoutButtons = [
    {
      text: 'Изменить',
      backgroundColor: '#0080ff',
      onPress: () => onFormChange()
    },
    {
      text: 'Удалить',
      backgroundColor: '#cd0000',
      onPress: () => onContactDelete(id)
    }
  ]

  return (
    <>
      <Swipeout right={swipeoutButtons}>
        <View style={styles.contactWrapper}>
          <View style={styles.contact}>
            <View>
              <Text style={styles.name}>{name} {surname}</Text>
              <Text style={styles.phone}>{phone}</Text>
            </View>
            <Emoji name="arrow_left" style={{ fontSize: 18 }} />
          </View>
        </View>
      </Swipeout>
      {
        isFormOpened && (
          <Form
            onFormChange={onFormChange}
            onFormSubmit={onEditButtonClick}
            dataToChange={{ name, surname, phone }}
          />
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  contactWrapper: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
  },
  phone: {
    color: '#a9a9a9'
  },
  deleteButton: {
    padding: 0,
    fontSize: 18,
  }
})

export default Contact
