
import React from 'react'
export const revalidate = 60
export const generateStaticParams = () => {
  const userId = ['567', '123', '98']
  return userId.map((user) => (
    user
  ))
}


const page = ({ params }: any) => {



  return (
    <div>{params.id}</div>
  )
}

export default page;