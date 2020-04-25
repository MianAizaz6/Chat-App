 users= [];

 addUser = ({ id, name, room } ) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const exitingUsers = users.find((user)=> user.room === room && user.name === name );

  if(exitingUsers){
    return {error : 'Sorry UserName Exists..'}
  }
  const user = {id , name, room};
  users.push(user);
  return { user}
}

 removeUser = () => {
  const index = users.findIndex((user)=> user.id === id );
   if(index !== -1){
     return users.splice(index,1)[0];
   }
}

 getUser = (id) => users.find((user)=> user.id === id);

  getUserInRoom = (room) => user.filter((user)=> user.room === room);
  
  module.exports = { addUser, getUser , removeUser , getUserInRoom};