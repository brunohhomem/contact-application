// services/contactService.ts
import axios from 'axios'
import { ContactData } from './../types/ContactData'

// Endereço da API
const API_URL = 'http://localhost:8080/contacts'

// Salvar Contato
export const saveContact = async (contact: ContactData) => {
  return await axios.post(API_URL, contact)
}

// Listar contatos
export const getContacts = async (page = 0, size = 10) => {
  const response = await axios.get<{ content: ContactData[] }>(
    `${API_URL}?page=${page}&size=${size}`
  )
  return response.data.content
}

// Buscar um contato por id
export const getContact = async (id: string) => {
  return await axios.get<ContactData>(`api/contacts/${id}`)
}

// Atualizar um contato
export const updateContact = async (contact: ContactData) => {
  return await axios.put(`api/contacts/${contact.id}`, contact)
}

// Atualizar uma imagem
export const updateImage = async (formData: FormData) => {
  return await axios.post('api/contacts/upload', formData)
}

// Deletar contato
export const deleteContact = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`)
}
