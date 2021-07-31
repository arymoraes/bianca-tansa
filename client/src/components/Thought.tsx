import { useEffect, useState } from 'react'
import { ThoughtCompleteI } from '../interfaces/Thought'
import { FiChevronRight, FiEdit, FiPlus } from 'react-icons/fi'
import { createThought } from '../services/apiClient'
import { GetDailyData } from '../context/DailyDataContext'

interface Props {
  filteredThoughts: ThoughtCompleteI[]
}

export const Thought = ({ filteredThoughts }: Props) => {

  const { setNewThoughts, thoughts } = GetDailyData();
  
  const defaultThought = {
    id: undefined,
    thoughtContent: "",
    typeId: filteredThoughts[0].typeId,
    UserId: undefined,
    date: ""
  }
  // setting the thought as what we received from db
  const [myThought, setMyThought] = useState<ThoughtCompleteI>(defaultThought);

  // changing between displaying thought or editing thought
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);   

  // updates state everytime prop is changed
  useEffect(() => {
    setMyThought(filteredThoughts[0]);
  }, [filteredThoughts])

  const handleChange = (event: any) => {
    // changing state according to what user changed on the input
    const { name, value } = event.target
    setMyThought((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    // toggle back to display
    setToggleEdit(!toggleEdit)
    // add state to database    
    const { thought } = await createThought(myThought)
    // add result to state
    setMyThought(thought);
    // change context
    setNewThoughts(updateThoughtsArr(thought));
  }

  const updateThoughtsArr = (thought: ThoughtCompleteI) => {
    const removed = thoughts.filter((thou) => thou.id !== thought.id)
    return [...removed, thought]
  }

  return (
    <div className="thought">
      {toggleEdit ? (
        <div className="thought__edit-wrapper">
          <form onSubmit={(e) => handleSubmit(e)} className="thought__edit-form">
            <label htmlFor="thoughtContent"></label>
            <textarea
              name="thoughtContent"
              value={myThought.thoughtContent}
              onChange={(e) => handleChange(e)}
            />
            <button type="submit" className="thought__edit-form--btn">
              <FiChevronRight className="thought__edit-form--icon"/>
            </button>
          </form>
        </div>
      ) : (
          myThought.thoughtContent ? (
            <div className="thought__display">
              <div>{myThought.thoughtContent}</div>
              <FiEdit onClick={() => setToggleEdit(!toggleEdit)} className="thought__display--icon"/>
            </div>
          ):
          (
            <div className="thought__display">
              <span>Add a thought for today...</span>
              <FiPlus onClick={() => setToggleEdit(!toggleEdit)} className="thought__display--icon"/>
            </div>
          )
      )}
    </div>
  )
}
