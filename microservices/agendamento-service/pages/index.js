import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function AgendamentoHome() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página principal de agendamento
    router.push('/scheduling')
  }, [router])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>🏥 Sistema de Agendamento Veracare</h1>
        <p>Redirecionando para o sistema...</p>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 2s linear infinite',
          margin: '20px auto'
        }}></div>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AgendamentoHome
