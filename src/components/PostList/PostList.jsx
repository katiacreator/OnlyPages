import { Link } from 
'react-router-dom';
// import'./PostList.css'

const PostList = ({ posts, title, handleDelete, userProfile }) => {
 
  
 return (
   
    <div className="flex flex-col justify-center">
      <h2 className="font-bold text-black-500 text-3xl text-center py-4 bg-gray-300 my-2">{title} Posts</h2>
  {/* \/ this render all post on by\/*/}
  <div className='text-center text-gray-50 grid grid-cols-3 md:grid-cols-6'>
      {posts.map((post) => (
        <div className="p-5 mx-4 rounded-2xl shadow-2xl hover:shadow-none bg-blue-400" key={post._id}>
          <div>         
          <Link 
            to={{
              pathname: `/posts/${post._id}`,
              state: {post}
            }
          }>
          <h2 className="font-bold text-black-500 text-3xl text-center"> Title: { post.title }</h2>
          <p className="font-bold text-white-500 text-xl text-center">Posted by <Link to={`/profiles/${post.author._id}`}>
            { post.author.name }
            </Link>
          </p>
            </Link>
            </div>
            {post.author._id===userProfile._id&&
            <button 
              onClick={()=>handleDelete(post._id)}
              className="p-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-300 "
            >
              Delete</button>}
        </div>
        
      ))}
    </div>
    </div>
   
  );
}
 
export default PostList;