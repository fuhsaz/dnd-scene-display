import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Header from "../components/shared/Header";
import Footer from '../components/shared/Footer';
import { Outlet } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const { user } = useAuthenticator();
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
      <div>{`Logged in as ${user?.signInDetails?.loginId}`}</div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;