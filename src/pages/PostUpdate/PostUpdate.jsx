import { useLocation, useHistory } from "react-router-dom"
import React, { useState, useEffect} from 'react';
import * as postAPI from '../../services/postService.js'
import setPosts from '../PostLanding/PostLanding'


const PostUpdate = () => {

  const location = useLocation()
  
  const history = useHistory()

  const[post,setPost]=useState(location.state)
  
  
  const handleChange = (evt) => {
    setPost({...post,[evt.target.name]:evt.target.value})
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
   
    postAPI.update(post)
    .then(post => { 
      history.push('/')
    } )
  }
  return(
    <>
    <h1>Edit Post Form</h1>
    <form onSubmit={handleSubmit}
    className="mt-8 space-y-6"
    >
      <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
      <div> 
        <label htmlfor= "title" className="sr-only">
          Post title
        </label>
      <input name= "title"
      type ="text"
      required
      id="tiitle"
      value={post.title}
      onChange={handleChange}
      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
       />
      </div>
      </div>
      <div>
        <label className="sr-only"> Categories</label>
        <input name="categories"
          type ="text"
          required
          id="tiitle"
          value={post.categories}
          onChange={(e) => setPost({...post,[e.target.name]:e.target.value.split(";")})}
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
       />
       </div>
        <label htmlFor="body" className="sr-only">Post body</label>
        <textarea name= "body"
        required
        id="body"
        onChange={handleChange}
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        >{post.body}</textarea>
        <button className="group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 my-2">Save</button>
        <button className="group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 my-2">Cancel</button>
        {/* </div> */}
    </form>
    </>
  )
} 
export default PostUpdate;