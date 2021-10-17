import React, { useState, useEffect } from 'react'
import todo from '../assets/images/todo.png'

// get data form local storge
const getLocalData = () => {
  let list = localStorage.getItem('todo-list')

  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState('')
  const [todoList, setTodoList] = useState(getLocalData())
  const [toggleBtn, setToggleBtn] = useState(false)
  const [isEditItem, setIsEditItem] = useState()
  //   to add todos in the list
  const addItem = () => {
    if (!inputData) {
      alert('Please Write something inside input field....')
    } else if (inputData && toggleBtn) {
      setTodoList(
        todoList.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, todo: inputData }
          }
          return elem
        })
      )
      setToggleBtn(true)
      setInputData('')
      setIsEditItem(null)
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        todo: inputData,
      }
      setTodoList([...todoList, allInputData])
      setInputData('')
    }
  }
  // edit todo
  const editItem = (id) => {
    let editItem = todoList.find((elem) => {
      return elem.id === id
    })
    console.log(editItem)
    setToggleBtn(true)
    setInputData(editItem.todo)
    setIsEditItem(id)
  }
  //   delete single todo
  const deleteItem = (id) => {
    const updateTodoList = todoList.filter((todo) => {
      // [html = > 0]
      return id !== todo.id
    })
    setTodoList(updateTodoList)
  }
  //   remove / delete all todos
  const removeAll = () => {
    setTodoList([])
  }

  // add items/todos inside local storage

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList))
  }, [todoList])
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
          {toggleBtn ? (
            <i
              className='fas fa-edit'
              title='Update item'
              onClick={addItem}
            ></i>
          ) : (
            <i className='fas fa-plus' title='add item' onClick={addItem}></i>
          )}
        </div>
        <div className='showItems'>
          {todoList.map((todo) => {
            return (
              <div className='eachItem' key={todo.id}>
                <h3>{todo.todo}</h3>
                <div className='todo-btn'>
                  <i
                    className='fas fa-edit add-btn'
                    title='Edit item'
                    onClick={() => editItem(todo.id)}
                  ></i>
                  <i
                    className='fas fa-trash-alt add-btn'
                    title='delete item'
                    onClick={() => deleteItem(todo.id)}
                  ></i>
                </div>
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
