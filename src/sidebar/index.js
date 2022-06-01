import React, { useState } from 'react'
import Modal from '../form/Modal';
import { usePollContext } from '../StateProvider';

const Sidebar = () => {
    const {allPolls, handleSearch, handleSelect} = usePollContext();
    const [isModal, setIsmodal] = useState(false);
    const toggleModal = () => {
        setIsmodal(!isModal)
    }

  return (
        <>
            <div className='bg-white rounded-xl border shadow-md shadow-slate-200'>
                <div className='flex justify-center mb-16  p-5'>
                    <input onChange={(e) => handleSearch(e.target.value)} className='w-full' type="search" placeholder='Search...' />
                    <button onClick={toggleModal} className='py-2 px-8 ml-4 bg-slate-200 rounded-xl font-medium font-fira'>New</button>
                </div>
                <div className='p-5 bg-zinc-100'>
                    {allPolls.map(poll => (
                    <h6 key={poll.id} onClick={() => handleSelect(poll.id)} className='text-left cursor-pointer text-slate-600 text-lg'>✔{poll.title.length > 30 ? poll.title.substr(0, 30) + '...' : poll.title}</h6>
                    ))}
                </div>
            </div>
            {
                isModal && <Modal toggleModal={toggleModal}/> 
            }
        </>
  )
}

export default Sidebar