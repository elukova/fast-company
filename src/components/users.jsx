import React, { useState } from "react";
import api from "../api"

const Users =() => {

  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(prevState => prevState.filter(user => user._id !== userId))
  };

  const renderPhrase = (number) => {
    if (!number) {return <span class="badge bg-danger">Никто с тобой не тусанет</span>}
    const words = ['человек тусанет', 'человека тусанут']
    const remaiderOfHundred = Math.abs(number) % 100
    const remaiderOfTen = remaiderOfHundred % 10
    if (remaiderOfHundred > 10 && remaiderOfHundred < 20) {
      return <span class="badge bg-primary">{number} {words[0]} с тобой сегодня</span>
    } else if (remaiderOfTen > 1 && remaiderOfTen < 5 ) {
      return <span class="badge bg-primary">{number} {words[1]} с тобой сегодня</span>
    } else {
      return <span class="badge bg-primary">{number} {words[0]} с тобой сегодня</span>
    }
  }

  const renderUsers = () => {
    return users.map(user => (
        <tr>
          <th scope="row">{user.name}</th>
          <td>{user.qualities.map(quality => <span><span className={"badge bg-"+ quality.color}>{quality.name}</span><span> </span></span>)}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td><button type="button" class="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>delete</button></td>
        </tr>
      ))
    }

  return users.length !== 0 ? (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {renderUsers()}
      </tbody>
      </table>
  </>) : (<h2>{renderPhrase(users.length)}</h2>)
}

console.log(api.users.fetchAll());


export default Users;
