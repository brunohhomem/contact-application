import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getContact } from '../api/ContactService'

const ContactDetail = ({ updateContact, updateImage }) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
    photoUrl: ''
  })

  const { id } = useParams()

  const fetchContact = async id => {
    try {
      const { data } = await getContact(id)
      setContact(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchContact(id)
  }, [])

  return (
    <>
      <Link to={'/'} className="link">
        <i className="bi bi-arrow-left"></i> Back to list
      </Link>

      <div className="profile">
        <div className="profile__details">
          <img
            src={contact.photoUrl}
            alt={`Profile photo of ${contact.name}`}
          />
          <div className="profile_metadata">
            <p className="profile__name">{contact.name}</p>
            <p className="profile__muted">JPG, GIF or PNG. Max size of 10MB.</p>
            <button className="btn">
              <i className="bi bi-cloud-upload"></i> Change photo
            </button>
          </div>
        </div>
        <div className="profile__settings">Settings</div>
      </div>
    </>
  )
}

export default ContactDetail
