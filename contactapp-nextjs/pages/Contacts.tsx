// pages/contacts.tsx
'use client'

import { useEffect, useState } from 'react'
import { ContactData } from '../types/ContactData'
import { getContacts } from '@/api/ContactService'

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsData = await getContacts()
        console.log('Fetched contacts:', contactsData) // Adicione esta linha para logar os dados

        // Verifique se a resposta é um array antes de definir o estado
        if (Array.isArray(contactsData)) {
          setContacts(contactsData)
        } else {
          setError('Failed to fetch contacts: Data format is incorrect.')
        }
      } catch (error) {
        // setError('Failed to fetch contacts: ' + error.message)
        setError('Failed to fetch contacts: ')
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Contacts List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {contacts.map(contact => (
          <li key={contact.id} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-2xl font-semibold mb-2">{contact.name}</h2>
            <p className="text-gray-700">{contact.email}</p>
            <p className="text-gray-700">{contact.phone}</p>
            <p className="text-gray-700">{contact.address}</p>
            <p className="text-gray-700">{contact.title}</p>
            <p className="text-gray-700">{contact.status}</p>
            {contact.photoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={contact.photoUrl}
                alt={contact.name}
                className="mt-4 rounded-full w-10 h-10"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Contacts
