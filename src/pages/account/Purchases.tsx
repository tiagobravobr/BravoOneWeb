import { ShoppingBag, Download, Star, Calendar, FileText } from 'lucide-react'

const Purchases = () => {
  const purchases = [
    {
      id: 1,
      type: 'course',
      title: 'Empreendedorismo Digital Avançado',
      instructor: 'Tiago Bravo',
      price: 'R$ 297,00',
      purchaseDate: '2024-12-01',
      status: 'Concluído',
      progress: 100,
      rating: 5,
      certificateAvailable: true
    },
    {
      id: 2,
      type: 'course',
      title: 'Marketing de Conteúdo para Empreendedores',
      instructor: 'Marina Silva',
      price: 'R$ 197,00',
      purchaseDate: '2024-11-15',
      status: 'Em Progresso',
      progress: 75,
      rating: null,
      certificateAvailable: false
    },
    {
      id: 3,
      type: 'ebook',
      title: 'Guia Completo do LinkedIn para Negócios',
      instructor: 'Carlos Mendes',
      price: 'R$ 47,00',
      purchaseDate: '2024-11-01',
      status: 'Concluído',
      progress: 100,
      rating: 4,
      certificateAvailable: false
    },
    {
      id: 4,
      type: 'mentoring',
      title: 'Mentoria Individual - Estratégia de Negócios',
      instructor: 'Tiago Bravo',
      price: 'R$ 997,00',
      purchaseDate: '2024-10-20',
      status: 'Agendado',
      progress: 0,
      rating: null,
      certificateAvailable: false
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return '🎓'
      case 'ebook': return '📚'
      case 'mentoring': return '🎯'
      default: return '📦'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'text-green-400'
      case 'Em Progresso': return 'text-blue-400'
      case 'Agendado': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-500 text-sm">Não avaliado</span>
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
          />
        ))}
        <span className="text-sm text-gray-400 ml-1">({rating})</span>
      </div>
    )
  }

  return (
    <div>
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total de Compras</p>
              <p className="text-xl font-bold text-white">{purchases.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Certificados</p>
              <p className="text-xl font-bold text-white">
                {purchases.filter(p => p.certificateAvailable).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avaliações</p>
              <p className="text-xl font-bold text-white">
                {purchases.filter(p => p.rating).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Compras */}
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6 transition-all duration-200 hover:bg-gray-900/70">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{getTypeIcon(purchase.type)}</div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{purchase.title}</h3>
                    <p className="text-gray-400 text-sm">Por {purchase.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary-400">{purchase.price}</p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(purchase.purchaseDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4">
                  <span className={`text-sm font-medium ${getStatusColor(purchase.status)}`}>
                    {purchase.status}
                  </span>
                  
                  {purchase.progress > 0 && (
                    <div className="flex items-center gap-2 flex-1 max-w-xs">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-500 transition-all duration-300"
                          style={{ width: `${purchase.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400">{purchase.progress}%</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {renderStars(purchase.rating)}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {purchase.certificateAvailable && (
                      <button className="flex items-center gap-2 px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        Certificado
                      </button>
                    )}
                    
                    <button className="btn btn-primary text-sm">
                      {purchase.status === 'Concluído' ? 'Revisar' : 
                       purchase.status === 'Agendado' ? 'Ver Detalhes' : 'Continuar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nota de Rodapé */}
      <div className="mt-8 p-4 bg-gray-900/30 border border-gray-800 rounded">
        <p className="text-gray-400 text-sm">
          💡 <strong>Dica:</strong> Você tem acesso vitalício a todos os cursos adquiridos. 
          Certificados ficam disponíveis após conclusão de 100% do conteúdo.
        </p>
      </div>
    </div>
  )
}

export default Purchases
