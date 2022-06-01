import { useEffect, useState } from "react";
import shortid from "shortid";
import POLLS from '../polls';


const usePolls = () => {
    const [polls, setPolls] = useState([...POLLS]);
    const [selectedPoll, setSelectPoll] = useState({});
    const [searchTerm, setSerchTerm] = useState('') 


    const createPoll = (poll) => {
        poll.id = shortid.generate();
        poll.created = new Date();
        poll.totalVote = 0;
        poll.opinions = []
        if(poll.title) {
            setPolls([...polls, poll])
        }
        
    }

    const updatePoll = (data) => {
        const allpolls = polls;
        const poll = allpolls.find(p => p.id === data.id);
        poll.title = data.title;
        poll.description = data.description;
        poll.options = data.options

        setPolls([...allpolls])
        setSelectPoll(poll)
    }

    const deletePoll = (id) => {
        const filteredPolls = polls.filter(p => p.id !== id);
        setPolls(filteredPolls)
        setSelectPoll({})
    }

    const handleSearch = (text) => {
        setSerchTerm(text)
    }

    const performSearch = () => {
        const searchedPoll = polls.filter(poll => poll.title.toLowerCase().includes(searchTerm.toLowerCase()))
        return searchedPoll;
    }
    const allPolls = performSearch();

    const handleSelect = (pollId) => {
        const poll = polls.find(p => p.id === pollId);
        setSelectPoll({...poll})
    }

    const getOpinion = (opt) => {
        const poll = polls.find(p => p.id === opt.pollId)
        const option = poll.options.find(o => o.id === opt.option)
        option.vote++
        poll.totalVote++
        const opinion = {
            id: shortid.generate(),
            name: opt.name
        }
        poll.opinions.push(opinion)
        setPolls([...polls])
        setSelectPoll(poll)
    }

    return {
        allPolls,
        createPoll,
        handleSearch,
        handleSelect,
        selectedPoll,
        deletePoll,
        updatePoll,
        getOpinion
    }
}

export default usePolls;