// import React, { useState } from 'react';

// export default function TaskForm({ addTask }) {
//   const [input, setInput] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       addTask(input);
//       setInput('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Add a new task"
//       />
//       <button type="submit">Add</button>
//     </form>
//   );
// }
