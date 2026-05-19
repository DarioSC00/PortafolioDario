import modal from 'tailwindcss-modal'
import { useEffect } from 'react'

const VerDetalles = ({ project, onClose }) => {
  useEffect(() => {
    const modalInstance = new modal(document.getElementById('projectModal'))
    modalInstance.show()
    return () => {
      modalInstance.hide()
    }
    }, [])}
