import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Header from '../components/Header'

export default function Dashboard() {
    // Configuração do Embla Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: true
    })
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])
    
    const modules = [
        {
            id: 1,
            title: "MODELO DE NEGÓCIO",
            subtitle: "estrutura para o sucesso",
            image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=2000&auto=format&fit=crop",
            gradient: "from-indigo-500/20 to-indigo-900/40"
        },
        {
            id: 2,
            title: "FUNDAMENTAÇÃO",
            subtitle: "base sólida para crescer",
            image: "https://images.unsplash.com/photo-1534180079718-c54f5e889c4f?q=80&w=2000&auto=format&fit=crop",
            gradient: "from-red-500/20 to-red-900/40"
        },
        {
            id: 3,
            title: "VISÃO & PLANEJAMENTO",
            subtitle: "estratégia empresarial",
            image: "https://images.unsplash.com/photo-1717493222260-10abfbde479c?q=80&w=2000&auto=format&fit=crop",
            gradient: "from-orange-500/20 to-orange-900/40"
        },
        {
            id: 4,
            title: "LIDERANÇA EMPRESARIAL",
            subtitle: "gestão de alta performance",
            image: "https://images.unsplash.com/photo-1523504706857-0b1cc4956993?q=80&w=2000&auto=format&fit=crop",
            gradient: "from-purple-500/20 to-purple-900/40"
        },
        {
            id: 5,
            title: "MÁQUINA DE VALOR",
            subtitle: "sistemas que geram riqueza",
            image: "https://images.unsplash.com/photo-1642240251149-bcccea43798d?q=80&w=2000&auto=format&fit=crop",
            gradient: "from-blue-500/20 to-blue-900/40"
        },
        {
            id: 6,
            title: "PERFORMANCE",
            subtitle: "otimização e resultados",
            image: "https://images.unsplash.com/photo-1730382624761-af8112d26209?q=80&w=2000&auto=format&fit=crop",
            gradient: "from-green-500/20 to-green-900/40"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header Sticky com Glassmorphism */}
            <Header />

            {/* Main Content - sem padding-top para hero começar do topo */}
            <main>
                {/* Hero Section - com transição suave para o fundo */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1492366254240-43affaefc3e3?q=80&w=2000&auto=format&fit=crop"
                            alt="Leadership"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradiente horizontal para escurecer a imagem */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-gray-950/40" />
                        {/* Gradiente vertical na parte inferior para transição suave */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950" />
                    </div>

                    {/* Conteúdo do hero alinhado com o cabeçalho */}
                    <div className="relative py-20 md:py-32 min-h-[70vh] flex items-center">
                        <div className="container mx-auto px-4">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
                                    Academia de Negócios
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
                                    Desenvolva um negócio com propósito, estratégia e resultados
                                </p>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                    Começar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Modules Section */}
                    <section>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2 font-serif">Método Bravo de Negócios</h2>
                            <p className="text-gray-400">Domine qualquer negócio com maestria e gere os melhores resultados</p>
                        </div>

                        {/* Carrossel com Embla - Drag, responsivo e sem seleção de texto */}
                        <div className="relative select-none">
                            {/* Setas de navegação */}
                            {canScrollPrev && (
                                <button
                                    onClick={scrollPrev}
                                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/90 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}
                            
                            {canScrollNext && (
                                <button
                                    onClick={scrollNext}
                                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/90 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {/* Container Embla com tamanhos responsivos e sem seleção de texto */}
                            <div className="overflow-hidden py-6 select-none" ref={emblaRef}>
                                <div className="flex gap-4">
                                    {modules.map((module) => (
                                        <div 
                                            key={module.id} 
                                            className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 flex-[0_0_auto] 
                                                       w-[calc(40%-9.6px)]
                                                       md:w-[calc(22.22%-12.8px)]
                                                       lg:w-[calc(18.18%-12.8px)]
                                                       select-none"
                                        >
                                            {/* Container principal com brilho de fundo */}
                                            <div className="relative aspect-[9/16]">
                                                {/* Brilho difuso - estado normal mais espalhado, hover mais centralizado */}
                                                <div className="absolute -inset-3 bg-gradient-radial from-white/12 via-white/6 to-white/2 group-hover:from-white/18 group-hover:via-white/4 group-hover:to-transparent group-hover:inset-1 transition-all duration-300 rounded-lg blur-lg -z-10"></div>
                                                
                                                {/* Card principal */}
                                                <div className="relative w-full h-full rounded overflow-hidden bg-gray-800 shadow-lg shadow-white/10 group-hover:shadow-xl group-hover:shadow-white/20 transition-all duration-300">
                                                    <img
                                                        src={module.image}
                                                        alt={module.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Overlay preto sutil para melhor contraste */}
                                                    <div className="absolute inset-0 bg-black/20" />
                                                    
                                                    {/* Gradiente adicional na parte inferior para contraste do texto - finalizando em preto */}
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

                                                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                                                        <div className="text-right">
                                                            <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                                MÓDULO {module.id}
                                                            </span>
                                                        </div>

                                                        <div>
                                                            <h3 className="text-white font-bold text-xl mb-1 font-serif">
                                                                {module.title}
                                                            </h3>
                                                            <p className="text-gray-200 text-base font-light">
                                                                {module.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Additional Content Section */}
                    <section className="mt-16">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2 font-serif">/recursos</h2>
                            <p className="text-gray-400">Ferramentas para acelerar seu desenvolvimento</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-white font-bold">📊</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2">Assessment</h3>
                                <p className="text-gray-400 text-sm">Avalie seu perfil de liderança atual</p>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-white font-bold">🎯</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2">Metas</h3>
                                <p className="text-gray-400 text-sm">Defina e acompanhe seus objetivos</p>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-white font-bold">📚</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2">Biblioteca</h3>
                                <p className="text-gray-400 text-sm">Acesse conteúdos exclusivos</p>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-orange-500 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-white font-bold">👥</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2">Comunidade</h3>
                                <p className="text-gray-400 text-sm">Conecte-se com outros líderes</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
