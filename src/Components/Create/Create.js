import React, { Fragment,useContext,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [errorMsg,setErrorMsg] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const date = new Date()
  const history = useHistory()

  const handleSubmit = () => {
      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref}) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createAt:date.toDateString()
          })
          history.push('/')
        })
      })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => {setName(e.target.value)
                if(e.target.value.length < 1){
                  setErrorMsg('Field Required')
                }else{
                  setErrorMsg('')
                }
              }}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => {setCategory(e.target.value)
                if(e.target.value.length < 1){
                  setErrorMsg('Field Required')
                }else{
                  setErrorMsg('')
                }
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}
              onChange={(e) => {setPrice(e.target.value)
                if(e.target.value.length < 1){
                  setErrorMsg('Field Required')
                }else{
                  setErrorMsg('')
                }
              }} />
            <br />
          <br />
          { image && <img alt="Posts" width="200px" height="200px" src={ image ? URL.createObjectURL(image) : '' }></img> }
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
            { errorMsg && <p style={{color:'red'}} className='text-center' >{errorMsg}</p>}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
