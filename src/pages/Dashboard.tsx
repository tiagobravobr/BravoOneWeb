import Header from '../components/Header'

export default function Dashboard() {
    const modules = [
        {
            id: 5,
            title: "GESTÃO",
            subtitle: "para novos líderes",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2000&auto=format&fit=crop", // Modern leadership/business
            gradient: "from-blue-500/20 to-blue-900/40"
        },
        {
            id: 4,
            title: "QUEBRANDO",
            subtitle: "barreiras limitantes",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop", // Warrior/strength
            gradient: "from-purple-500/20 to-purple-900/40"
        },
        {
            id: 3,
            title: "COMO INSPIRAR",
            subtitle: "equipes todos os dias",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop", // Space/inspiration
            gradient: "from-orange-500/20 to-orange-900/40"
        },
        {
            id: 2,
            title: "COMUNICAÇÃO",
            subtitle: "ampliando seu impacto",
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop", // Global/world business
            gradient: "from-red-500/20 to-red-900/40"
        },
        {
            id: 1,
            title: "RAIO X",
            subtitle: "da liderança perfeita",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop", // Business leadership
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
                                    /BRAVO<span className="text-primary-500">ONE</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
                                    O método definitivo para se tornar um líder excepcional
                                </p>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                    Continuar jornada
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Modules Section */}
                    <section>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2 font-serif">/módulos</h2>
                            <p className="text-gray-400">Sua jornada de transformação em liderança</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {modules.map((module) => (
                                <div key={module.id} className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
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
                                            <div className={`absolute inset-0 bg-gradient-to-b ${module.gradient} to-gray-950/60`} />
                                            
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
