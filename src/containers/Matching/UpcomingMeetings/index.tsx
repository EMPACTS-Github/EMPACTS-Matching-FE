import React from 'react'
import Header from './Header'
import Content from './Content'

const UpcomingMeetings = () => {
  return (
    <div className='p-6 flex flex-col gap-8 bg-neutral-20 shadow-[0px_0px_8px_0px_rgba(10, 20, 57, 0.07)] max-h-[576px] rounded-xl'>
      <Header />
      <Content />
    </div>
  )
}

export default UpcomingMeetings