import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('/projects')
    .then((response) => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const repoNew = {
      title: 'Novo repositório',
      owner: 'Thiago'
    }

    api.post(`/projects`, repoNew ).then((response) => {
      setRepositories([...repositories, response.data]);
    })

  }

  async function handleRemoveRepository(id) {

    api.delete(`/projects/${id}`).then(() => {
      api.get('/projects')
      .then((response) => {
        setRepositories(response.data)
      })
    })

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title} 

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
