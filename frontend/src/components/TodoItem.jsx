import React, { useState } from 'react';
import { FaSave, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [detail, setDetail] = useState(todo.detail);

  const toggleCompletion = () => {
    onUpdate({ ...todo, completed: !todo.completed });
  };

  const updatePriority = (level) => {
    onUpdate({ ...todo, priority: level });
  };

  const saveChanges = () => {
    onUpdate({ ...todo, title, detail });
    setIsEditing(false);
  };

  return (
    <div className={`p-4 rounded-md shadow-sm mb-3 border flex flex-col bg-[color:var(--color-primary)] text-[color:var(--color-secondary)] ${todo.completed ? 'opacity-30' : ''}`}>
      <div className="flex items-end md:justify-between  gap-5 justify-center md:flex-row flex-col ">
        <div className="flex items-start justify-center gap-2 w-full">
          <input
            className="size-6 accent-[color:var(--color-accent)]"
            type="checkbox"
            checked={todo.completed}
            onChange={toggleCompletion}
          />
          <div className="flex w-full my-auto flex-wrap gap-2">
           {isEditing ? (
                    <textarea
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="font-semibold bg-transparent w-full resize-none border border-[color:var(--color-tertiary)] rounded px-2 py-1 text-[color:var(--color-secondary)]"
                      
                    />
                  ) : (
                    <p className="font-semibold w-full break-words">{title}</p>
                  )}

            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-[color:var(--color-accent)] flex items-center"
            >
              <FaEdit className="size-[20px] mr-1" /> Edit detail
            </button>
          </div>
        </div>

       

        <div className="flex items-center gap-2  justify-center">
           <div className="flex items-center gap-2 ">
          {['L', 'M', 'H'].map(level => (
            <button
              key={level}
              onClick={() => updatePriority(level)}
              className={`px-2 py-1 rounded text-xs border border-[color:var(--color-tertiary)] ${todo.priority === level ? 'bg-[color:var(--color-accent)] text-[color:var(--color-primary)]' : 'text-[color:var(--color-secondary)]'}`}
            >
              {level}
            </button>
          ))}
        </div>
          {isEditing && (
            <button onClick={saveChanges} className="text-[color:var(--color-tertiary)] text-2xl">
              <FaSave className="size-[25px]" />
            </button>
          )}
          <button onClick={() => onDelete(todo._id)} className="text-[color:var(--color-accent)]">
            <MdDelete className="size-[25px]" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={3}
          className="mt-2 w-full border border-[color:var(--color-tertiary)] rounded p-2 text-sm bg-[color:var(--color-primary)] text-[color:var(--color-secondary)]"
        />
      ) : (
        <p className="text-sm text-[color:var(--color-secondary)] mt-1">{todo.detail}</p>
      )}
    </div>
  );
}

export default TodoItem;
