import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Outlet, Route, Routes } from "react-router-dom";
import Display from "../components/Display";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <div className="root container-fluid">
      <Header temp="temp" />
      <main>
        <Outlet />
      </main>
      <Footer temp="temp" />
    </div>
  );
}

export default App;