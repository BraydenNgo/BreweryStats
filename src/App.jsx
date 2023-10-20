import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  const breweryTypes = ['micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'contract', 'proprietor', 'closed'];

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = 'https://api.openbrewerydb.org/v1/breweries';
      const typeParam = typeFilter ? `by_type=${typeFilter}` : '';
      const stateParam = stateFilter ? `by_state=${stateFilter}` : '';
      const url = `${baseUrl}?${typeParam}&${stateParam}&per_page=200`;
      
      const response = await fetch(url);
      const data = await response.json();
      setBreweries(data);
    };

    fetchData();
  }, [typeFilter, stateFilter]);

  const mostCommonBreweryType = (breweries) => {
    const typeCount = breweries.reduce((acc, brewery) => {
      acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
      return acc;
    }, {});

    const mostCommon = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0];
    return mostCommon ? mostCommon[0] : 'N/A';
  };


  const mostCommonState = (breweries) => {
    const stateCount = breweries.reduce((acc, brewery) => {
      acc[brewery.state] = (acc[brewery.state] || 0) + 1;
      return acc;
    }, {});

    const mostCommon = Object.entries(stateCount).sort((a, b) => b[1] - a[1])[0];
    return mostCommon ? mostCommon[0] : 'N/A';
  };

  const filteredBreweries = breweries.filter(brewery =>
    brewery.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <><h1>Brewery Data</h1><div>
      <div className="statistics">
        <div className="stat-bubble">Total breweries: {breweries.length}</div>
        <div className="stat-bubble">Most common brewery type: {mostCommonBreweryType(breweries)}</div>
        <div className="stat-bubble">Top state by breweries: {mostCommonState(breweries)}</div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search breweries..."
          value={search}
          onChange={e => setSearch(e.target.value)} />
      </div>

      <div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          {breweryTypes.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>

        <select value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
          <option value="">All States</option>
          <option value="alabama">Alabama</option>
          <option value="alaska">Alaska</option>
          <option value="arizona">Arizona</option>
          <option value="arkansas">Arkansas</option>
          <option value="california">California</option>
          <option value="colorado">Colorado</option>
          <option value="connecticut">Connecticut</option>
          <option value="delaware">Delaware</option>
          <option value="florida">Florida</option>
          <option value="georgia">Georgia</option>
          <option value="hawaii">Hawaii</option>
          <option value="idaho">Idaho</option>
          <option value="illinois">Illinois</option>
          <option value="indiana">Indiana</option>
          <option value="iowa">Iowa</option>
          <option value="kansas">Kansas</option>
          <option value="kentucky">Kentucky</option>
          <option value="louisiana">Louisiana</option>
          <option value="maine">Maine</option>
          <option value="maryland">Maryland</option>
          <option value="massachusetts">Massachusetts</option>
          <option value="michigan">Michigan</option>
          <option value="minnesota">Minnesota</option>
          <option value="mississippi">Mississippi</option>
          <option value="missouri">Missouri</option>
          <option value="montana">Montana</option>
          <option value="nebraska">Nebraska</option>
          <option value="nevada">Nevada</option>
          <option value="new_hampshire">New Hampshire</option>
          <option value="new_jersey">New Jersey</option>
          <option value="new_mexico">New Mexico</option>
          <option value="new_york">New York</option>
          <option value="north_carolina">North Carolina</option>
          <option value="north_dakota">North Dakota</option>
          <option value="ohio">Ohio</option>
          <option value="oklahoma">Oklahoma</option>
          <option value="oregon">Oregon</option>
          <option value="pennsylvania">Pennsylvania</option>
          <option value="rhode_island">Rhode Island</option>
          <option value="south_carolina">South Carolina</option>
          <option value="south_dakota">South Dakota</option>
          <option value="tennessee">Tennessee</option>
          <option value="texas">Texas</option>
          <option value="utah">Utah</option>
          <option value="vermont">Vermont</option>
          <option value="virginia">Virginia</option>
          <option value="washington">Washington</option>
          <option value="west_virginia">West Virginia</option>
          <option value="wisconsin">Wisconsin</option>
          <option value="wyoming">Wyoming</option>
        </select>

      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {filteredBreweries.map((brewery, index) => (
            <tr key={brewery.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{brewery.name}</td>
              <td>{brewery.brewery_type}</td>
              <td>{brewery.city}</td>
              <td>{brewery.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
}

export default App;
