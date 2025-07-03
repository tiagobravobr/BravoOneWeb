import { useState, useEffect, useRef } from 'react'
import Modal from './Modal'

interface ConfirmDeleteModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  loading?: boolean
}

export default function ConfirmDeleteModal({ open, onClose, onConfirm, title, loading }: ConfirmDeleteModalProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const isMatch = input === title
  
  // Limpar input quando modal abre/fecha e focar no campo
  useEffect(() => {
    if (open) {
      setInput('')
      // Focar no input com um pequeno delay para garantir que o modal renderizou
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold text-white mb-4 text-center">Excluir Academia</h2>
      <p className="text-gray-300 text-center mb-2">
        Para excluir, digite o nome da academia abaixo:<br />
        <span className="font-semibold text-primary-400">{title}</span>
      </p>
      <input
        ref={inputRef}
        name="deleteConfirmation"
        type="text"
        autoComplete="off"
        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 mb-4 text-center"
        placeholder="Digite o nome exato para confirmar"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isMatch && !loading) {
            onConfirm()
          }
        }}
        disabled={loading}
      />
      <div className="text-yellow-400 text-xs text-center mb-4">⚠️ Esta ação é irreversível e apagará todos os conteúdos internos.</div>
      <div className="flex justify-end gap-2">
        <button
          className="btn btn-secondary"
          onClick={onClose}
          disabled={loading}
        >Cancelar</button>
        <button
          className="btn btn-danger"
          onClick={onConfirm}
          disabled={!isMatch || loading}
        >{loading ? 'Excluindo...' : 'Excluir'}</button>
      </div>
    </Modal>
  )
}
