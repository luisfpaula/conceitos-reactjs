import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo title ${Date.now()}`,
      url: "https://github.cnzxom/SAP/ui5-webcomponents-react",
      techs: ["SAPUI5", "REACT", "SAP"]
    });

    const repository = response.data;
    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(`repositories/${id}`);

    await api.delete(`repositories/${id}`).then(response =>{
      const oldRepositories = [...repositories];
      const repIndex  = oldRepositories.findIndex( repository => repository.id === id);
      
      if(repIndex !== -1){
        oldRepositories.splice(repIndex, 1);
        setRepositories([...oldRepositories]);
      }
    });  
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}><button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>{repository.title}</li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
