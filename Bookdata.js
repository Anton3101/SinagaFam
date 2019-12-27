import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';

//import { Tbl } from './Tbl';
//var Tbl = require('./Tbl');

export default class Bookdata extends Component {
    state = {
      books: [],
      error: null,
      columns: [
          {
              dataField: 'book_id',
              text: 'ID BUKU'
          },
          {
              dataField: 'judul',
              text: 'JUDUL BUKU',
              sort: true
          },
          {
              dataField: 'pengarang',
              text: 'PENGARANG'
          },
          {
              dataField: 'jumlah',
              text: 'JUMLAH'
          }                              
      ]
    }
    constructor(){
		super();
		this.addBook = this.addBook.bind(this);
        
        //this.state = { books: [] };
	}
    componentDidMount(){
        console.log('books constructor')
        this.getBooks();
        
    }

    getBooks = _ => {
        fetch('http://localhost:4000/listbook')
          .then(response => response.json())
          .then(response => {
                this.setState({books: response.data})
                console.log('state : ', this.state.books)
           })
          .catch(err => console.error(err))
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }
    async addBook(e) {
        e.preventDefault();
        const data = {
                   judul: this.state.judul,
                   pengarang: this.state.pengarang,
                   jumlah: this.state.jumlah
                };     
        await fetch('http://localhost:4000/addnewbook', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{ "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .catch(error => console.error("Error : ", error))
        .then(function(response){
            console.log("Process Success : ", response.status);
            alert(response.msg);
        });
         
    }
    renderBooks = ({ book_id, judul, pengarang, jumlah }) => <div key={book_id}>{judul} - {pengarang} - { jumlah }</div>
    
    render () {
      //const { books } = this.state;
      const { error, books } = this.state;
      var formStyle = {
        marginTop: '20px'
      };
      if (error) {
        return <div>Error: {error.message}</div>;
      } else {
      return (
          
          <form onSubmit={this.addBook} style={formStyle}>
          <div className="App">
              <h1>List Buku Perpustkaan BCV</h1>
              {books.map(this.renderBooks)}
          </div>
          <br />
          
          <div className="container">
                <div className="row">
                    <div className="col">Judul Buku</div>
                    <div className="col"><input type="text" id="judul" name="judul"  value={this.judul} onChange={this.changeHandler} /></div>
                </div>
                <div className="row">
                    <div className="col">Pengarang</div>
                    <div className="col"><input type="text" id="pengarang" name="pengarang"  value={this.pengarang} onChange={this.changeHandler} /></div>
                </div>
                <div className="row">
                    <div className="col">Judul Buku</div>
                    <div className="col"><input type="text" id="jumlah" name="jumlah" value={this.jumlah} onChange={this.changeHandler} /></div>
                </div>      
          </div>
          <br />
              
          <input type="button" value="Submit" />
          </form>         
      );
      }
    }
}

//export default App;