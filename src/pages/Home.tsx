import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { MainLayout } from '../components/layouts'

export default function Dashboard() {
    const navigate = useNavigate()

    // Função para navegar para o conteúdo do módulo
    const handleModuleClick = (moduleId: number) => {
        if (moduleId === 1) {
            // Apenas o primeiro módulo (Modelo de Negócio) está conectado
            navigate('/content/modelo-de-negocio')
        }
        // Outros módulos ainda não implementados
    }

    // Configuração do Embla Carousel para Módulos
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: true
    })
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    // Configuração do Embla Carousel para Novidades
    const [emblaRefNews, emblaApiNews] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: true
    })
    const [canScrollPrevNews, setCanScrollPrevNews] = useState(false)
    const [canScrollNextNews, setCanScrollNextNews] = useState(false)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
    const scrollPrevNews = useCallback(() => emblaApiNews && emblaApiNews.scrollPrev(), [emblaApiNews])
    const scrollNextNews = useCallback(() => emblaApiNews && emblaApiNews.scrollNext(), [emblaApiNews])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    const onSelectNews = useCallback(() => {
        if (!emblaApiNews) return
        setCanScrollPrevNews(emblaApiNews.canScrollPrev())
        setCanScrollNextNews(emblaApiNews.canScrollNext())
    }, [emblaApiNews])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    useEffect(() => {
        if (!emblaApiNews) return
        onSelectNews()
        emblaApiNews.on('select', onSelectNews)
        emblaApiNews.on('reInit', onSelectNews)
    }, [emblaApiNews, onSelectNews])

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

    // Novidades - conteúdos diversos do mundo dos negócios
    const newsItems = [
        {
            id: 1,
            title: "MINDSET EMPRESARIAL",
            subtitle: "mentalidade vencedora",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
            readTime: "5 min",
            date: "2 dias atrás",
            isNew: true
        },
        {
            id: 2,
            title: "NETWORKING ESTRATÉGICO",
            subtitle: "conexões que transformam",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2000&auto=format&fit=crop",
            readTime: "6 min",
            date: "4 dias atrás"
        },
        {
            id: 3,
            title: "GESTÃO DO TEMPO",
            subtitle: "produtividade máxima",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2000&auto=format&fit=crop",
            readTime: "7 min",
            date: "1 semana atrás"
        },
        {
            id: 4,
            title: "VENDAS CONSULTIVAS",
            subtitle: "feche mais negócios",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop",
            readTime: "8 min",
            date: "1 semana atrás"
        },
        {
            id: 5,
            title: "INOVAÇÃO DISRUPTIVA",
            subtitle: "quebre paradigmas",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop",
            readTime: "9 min",
            date: "2 semanas atrás"
        },
        {
            id: 6,
            title: "COMUNICAÇÃO ASSERTIVA",
            subtitle: "influence e convença",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
            readTime: "5 min",
            date: "2 semanas atrás"
        },
        {
            id: 7,
            title: "ANÁLISE DE DADOS",
            subtitle: "decisões inteligentes",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
            readTime: "9 min",
            date: "2 semanas atrás"
        },
        {
            id: 8,
            title: "CULTURA ORGANIZACIONAL",
            subtitle: "engaje sua equipe",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
            readTime: "7 min",
            date: "3 semanas atrás"
        },
        {
            id: 9,
            title: "NEGOCIAÇÃO AVANÇADA",
            subtitle: "sempre saia ganhando",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
            readTime: "6 min",
            date: "3 semanas atrás"
        },
        {
            id: 10,
            title: "TRANSFORMAÇÃO DIGITAL",
            subtitle: "modernize seu negócio",
            image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2000&auto=format&fit=crop",
            readTime: "10 min",
            date: "1 mês atrás"
        }
    ]

    // Configuração dos carroussels para as três seções de conteúdo
    const [emblaRefGestao, emblaApiGestao] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: true
    })
    const [canScrollPrevGestao, setCanScrollPrevGestao] = useState(false)
    const [canScrollNextGestao, setCanScrollNextGestao] = useState(false)

    const [emblaRefFinancas, emblaApiFinancas] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: true
    })
    const [canScrollPrevFinancas, setCanScrollPrevFinancas] = useState(false)
    const [canScrollNextFinancas, setCanScrollNextFinancas] = useState(false)

    const [emblaRefMarketing, emblaApiMarketing] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: true
    })
    const [canScrollPrevMarketing, setCanScrollPrevMarketing] = useState(false)
    const [canScrollNextMarketing, setCanScrollNextMarketing] = useState(false)

    const scrollPrevGestao = useCallback(() => emblaApiGestao && emblaApiGestao.scrollPrev(), [emblaApiGestao])
    const scrollNextGestao = useCallback(() => emblaApiGestao && emblaApiGestao.scrollNext(), [emblaApiGestao])
    const scrollPrevFinancas = useCallback(() => emblaApiFinancas && emblaApiFinancas.scrollPrev(), [emblaApiFinancas])
    const scrollNextFinancas = useCallback(() => emblaApiFinancas && emblaApiFinancas.scrollNext(), [emblaApiFinancas])
    const scrollPrevMarketing = useCallback(() => emblaApiMarketing && emblaApiMarketing.scrollPrev(), [emblaApiMarketing])
    const scrollNextMarketing = useCallback(() => emblaApiMarketing && emblaApiMarketing.scrollNext(), [emblaApiMarketing])

    const onSelectGestao = useCallback(() => {
        if (!emblaApiGestao) return
        setCanScrollPrevGestao(emblaApiGestao.canScrollPrev())
        setCanScrollNextGestao(emblaApiGestao.canScrollNext())
    }, [emblaApiGestao])

    const onSelectFinancas = useCallback(() => {
        if (!emblaApiFinancas) return
        setCanScrollPrevFinancas(emblaApiFinancas.canScrollPrev())
        setCanScrollNextFinancas(emblaApiFinancas.canScrollNext())
    }, [emblaApiFinancas])

    const onSelectMarketing = useCallback(() => {
        if (!emblaApiMarketing) return
        setCanScrollPrevMarketing(emblaApiMarketing.canScrollPrev())
        setCanScrollNextMarketing(emblaApiMarketing.canScrollNext())
    }, [emblaApiMarketing])

    useEffect(() => {
        if (!emblaApiGestao) return
        onSelectGestao()
        emblaApiGestao.on('select', onSelectGestao)
        emblaApiGestao.on('reInit', onSelectGestao)
    }, [emblaApiGestao, onSelectGestao])

    useEffect(() => {
        if (!emblaApiFinancas) return
        onSelectFinancas()
        emblaApiFinancas.on('select', onSelectFinancas)
        emblaApiFinancas.on('reInit', onSelectFinancas)
    }, [emblaApiFinancas, onSelectFinancas])

    useEffect(() => {
        if (!emblaApiMarketing) return
        onSelectMarketing()
        emblaApiMarketing.on('select', onSelectMarketing)
        emblaApiMarketing.on('reInit', onSelectMarketing)
    }, [emblaApiMarketing, onSelectMarketing])

    // Gestão & Liderança
    const gestaoItems = [
        {
            id: 1,
            title: "LIDERANÇA SITUACIONAL",
            subtitle: "adapte seu estilo ao contexto",
            image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2000&auto=format&fit=crop",
            isNew: true
        },
        {
            id: 2,
            title: "GESTÃO DE EQUIPES",
            subtitle: "forme times de alta performance",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "DELEGAÇÃO EFICAZ",
            subtitle: "multiplique seus resultados",
            image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "FEEDBACK CONSTRUTIVO",
            subtitle: "desenvolva pessoas com maestria",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "RESOLUÇÃO DE CONFLITOS",
            subtitle: "transforme tensão em crescimento",
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2000&auto=format&fit=crop"
        }
    ]

    // Finanças Empresariais
    const financasItems = [
        {
            id: 1,
            title: "FLUXO DE CAIXA",
            subtitle: "controle total das suas finanças",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop",
            isNew: true
        },
        {
            id: 2,
            title: "ANÁLISE DE CUSTOS",
            subtitle: "otimize sua margem de lucro",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
            isNew: true
        },
        {
            id: 3,
            title: "INVESTIMENTOS ESTRATÉGICOS",
            subtitle: "faça seu dinheiro trabalhar",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "PRECIFICAÇÃO INTELIGENTE",
            subtitle: "maximize sua rentabilidade",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "GESTÃO DE RISCOS",
            subtitle: "proteja seu patrimônio",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop"
        }
    ]

    // Marketing e Estratégia Comercial
    const marketingItems = [
        {
            id: 1,
            title: "POSICIONAMENTO DE MARCA",
            subtitle: "destaque-se da concorrência",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "MARKETING DIGITAL",
            subtitle: "conquiste clientes online",
            image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "FUNIL DE VENDAS",
            subtitle: "automatize sua conversão",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "RELACIONAMENTO COM CLIENTE",
            subtitle: "fidelize e retenha mais",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "ANÁLISE DE MERCADO",
            subtitle: "identifique oportunidades",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop"
        }
    ]

    return (
        <MainLayout>
            {/* Main Content - Hero deve começar do topo absoluto */}
            <main className="flex-1 -mt-20">
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
                    <div className="relative pt-24 pb-20 md:pt-32 md:pb-32 min-h-[70vh] flex items-center">
                        <div className="container mx-auto px-4">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
                                    Academia de Negócios
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
                                    Desenvolva um negócio com propósito, estratégia e resultados
                                </p>
                                <button className="btn btn-primary btn-lg transform hover:scale-[1.02] transition-all">
                                    Comece Agora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 -mt-16 z-10">
                    {/* Modules Section */}
                    <section>
                        <div className="mb-4 relative">
                            <h2 className="text-2xl font-bold text-white mb-2 font-serif">Método Bravo de Negócios</h2>
                            <p className="text-gray-400">Domine qualquer negócio com maestria e gere os melhores resultados</p>
                        </div>

                        {/* Carrossel com Embla - botões fora do overflow */}
                        <div className="relative select-none">
                            {/* Setas de navegação posicionadas fora do overflow */}
                            {canScrollPrev && (
                                <button
                                    onClick={scrollPrev}
                                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {canScrollNext && (
                                <button
                                    onClick={scrollNext}
                                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {/* Container Embla com overflow controlado */}
                            <div className="overflow-hidden py-6 px-3 select-none" ref={emblaRef}>
                                <div className="flex gap-4">
                                    {modules.map((module) => (
                                        <div
                                            key={module.id}
                                            className="flex-[0_0_auto] 
                                                           w-[calc(40%-9.6px)]
                                                           md:w-[calc(22.22%-12.8px)]
                                                           lg:w-[calc(18.18%-12.8px)]
                                                           select-none"
                                            onClick={() => handleModuleClick(module.id)}
                                        >
                                            {/* Container principal com brilho de fundo */}
                                            <div className="relative aspect-[10/16]">
                                                {/* Card principal */}
                                                <div className="content-cover">
                                                    <img
                                                        src={module.image}
                                                        alt={module.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Overlay preto sutil para melhor contraste */}
                                                    <div className="absolute inset-0 bg-black/20" />

                                                    {/* Gradiente adicional na parte inferior para contraste do texto - finalizando em preto */}
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

                                                    {/* Ícone de cadeado para módulos bloqueados (exceto o primeiro) */}
                                                    {module.id !== 1 && (
                                                        <div className="absolute top-3 right-3 bg-gray-600 rounded-full p-2">
                                                            <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}

                                                    <div className="absolute inset-0 px-6 pt-6 pb-8 flex flex-col justify-end">
                                                        <div>
                                                            <h3 className="text-white font-bold text-base lg:text-xl mb-1">
                                                                {module.title}
                                                            </h3>
                                                            <p className="text-[#bd1616] text-sm font-medium">
                                                                MÓDULO {module.id}
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

                    {/* Gestão & Liderança Section */}
                    <section className="mt-16">
                        <div className="mb-4 relative">
                            <h2 className="text-2xl font-bold text-white mb-2 font-serif">Gestão & Liderança</h2>
                            <p className="text-gray-400">Desenvolva sua capacidade de liderar pessoas e processos</p>
                        </div>

                        {/* Carrossel com Embla - Gestão */}
                        <div className="relative select-none">
                            {/* Setas de navegação */}
                            {canScrollPrevGestao && (
                                <button
                                    onClick={scrollPrevGestao}
                                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {canScrollNextGestao && (
                                <button
                                    onClick={scrollNextGestao}
                                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {/* Container Embla com overflow controlado */}
                            <div className="overflow-hidden py-6 px-3 select-none" ref={emblaRefGestao}>
                                <div className="flex gap-4">
                                    {gestaoItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex-[0_0_auto] 
                                                           w-[calc(40%-9.6px)]
                                                           md:w-[calc(22.22%-12.8px)]
                                                           lg:w-[calc(18.18%-12.8px)]
                                                           select-none"
                                        >
                                            {/* Container principal com brilho de fundo */}
                                            <div className="relative aspect-[10/16]">
                                                {/* Card principal */}
                                                <div className="content-cover">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Overlay preto sutil */}
                                                    <div className="absolute inset-0 bg-black/20" />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

                                                    {/* Badge Novo */}
                                                    {item.isNew && (
                                                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                                                            Novo
                                                        </div>
                                                    )}

                                                    <div className="absolute inset-0 px-6 pt-6 pb-8 flex flex-col justify-end">
                                                        <div>
                                                            <h3 className="text-white font-bold text-base lg:text-xl mb-1">
                                                                {item.title}
                                                            </h3>
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

                    {/* Finanças Empresariais Section */}
                    <section className="mt-16">
                        <div className="mb-4 relative">
                            <h2 className="text-2xl font-bold text-white mb-2 font-serif">Finanças Empresariais</h2>
                            <p className="text-gray-400">Controle e maximize a rentabilidade do seu negócio</p>
                        </div>

                        {/* Carrossel com Embla - Finanças */}
                        <div className="relative select-none">
                            {/* Setas de navegação */}
                            {canScrollPrevFinancas && (
                                <button
                                    onClick={scrollPrevFinancas}
                                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {canScrollNextFinancas && (
                                <button
                                    onClick={scrollNextFinancas}
                                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {/* Container Embla com overflow controlado */}
                            <div className="overflow-hidden py-6 px-3 select-none" ref={emblaRefFinancas}>
                                <div className="flex gap-4">
                                    {financasItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex-[0_0_auto] 
                                                           w-[calc(40%-9.6px)]
                                                           md:w-[calc(22.22%-12.8px)]
                                                           lg:w-[calc(18.18%-12.8px)]
                                                           select-none"
                                        >
                                            {/* Container principal com brilho de fundo */}
                                            <div className="relative aspect-[10/16]">
                                                {/* Card principal */}
                                                <div className="content-cover">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Overlay preto sutil */}
                                                    <div className="absolute inset-0 bg-black/20" />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

                                                    {/* Badge Novo */}
                                                    {item.isNew && (
                                                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                                                            Novo
                                                        </div>
                                                    )}

                                                    <div className="absolute inset-0 px-6 pt-6 pb-8 flex flex-col justify-end">
                                                        <div>
                                                            <h3 className="text-white font-bold text-base lg:text-xl mb-1">
                                                                {item.title}
                                                            </h3>
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

                    {/* Marketing e Estratégia Comercial Section */}
                    <section className="mt-16">
                        <div className="mb-4 relative">
                            <h2 className="text-2xl font-bold text-white mb-2 font-serif">Marketing e Estratégia Comercial</h2>
                            <p className="text-gray-400">Atraia, converta e fideliza clientes com estratégias eficazes</p>
                        </div>

                        {/* Carrossel com Embla - Marketing */}
                        <div className="relative select-none">
                            {/* Setas de navegação */}
                            {canScrollPrevMarketing && (
                                <button
                                    onClick={scrollPrevMarketing}
                                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {canScrollNextMarketing && (
                                <button
                                    onClick={scrollNextMarketing}
                                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {/* Container Embla com overflow controlado */}
                            <div className="overflow-hidden py-6 px-3 select-none" ref={emblaRefMarketing}>
                                <div className="flex gap-4">
                                    {marketingItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex-[0_0_auto] 
                                                           w-[calc(40%-9.6px)]
                                                           md:w-[calc(22.22%-12.8px)]
                                                           lg:w-[calc(18.18%-12.8px)]
                                                           select-none"
                                        >
                                            {/* Container principal com brilho de fundo */}
                                            <div className="relative aspect-[10/16]">
                                                {/* Card principal */}
                                                <div className="content-cover">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Overlay preto sutil */}
                                                    <div className="absolute inset-0 bg-black/20" />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

                                                    <div className="absolute inset-0 px-6 pt-6 pb-8 flex flex-col justify-end">
                                                        <div>
                                                            <h3 className="text-white font-bold text-base lg:text-xl mb-1">
                                                                {item.title}
                                                            </h3>
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

                    {/* Novidades Section */}
                    <section className="mt-16">
                        <div className="mb-8 relative z-10">
                            <h2 className="text-2xl font-bold text-white mb-2 font-serif">Novidades</h2>
                            <p className="text-gray-400">Insights e tendências do mundo dos negócios</p>
                        </div>

                        {/* Carrossel de Novidades */}
                        <div className="relative select-none">
                            {/* Setas de navegação para novidades */}
                            {canScrollPrevNews && (
                                <button
                                    onClick={scrollPrevNews}
                                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {canScrollNextNews && (
                                <button
                                    onClick={scrollNextNews}
                                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/90 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                                >
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {/* Container do Embla Carousel para Novidades */}
                            <div className="overflow-hidden py-6 px-3 select-none" ref={emblaRefNews}>
                                <div className="flex gap-4">
                                    {newsItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex-[0_0_auto] 
                                                           w-[calc(60%-9.6px)]
                                                           md:w-[calc(33.33%-12.8px)]
                                                           lg:w-[calc(27.27%-12.8px)]
                                                           select-none"
                                        >
                                            {/* Container principal com brilho de fundo */}
                                            <div className="relative aspect-[4/3.5]">
                                                {/* Card principal */}
                                                <div className="content-cover">

                                                    {/* Imagem */}
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-[70%] object-cover"
                                                    />

                                                    {/* Overlay preto sutil apenas na imagem */}
                                                    <div className="absolute top-0 left-0 right-0 h-[70%] bg-gradient-to-b from-black/10 via-transparent to-black/60" />

                                                    {/* Badge Novo */}
                                                    {item.isNew && (
                                                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                                                            Novo
                                                        </div>
                                                    )}

                                                    {/* Conteúdo do card - 30% da altura */}
                                                    <div className="absolute bottom-0 left-0 right-0 h-[30%] p-3 bg-gray-800 flex flex-col justify-center">
                                                        <h3 className="text-white font-semibold text-base lg:text-sm mb-1 line-clamp-1">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-gray-300 text-sm mb-2 line-clamp-1">
                                                            {item.subtitle}
                                                        </p>
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-gray-400">{item.readTime}</span>
                                                            <span className="text-gray-500">{item.date}</span>
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
                </div>
            </main>
        </MainLayout>
    )
}
