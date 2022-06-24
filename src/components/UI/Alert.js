import { Alert } from '@mui/material'
import React, { useEffect } from 'react'

const BasicAlert = ({ alert }) => {
  if (!alert.show) return null
  return (
    <div
      style={{
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 10,
      }}>
      <Alert severity={alert.type}>{alert.message}</Alert>
    </div>
  )
}

export default BasicAlert
