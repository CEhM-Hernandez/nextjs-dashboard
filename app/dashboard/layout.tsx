import SideNav from '@/app/ui/components/dashboard/sidenav'

export default function DashboardLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className='flex min-h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <SideNav />
      </div>
      <div className='flex-group p-6 md:overflow-y-auto md:p-12 w-full'>
        {children}
      </div>
    </div>
  )
}
