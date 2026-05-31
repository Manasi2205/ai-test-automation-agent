import WorkspaceHeader from '@/components/Custom/WorkspaceHeader';
import React from 'react'


function WorkspaceLayout({children}:{
    children: React.ReactNode;
}) {
  return (

    <div>
      <WorkspaceHeader />
      {children}
    </div>
  )
}

export default WorkspaceLayout