import logo from './logo.svg';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import { getValue } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';

const mapObj = {"S3":'<a href="https://aws.amazon.com/s3/" >Simple Storage Service (S3)</a>',
Gateway:'<a href="https://aws.amazon.com/api-gateway/" >API Gateway</a>',
Lambda: '<a href="https://aws.amazon.com/lambda/" >Lambda</a>',
MSK: '<a href="https://aws.amazon.com/msk/" >Amazon Managed Streaming for Apache Kafka (MSK)</a>'
};


function replaceAll(str,mapObj){
  var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

  return str.replace(re, function(matched){
      return mapObj[matched];
  });
}

function App() {

  const [value, setValue] = useState("")

  const handleOnChange = (e, editor) => {
    const data = editor.getData()
    let modify = replaceAll(data, mapObj)
    setValue(parse(modify))
  }
  return (
    <div className='container'>
      <h1>Clear-it</h1>
      <CKEditor
        editor = {ClassicEditor}
        onChange = {handleOnChange}
      />
      <div>
        {value}
        <button 
          onClick={() =>  navigator.clipboard.writeText(value.props.children)}
          >
          Copy
        </button>
      </div>
    </div>

  );
}

export default App;
