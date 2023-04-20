import { Button, message } from 'antd'
import React from 'react'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const auth = useAuth()
  const history = useNavigate()

  const handleLogout = () => {
    try {
      auth.logout()
      history('/login')
    } catch (error) {
      message.error('Erro ao tentar deslogar')
    }
  }

  return (
    <div>
      <h2>Olá esse é o componente profile</h2>
      <h2> É possivel trabalhar com token em qualquer componente {auth.token}</h2>
      
      <Button type='primary' onClick={handleLogout}>
        Log out
      </Button>
    </div>
  )
}

export default Profile
