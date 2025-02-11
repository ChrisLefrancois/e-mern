import { useState, useEffect } from 'react';
import api from '/components/api';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [genres, setGenres] = useState([]);
  const [sports, setSports] = useState([]);
  const [tcgs, setTcgs] = useState([]);
  const [sets, setSets] = useState([]);

  const [consoleName, setConsoleName] = useState('');
  const [genreName, setGenreName] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    type: '',
    videoGameDetails: { console: '', genre: '' },
    cardDetails: { category: '', sport: '', game: '', set: '', isGraded: false },
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, consoleRes, genreRes, sportRes, tcgRes, setRes] = await Promise.all([
          api.get('/products'),
          api.get('/consoles'),
          api.get('/genres'),
          api.get('/sports'),
          api.get('/tcgs'),
          api.get('/sets')
        ]);
        setProducts(productRes.data);
        setConsoles(consoleRes.data);
        setGenres(genreRes.data);
        setSports(sportRes.data);
        setTcgs(tcgRes.data);
        setSets(setRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsChange = (e, category) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [category]: { ...prev[category], [name]: value },
    }));
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('quantity', newProduct.quantity);
      formData.append('type', newProduct.type);
      formData.append('videoGameDetails', JSON.stringify(newProduct.videoGameDetails));
      formData.append('cardDetails', JSON.stringify(newProduct.cardDetails));

      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }

      const response = await api.post('/products/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProducts((prevProducts) => Array.isArray(prevProducts) ? [...prevProducts, response.data] : [response.data]);

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  const handleAddConsole = async () => {
    if (!consoleName.trim()) {
      alert('Please enter a console name.');
      return;
    }

    try {
      const response = await api.post('/consoles/create', { name: consoleName });
      setConsoles([...consoles, response.data]); // Update state with the new console
      setConsoleName(''); // Clear input field
    } catch (error) {
      console.error('Error adding console:', error);
      alert('Failed to add console.');
    }
  };

  const handleAddGenre = async () => {
    if (!genreName.trim()) {
      alert('Please enter a console name.');
      return;
    }

    try {
      const response = await api.post('/genres/create', { name: genreName });
      setGenres([...genres, response.data]); // Update state with the new console
      setGenreName(''); // Clear input field
    } catch (error) {
      console.error('Error adding genre:', error);
      alert('Failed to add genre.');
    }
  };



  return (
    <div>
      <h1>Admin Page</h1>

      <h2>Add Product</h2>
      <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} />
      <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
      <input type="number" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleInputChange} />
      <input type="file" accept="image/*" onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })} />
      <select name="type" value={newProduct.type} onChange={handleInputChange}>
        <option value="">Select Type</option>
        <option value="video_game">Video Game</option>
        <option value="card">Card</option>
      </select>

      {newProduct.type === 'video_game' && (
        <>
          <select name="console" value={newProduct.videoGameDetails.console} onChange={(e) => handleDetailsChange(e, 'videoGameDetails')}>
            <option value="">Select Console</option>
            {consoles.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select name="genre" value={newProduct.videoGameDetails.genre} onChange={(e) => handleDetailsChange(e, 'videoGameDetails')}>
            <option value="">Select Genre</option>
            {genres.map((g) => <option key={g._id} value={g._id}>{g.name}</option>)}
          </select>
        </>
      )}

      {newProduct.type === 'card' && (
        <>
          <select name="category" value={newProduct.cardDetails.category} onChange={(e) => handleDetailsChange(e, 'cardDetails')}>
            <option value="">Select Category</option>
            <option value="tcg">TCG</option>
            <option value="sport">Sport</option>
          </select>

          {newProduct.cardDetails.category === 'sport' && (
            <select name="sport" value={newProduct.cardDetails.sport} onChange={(e) => handleDetailsChange(e, 'cardDetails')}>
              <option value="">Select Sport</option>
              {sports.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          )}

          {newProduct.cardDetails.category === 'tcg' && (
            <>
              <select name="game" value={newProduct.cardDetails.game} onChange={(e) => handleDetailsChange(e, 'cardDetails')}>
                <option value="">Select Game</option>
                {tcgs.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
              <select name="set" value={newProduct.cardDetails.set} onChange={(e) => handleDetailsChange(e, 'cardDetails')}>
                <option value="">Select Set</option>
                {sets.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </>
          )}

          <label>
            <input type="checkbox" name="isGraded" checked={newProduct.cardDetails.isGraded} onChange={(e) => handleDetailsChange({ target: { name: 'isGraded', value: e.target.checked } }, 'cardDetails')} />
            Is Graded
          </label>
        </>
      )}

      <button onClick={handleAddProduct}>Add Product</button>

      <h2>Add Console</h2>
      <input
        type="text"
        placeholder="Console Name"
        value={consoleName}
        onChange={(e) => setConsoleName(e.target.value)}
      />
      <button onClick={handleAddConsole}>Add Console</button>

      <h2>Add Genre</h2>
      <input
        type="text"
        placeholder="Genre Name"
        value={genreName}
        onChange={(e) => setGenreName(e.target.value)}
      />
      <button onClick={handleAddGenre}>Add Console</button>


    </div>
  );
};

export default AdminPage;
