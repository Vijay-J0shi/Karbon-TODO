import React, { useContext, useEffect, useState } from "react";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import { useAuth0 } from "@auth0/auth0-react";
import { LuListTodo } from "react-icons/lu";
import { toast } from "react-toastify";
import { MdAddBox } from "react-icons/md";
export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const { isAuthenticated, user } = useAuth0();
  console.log(user);
  const [email, setEmail] = useState("");
  const { serverUrl, setLoading } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);

  useEffect(() => {
    const op = localStorage.getItem("authOp");
    if (isAuthenticated && user) {
      setEmail(user.email);
      if (op == "signup") {
        handleGoogleSignup();
      } else {
        handleGoogleLogin();
      }
    }
  }, [isAuthenticated, user]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        const email = user.email;
        setEmail(user.email);

        const Auth = isAuthenticated;
        const password = user.sub;
        const result = await axios.post(
          serverUrl + "/api/auth/login",
          { email, Auth, password },
          { withCredentials: true }
        );
        setUserData(result.data);

        fetchTodos();
        toast.success("Google Login Successfull");
      }
    } catch {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const name = user.name;
      const email = user.email;
      setEmail(user.email);
      const password = user.sub;
      const Auth = true;
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { email, Auth, name, password },
        { withCredentials: true }
      );
      setUserData(result.data);

      fetchTodos();
      toast.success("Google signup Successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  // const deleteUser= async()=>{
  //   try{
  //    const Auth= isAuthenticated
  //  const res= await axios.delete(serverUrl+'/api/user/delete',{data:{
  //   email,Auth},withCredentials:true})
  //    if(Auth){
  //       logout({ logoutParams: { returnTo: window.location.origin } })
  //     }else
  //     window.location.href = '/';
  //  }catch{
  //   toast.error('failed to delete')
  //  }

  // }

  const fetchTodos = async () => {
    const res = await axios.get(serverUrl + "/api/todo", {
      withCredentials: true,
    });
    console.log(res.data);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    const res = await axios.post(
      serverUrl + "/api/todo",
      {
        title,
        detail,
        priority: "",
        completed: false,
      },
      {
        withCredentials: true,
      }
    );
    setTodos([...todos, res.data]);
    setTitle("");
    setDetail("");
  };

  const updateTodo = async (todo) => {
    const res = await axios.put(serverUrl + `/api/todo/${todo._id}`, todo, {
      withCredentials: true,
    });
    setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(serverUrl + `/api/todo/${id}`, {
      withCredentials: true,
    });
    setTodos(todos.filter((t) => t._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (!userData)
    return (
      <p className="p-6 text-lg text-red-600 text-red-50:hsl[19,20%,12%]">
        Please log in to continue.
      </p>
    );

  return (
    <div className="min-h-screen bg-[color:var(--color-primary)] p-4 flex w-full justify-between sm:items-start items-center flex-wrap flex-col-reverse md:flex-row gap-[20px]">
      <div className="flex flex-col w-[95%] md:w-[60%] min-w-[200px] bg-[color:var(--color-secondary)] text-[color:var(--color-primary)] p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[color:var(--color-accent)]">
          <LuListTodo className="size-[30px]" /> My Tasks
        </h1>

        <div className="mb-4 flex items-center justify-between flex-col flex-wrap">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded border-[color:var(--color-tertiary)] text-[color:var(--color-secondary)] bg-[color:var(--color-primary)]"
          />
          <textarea
            placeholder="Details"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border rounded border-[color:var(--color-tertiary)] text-[color:var(--color-secondary)] bg-[color:var(--color-primary)]"
          ></textarea>
          <button
            onClick={addTodo}
            className="mt-2 bg-[color:var(--color-accent)] text-[color:var(--color-primary)] px-4 py-2 rounded flex items-center"
          >
            <MdAddBox className="size-[25px]" /> Add Task
          </button>
        </div>

        <div className="mt-[10%]">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
        </div>
        {/* <button className=' w-auto h-5px  hover:text-[15px] flex-wrap mt-[1000px]'  onClick={()=>deleteUser()}>Delete User Account</button> */}
      </div>

      <div className="md:w-[30%] w-[95%] min-w-[200px] p-4 bg-[color:var(--color-secondary)] text-[color:var(--color-primary)] rounded shadow md:mr-4 h-fit mt-[30px] flex flex-col">
        <h2 className="text-lg font-semibold mb-3 text-[color:var(--color-accent)]">
          🔥 High Priority
        </h2>
        {todos.filter((t) => t.priority === "H").length === 0 ? (
          <p className="text-sm text-[color:var(--color-primary)] opacity-80">
            No high priority tasks
          </p>
        ) : (
          todos
            .filter((t) => t.priority === "H")
            .map((todo) => (
              <div
                key={todo._id}
                className="border-b border-[color:var(--color-tertiary)] gap-3 border-5 bg-[color:var(--color-primary)] px-[10px] rounded-2xl py-2 mb-4 flex items-center justify-center flex-wrap"
              >
                <h4 className="font-bold text-[color:var(--color-accent)] text-sm">
                  {todo.title}
                </h4>
                {/* <p className="text-xs font-semibold text-[color:var(--color-tertiary)]">{todo.detail}</p> */}
              </div>
            ))
        )}
      </div>
    </div>
  );
};
