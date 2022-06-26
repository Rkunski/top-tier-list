// API - application programing interface
// sąsaja su kita programa

const fetchTodos = async () => {
  const response = await fetch('http://localhost:1337/topTier'); // GET
  const todos = await response.json();

  return todos;
}

const createTodo = async ({ id, name, email }) => {
  const response = await fetch(
    'http://localhost:1337/topTier',
    // ↓↓↓ Užklausos savybės ↓↓↓
    {
      method: 'POST', // Užklausos siuntimo tipas
      headers: { // Nustatymai
        'Accept': 'application/json', // Tikėsis gauti tokį formatą
        'Content-Type': 'application/json' // Siųs duomenis tokiu formatu
      },
      body: JSON.stringify({ // Užklauso siunčiami duomenys
        id,
        name,
        email
      })
    }
  );

  const reponseData = await response.json();

  return reponseData;
};

const updateTopTier = async ({ id, ...props }) => {
  const response = await fetch(
    `http://localhost:1337/topTier/${id}`,
    {
      method: 'PATCH', // Užklausos siuntimo tipas
      headers: { // Nustatymai
        'Accept': 'application/json', // Tikėsis gauti tokį formatą
        'Content-Type': 'application/json' // Siųs duomenis tokiu formatu
      },
      body: JSON.stringify(props)
    }
  );

  const reponseData = await response.json();

  return reponseData;
}

const deleteTopTier = async (id) => {
  await fetch(`http://localhost:1337/topTier/${id}`, { method: 'DELETE' });
};

const ApiService = {
  fetchTopTiers: fetchTodos,
  createTopTier: createTodo,
  updateTopTier,
  deleteTopTier,

};

export default ApiService;