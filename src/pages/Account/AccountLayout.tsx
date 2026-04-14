import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import AccountSidebar from '@/components/shared/AccountSidebar'
const AccountLayout = () => {
  return (
    <>
      <Layout>
        <div className='flex flex-col md:flex-row'>
          <AccountSidebar />
          <Outlet />
        </div>
      </Layout>
    </>
  )
}

export default AccountLayout