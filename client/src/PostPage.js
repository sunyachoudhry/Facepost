import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

//Creates post page
async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

function Post(props) {
  const navigate = useNavigate(); 
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <div className = "Post">
      <div className="App">
        <form onSubmit={submit}>
          <input onChange={fileSelected} type="file" accept="image/*"></input>
          <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
          <button type="submit">Submit</button>
        </form>

        { images.map( image => (
          <div key={image}>
            <img src={image}></img>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Post;