export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-950">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src="/bravo-logo-dark.svg"
                            alt="Bravo One"
                            className="h-4 w-auto"
                        />
                    </div>

                    {/* Copyright */}
                    <div className="text-gray-400 text-sm">
                        © {currentYear} Bravo Líderes. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </footer>
    )
}
