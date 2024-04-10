import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //using ref hook for enabling the copy button
  const passwordRef=useRef(null)
  
  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)
      str += "0123456789"
    if(characterAllowed)
      str+="!@#$%^&*(){}[]"
    for(let i=1; i<=length; i++){
      //rule for generating random numbers
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      
    }
    setPassword(pass)
  }, [length,numberAllowed,characterAllowed,setPassword])

  //writing the method to copy the password to clipboard
  const copyPasswordtoClipBoard=useCallback(()=>{ 
    //for highling the password after pressing the copying button 
    passwordRef.current?.select()
    ////for highling the first 3 character after pressing the copying button 
    //passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])

  //using useEffect hook
  useEffect((pass)=>{
    passwordGenerator()},[length,numberAllowed,characterAllowed,passwordGenerator])
  
  return (
    <>
      <div className='w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md' >
        <h1 className='my-3 text-center text-white'>Password Generator</h1>
        <div className="flex mb-4 overflow-hidden rounded-lg shadow">
          <input type='text' value={password} className='w-full px-3 py-1 outline-none' placeholder='password
          ' readOnly ref={passwordRef}></input>
          <button onClick={copyPasswordtoClipBoard} className='px-3 text-white bg-blue-700 outline-none py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e) =>{
              setLength(e.target.value);
            }}/>
            <label >Length {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
              setNumberAllowed((prev) =>!prev);
            }}></input>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
              setCharAllowed((prev) =>!prev);
            }}></input>
            <label htmlFor='numberInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
