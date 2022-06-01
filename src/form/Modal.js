import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { usePollContext } from '../StateProvider';

const defaultOptions = [
    {id: 'kdjfnskhfie', value: '', vote: 0},
    {id: 'fneskdfhfie', value: '', vote: 0}
]

const Modal = ({toggleModal, poll, isUpdate}) => {
    const {createPoll, updatePoll} = usePollContext();
    const [options, setOptions] = useState([...defaultOptions]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    

    useEffect(() => {
        if(poll && Object.keys(poll).length > 0) {
            setTitle(poll.title)
            setDescription(poll.description)
            setOptions(poll.options)
        }
    }, [])

    const handleOptionChange = (event, index) => {
        const allOptions = [...options];
        allOptions[index].value = event.target.value;
        setOptions([...allOptions])
    }

    const createOption = () => {
        const newOption = {
            id: shortid.generate(),
            value: '',
            vote: 0
        }
        if(options.length < 5) {
            setOptions([...options, newOption])
        } 
        else {
            alert('you can not add more than 5 option🤔')
        }
    }

    const deleteOption = (id) => {
        if(options.length > 2) {
            const filterdOptions = options.filter(opt => opt.id !== id);
            setOptions([...filterdOptions])
        }
        else {
            alert('you must have at least two options🤔')
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isUpdate) {
            const data = {
                title,
                description,
                options
            }
            data.id = poll.id
            updatePoll(data);
            alert('poll was updated successfully✔✌')
            toggleModal();
        } 
        else{
            createPoll({title, description, options});
            e.target.reset();
            toggleModal();
        }
    }

  return (
        <div className='w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center bg-slate-100'>
            <form onSubmit={handleSubmit} className='border relative p-10 bg-white'>
                <h3 onClick={toggleModal} className='m-0 absolute top-3 right-5 cursor-pointer text-red-600'>X</h3>
                <h3 className='text-center animate-bounce transition italic'>Add Poll😎</h3>
                <label>title</label>
                <input className='w-full mb-4' type="text" placeholder='title...' value={title} onChange={e => setTitle(e.target.value)} />
                <label>description</label>
                <textarea className='w-full mb-4' rows={3} placeholder='describe about poll...' value={description} onChange={e => setDescription(e.target.value)} ></textarea>
                <h6 className='inline'>Add options</h6>
                <span onClick={createOption} className='bg-purple-300 text-purple-600 font-medium rounded-full px-5 py-1 ml-10 cursor-pointer'>Add option</span>

                {
                    options.map((opt, index) => (
                        <div key={opt.id} className='flex my-5'>
                            <input type="text" value={opt.value} onChange={(e) => handleOptionChange(e, index)} />
                            <span onClick={() => deleteOption(opt.id)} className={`${options.length > 2 ? 'bg-red-300 text-red-600' : 'bg-red-50 text-red-200 cursor-not-allowed' } font-medium rounded-xl px-5 py-1 ml-3 cursor-pointer`}>delete</span>
                        </div>
                    ))
                }
                
                <button type='submit' className='bg-slate-700 text-white  px-4 py-2 font-fira'>Create poll</button>
            </form>
        </div>
  )
}

export default Modal