import React, {useState} from 'react'

const ReplyForm = ({addReply}) => {

  const [content, setContent] = useState(''); 

  const handleSubmit = (e) =>{
    e.preventDefault();
    submitReply()
  }

  const submitReply = ()=>{
    setContent('')
    addReply({content})
  }

  const handleEnter = (e)=>{
    if(e.key === 'Enter'){
      submitReply()
    }
  }

  return (
    <>
      <h2>Write a reply</h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <textarea
          onKeyDown={handleEnter}
          required
          id="body"
          value={content}
          onChange={(e) => setContent(e.target.value)
          }
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          ></textarea>
        <button>Reply</button>
      </form>
    </>
  )
}

export default ReplyForm
