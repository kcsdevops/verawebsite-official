'use client'

import { useState, useEffect } from 'react'
import { CancellationService, ConsultaCancelamento } from '../../utils/cancellationService'
import Link from 'next/link'

export default function MeusAgendamentos() {
  const [consultas, setConsultas] = useState<ConsultaCancelamento[]>([])
  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState<any>(null)

  useEffect(() => {
    // Verificar se usuário está logado
    const usuarioLogado = localStorage.getItem('veracare_usuario_logado')
    if (!usuarioLogado) {
      window.location.href = '/login'
      return
    }

    setUsuario(JSON.parse(usuarioLogado))
    carregarConsultas()
  }, [])

  const carregarConsultas = () => {
    setLoading(true)
    const minhasConsultas = CancellationService.getUserAppointments()
    // Ordenar por data (mais recente primeiro)
    const consultasOrdenadas = minhasConsultas.sort((a, b) => {
      const dateA = new Date(a.data.split('/').reverse().join('-'))
      const dateB = new Date(b.data.split('/').reverse().join('-'))
      return dateB.getTime() - dateA.getTime()
    })
    setConsultas(consultasOrdenadas)
    setLoading(false)
  }

  const handleCancelar = (consulta: ConsultaCancelamento) => {
    CancellationService.showCancellationModal(
      consulta.id,
      consulta.data,
      consulta.hora,
      consulta.tipo,
      () => {
        // Recarregar consultas após cancelamento
        carregarConsultas()
      }
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada':
        return 'text-blue-600 bg-blue-50'
      case 'cancelada':
        return 'text-red-600 bg-red-50'
      case 'realizada':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendada':
        return '📅'
      case 'cancelada':
        return '🚫'
      case 'realizada':
        return '✅'
      default:
        return '❓'
    }
  }

  const formatarData = (data: string) => {
    try {
      const [dia, mes, ano] = data.split('/')
      const dataObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia))
      return dataObj.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return data
    }
  }

  const verificarPodeCancelar = (consulta: ConsultaCancelamento) => {
    if (consulta.status !== 'agendada') return false
    return CancellationService.canCancel(consulta.data, consulta.hora).canCancel
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando seus agendamentos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meus Agendamentos</h1>
              <p className="text-gray-600">Gerencie suas consultas e agendamentos</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/agendamento"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                📅 Novo Agendamento
              </Link>
              <Link
                href="/dashboard"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                🏠 Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Informações do usuário */}
        {usuario && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">👤 Informações da Conta</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Nome:</span> {usuario.nome}
              </div>
              <div>
                <span className="font-medium">Email:</span> {usuario.email}
              </div>
              <div>
                <span className="font-medium">Telefone:</span> {usuario.telefone}
              </div>
            </div>
          </div>
        )}

        {/* Lista de consultas */}
        {consultas.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-4 text-6xl">📅</div>
            <h2 className="text-xl font-semibold mb-2">Nenhum agendamento encontrado</h2>
            <p className="text-gray-600 mb-6">
              Você ainda não possui consultas agendadas. Que tal agendar sua primeira consulta?
            </p>
            <Link
              href="/agendamento"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-block"
            >
              📅 Agendar Primeira Consulta
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">
                📋 Suas Consultas ({consultas.length})
              </h2>
              
              {/* Legendas de status */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Agendada
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Cancelada
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Realizada
                </div>
              </div>

              <div className="space-y-4">
                {consultas.map((consulta, index) => {
                  const podeCancelar = verificarPodeCancelar(consulta)
                  const cancelInfo = CancellationService.canCancel(consulta.data, consulta.hora)
                  
                  return (
                    <div
                      key={consulta.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-3">{getStatusIcon(consulta.status)}</span>
                            <div>
                              <h3 className="font-semibold text-lg">{consulta.tipo}</h3>
                              <p className="text-gray-600">#{consulta.id}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">📅 Data:</span>
                              <br />
                              {formatarData(consulta.data)}
                            </div>
                            <div>
                              <span className="font-medium">🕒 Horário:</span>
                              <br />
                              {consulta.hora}
                            </div>
                            <div>
                              <span className="font-medium">📋 Status:</span>
                              <br />
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consulta.status)}`}>
                                {consulta.status.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {consulta.observacoes && (
                            <div className="mt-3 text-sm">
                              <span className="font-medium">📝 Observações:</span>
                              <p className="text-gray-600 mt-1">{consulta.observacoes}</p>
                            </div>
                          )}

                          {consulta.dataCancelamento && (
                            <div className="mt-3 text-sm text-red-600">
                              <span className="font-medium">🚫 Cancelada em:</span>
                              <br />
                              {new Date(consulta.dataCancelamento).toLocaleString('pt-BR')}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                          {consulta.status === 'agendada' && (
                            <>
                              {podeCancelar ? (
                                <button
                                  onClick={() => handleCancelar(consulta)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                  🚫 Cancelar
                                </button>
                              ) : (
                                <div className="text-xs text-gray-500 text-center p-2 bg-gray-50 rounded-lg">
                                  ⚠️ Cancelamento não disponível
                                  <br />
                                  <span className="text-red-600">{cancelInfo.reason}</span>
                                </div>
                              )}
                              
                              {cancelInfo.canCancel && cancelInfo.timeRemaining && (
                                <div className="text-xs text-green-600 text-center p-2 bg-green-50 rounded-lg">
                                  ✅ Pode cancelar até:
                                  <br />
                                  <strong>{cancelInfo.timeRemaining} restantes</strong>
                                </div>
                              )}
                            </>
                          )}

                          {consulta.status === 'cancelada' && (
                            <Link
                              href="/agendamento"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium text-center"
                            >
                              📅 Reagendar
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Política de cancelamento */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Política de Cancelamento</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Cancelamentos devem ser feitos com pelo menos 24 horas de antecedência</li>
                <li>• Após esse prazo, o cancelamento não será possível pelo sistema</li>
                <li>• Em caso de emergência, entre em contato pelo telefone (11) 96738-1029</li>
                <li>• Consultas canceladas não geram cobrança</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}