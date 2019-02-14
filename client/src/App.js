import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor (props) {
  super(props)
  this.state = {
    data: [],
    search:" ",
    loading: false
  }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    axios.get(`http://165.227.2.138:3001/api/?q=${this.state.search}`)
      .then(response => this.setState({
        data: response.data.data.posts,
        loading: false
      }))
  }

  handleChange(e) {
    this.setState({search: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Webservice Test</h1>
        </header>
        <section>
          <div className="container">
            <div className="columns is-mobile">
              <div className="column is-three-fifths is-offset-one-fifth">
                <form onSubmit={this.handleSubmit}>
                  <h1 className="title is-5 has-text-grey-dark">Start typing and let's see what we find</h1>
                  <input className="input is-medium is-info" type="text" name="q" value={this.state.search} onChange={this.handleChange.bind(this)}/>
                  { this.state.loading === true ? (
                    <button className="button is-medium is-info is-loading" type="submit" value="Submit">Search</button>
                  ) : (
                    <button className="button is-medium is-info" type="submit" value="Submit">Search</button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="data-table">
          <div className="container">
            <h4 className="is-pulled-left">Displaying 25 most recent results for demo purposes</h4>
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data === null || this.state.data.length === 0 ?(
                  <tr>
                    <td colSpan={6} className="has-text-centered">
                      No searches completed
                    </td>
                  </tr>
                ) : (
                  this.state.data.map(post => (
                  <tr key={post.uuid}>
                    <td>{post.title}</td>
                    <td><a href={post.url} target="_blank" rel="noopener noreferrer">Link To Reference</a></td>
                  </tr>
                )
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
