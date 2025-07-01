export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-950">
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                <div className="flex justify-center items-center">
                    {/* Logo */}
                    <img
                        src="/bravo-logo-dark.svg"
                        alt="Bravo One"
                        className="h-4 w-auto"
                        style={{ filter: 'grayscale(1) brightness(0) invert(0.6)' }}
                    />
                    
                    {/* Separador */}
                    <span className="text-gray-400 mx-3">|</span>
                    
                    {/* Copyright */}
                    <div className="text-gray-400 text-sm">
                        © {currentYear} Bravo Líderes. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </footer>
    )
}
