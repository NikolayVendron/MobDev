import React, { useState } from 'react'
import { View, Button, StyleSheet, TextInput } from 'react-native'

const Form = ({ onFormChange, onFormSubmit, dataToChange }) => {
  const [name, setName] = useState(dataToChange ? dataToChange.name : '')
  const [surname, setSurname] = useState(dataToChange ? dataToChange.surname : '')
  const [phone, setPhone] = useState(dataToChange ? dataToChange.phone : '')

  const onAddButtonPress = () => {
    if (name && surname && phone) {
      onFormSubmit(name, surname, phone)
      setName('')
      setSurname('')
      setPhone('')
      onFormChange()
    } else {
      alert('Введите все данные')
    }
  }

  const onCancleButtonPress = () => {
    setName('')
    setSurname('')
    setPhone('')
    onFormChange()
  }

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        onChangeText={name => setName(name)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Фамилия"
        onChangeText={surname => setSurname(surname)}
        value={surname}
      />
      <TextInput
        style={styles.input}
        placeholder="Телефон"
        onChangeText={phone => setPhone(phone)}
        value={phone}
      />
      <View style={styles.buttons}>
        <Button
          title="Готово"
          color="#228b22"
          onPress={onAddButtonPress}
        />
        <Button
          title="Отмена"
          color="#cd0000"
          onPress={onCancleButtonPress}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'darkslateblue',
    height: 40,
    margin: 5,
    paddingHorizontal: 5,
    color: '#ffffff',
    fontSize: 16
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  }
})

export default Form
