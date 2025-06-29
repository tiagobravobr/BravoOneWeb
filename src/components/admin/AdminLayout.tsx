import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const AdminLayout = () => {
  return (
    <div className="page-layout bg-gray-950">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20 pb-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default AdminLayout
