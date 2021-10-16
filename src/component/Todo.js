import React, { useState } from 'react'
import todo from '../assets/images/todo.png'

const Todo = () => {
  const [inputData, setInputData] = useState('')
  const [todoList, setTodoList] = useState([])
  //   to add todos in the list
  const addItem = () => {
    if (inputData) {
      setTodoList([...todoList, inputData])
      setInputData('')
    } else {
      alert('Please Write something inside input field....')
    }
  }
  //   delete single todo
  const deleteItem = (id) => {
    console.log(id)
    const updateTodoList = todoList.filter((todo, idx) => {
      // [html = > 0]
      return idx !== id
    })
    setTodoList(updateTodoList)
  }
  //   remove / delete all todos
  const removeAll = () => {
    setTodoList([])
  }
  return (
    <div className='main-div'>
      <div className='child-div'>
        <figure>
          <img src={todo} alt='todo-images' />
          <figcaption>Add Your List...</figcaption>
        </figure>
        <div className='addItems'>
          <input
            type='text'
            placeholder='Add Items...'
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value)
            }}
          />
          <i className='fas fa-plus' title='add item' onClick={addItem}></i>
        </div>
        <div className='showItems'>
          {todoList.map((todo, id) => {
            return (
              <div className='eachItem' key={id}>
                <h3>{todo}</h3>
                <i
                  className='fas fa-trash-alt add-btn'
                  title='delete item'
                  onClick={() => deleteItem(id)}
                ></i>
              </div>
            )
          })}
        </div>
        <div className='showItems'>
          <button
            className='btn effect04'
            data-sm-link-text='Remove All'
            onClick={removeAll}
          >
            <span>CheckList</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Todo
