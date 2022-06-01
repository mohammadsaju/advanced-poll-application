import React, { useState } from 'react'
import { usePollContext } from '../StateProvider'
import Modal from '../form/Modal';

const MainContent = () => {
    const {selectedPoll, deletePoll, getOpinion} = usePollContext();
    const [isModal, setIsModal] = useState(false)
    const [name, setName] = useState('')
    const [option, setOption] = useState('')

    const toggleModal = () => {
        setIsModal(!isModal)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getOpinion({
            pollId: selectedPoll.id,
            name: name,
            option: option
        })
        e.target.reset();
        setName('')
    }

    if(Object.keys(selectedPoll).length === 0) {
        return (
            <div className='max-w-2xl md:-mt-44'>
                <h3 className='text-3xl text-slate-600 italic'>Welcome to my application 😎</h3>
                <p className='text-slate-500 font-fira'>
                    You can create as many poll as you want. Click the new
                    button to create a new poll. To check details of a poll
                    please select from the left sidebar.By selectiong a poll
                    you can check it's details, participate and check others
                    opinion about this poll
                </p>
            </div>
        )
    }

  return (
    <div className='ml-20 max-w-xl'>
        <h3>{selectedPoll.title}</h3>
        <p>{selectedPoll.description}</p>
        <div className='flex items-center justify-between'>
            <h5 className='underline'>Options</h5>
            <div>
                <button onClick={toggleModal} className='btn bg-green-200 text-green-600'>Edit</button>
                <button onClick={() => deletePoll(selectedPoll.id)} className='btn bg-red-200 text-red-600 ml-3'>delete</button>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            {
                selectedPoll.options.map(opt => (
                    <div key={opt.id} className='flex items-center justify-between mb-8'>
                        <div className='flex items-center gap-2 text-lg italic'>
                            <input className='appearance-none checked:bg-purple-500' id={opt.id} name='selectedOptions'  type="radio" value={opt.id} onChange={(e) => setOption(e.target.value)} /> {opt.value}
                        </div>
                        <div>
                            <span className='px-6 py-1 bg-orange-100 text-orange-400'>{opt.vote}</span>
                            <span className='px-6 py-1 bg-purple-100 text-purple-400 ml-2'>{selectedPoll.totalVote > 0 ? ((100 * opt.vote) / selectedPoll.totalVote).toFixed(2) : 0}%</span>
                        </div>
                    </div>
                ))
            }
            
            <input className='w-80' type="text" placeholder='My name...' value={name} onChange={(e) => setName(e.target.value)} />
            <button className='btn bg-slate-200 mt-3' type='submit'>Submit</button>
        </form>
        {
            isModal && <Modal poll={selectedPoll} isUpdate={true} toggleModal={toggleModal}/>
        }
    </div>
  )
}

export default MainContent