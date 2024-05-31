import axios from 'axios'
import { Contact } from '@/types/Contact'

//Definir os métodos que serão utilizados para manipular a api

//Endereço da API
const API_URL = 'http://localhost:8080/contacts'

//Salvar Contato
export const saveContact = async (contact: any) => {
  return await axios.post(API_URL, contact)
}

//Listar contatos
export const getContacts = async (page = 0, size = 10) => {
  return await axios.get(`${API_URL}?page${page}&size=${size}`)
}

//Buscar um contato por id
export const getContact = async (id: string) => {
  return await axios.get<Contact>(`api/contacts/${id}`)
}

//Atualizar um contato
export const updateContact = async (contact: Contact) => {
  return await axios.put(`api/contacts/${contact.id}`, contact)
}

//Atualizar uma imagem
export const updateImage = async (formData: FormData) => {
  return await axios.post('api/contacts/upload', formData)
}

//Deletar contato
export const deleteContact = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`)
}
