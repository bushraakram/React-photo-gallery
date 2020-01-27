import React from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Loading from './components/Loading';
import NoResults from './components/NoResults';
import NotFound from './components/NotFound';


class App extends React.Component {
  state={
    query: '',
    showResults: false,
    loading: false,
    searchPhotos: [],
    beachPhotos: [],
    mountainPhotos:[],
    lakePhotos:[]


  }

  key="ec541d66f3244c22381c8e12152dfde5";

  componentDidMount(){
    this.getPhotos('beach', 'beachPhotos');
    this.getPhotos('mountain', 'mountainPhotos');
    this.getPhotos('lake', 'lakePhotos');
    this.handleSearch();
  }
  
  getPhotos=(tag,photos)=>{
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&tags=${tag}&sort=relevance&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
            this.setState({
                [photos]: response.data.photos.photo
            });
        })
        .catch(error => {
            console.log(error);
        });

  }
  handleSearch=(query)=>{
    this.setState({

    query,
    showResults:false,
    loading:true


    });

    if(query){

      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&tags=${query}&sort=relevance&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
            showResults: response.data.photos.photo.length > 0,
            loading: false,
            searchPhotos: response.data.photos.photo
        });
      
    }).catch(error=>{
      console.log(error);
    });
    }

  }

  render() {
    let componentToRender;
    if (this.state.loading) {
      componentToRender = <Loading />;
  } 
  else if  (!this.state.showResults)
    {
      componentToRender=<NoResults />
    }

    else{
      componentToRender=<Gallery data={this.state.searchPhotos} title={this.state.query}/>;
    }
    return (
      <BrowserRouter>
      <Switch>
     <Route exact path="/" render={ () => <Redirect to="/beaches" /> }    />
     <Route 
     exact
     path="/beaches" 
     render={ () => 
         <React.Fragment>
             <Header search={this.handleSearch} />
             <div className="container">
                 <Gallery data={this.state.beachPhotos} title="Beaches" /> 
             </div>
         </React.Fragment>
     } />

     <Route 
     exact
     path="/mountains" 
     render={ () => 
         <React.Fragment>
             <Header search={this.handleSearch} />
             <div className="container">
                 <Gallery data={this.state.mountainPhotos} title="Mountains" /> 
             </div>
         </React.Fragment>
     } 
 />
 {/* Handle '/lakes' route */}
 <Route 
     exact
     path="/lakes" 
     render={ () => 
         <React.Fragment>
             <Header search={this.handleSearch} />
             <div className="container">
                 <Gallery data={this.state.lakePhotos} title="Lakes" />
             </div> 
         </React.Fragment>
     } 
 />
 {/* Handle '/search/query' route */}
 <Route 
     exact
     path={`/search/${this.state.query}`}
     render={ () => 
         <React.Fragment>
             <Header search={this.handleSearch} />
             <div className="container">
                 {componentToRender}
             </div>
         </React.Fragment>
     } 
 />
 {/* Handle '/search' route */}
 <Route 
     exact path="/search"
     render={ () =>
       <Header search={this.handleSearch}/>
       } 
 />
 {/* Handle 404 error */}
 <Route component={NotFound} />
 
      </Switch>
        
        </BrowserRouter>
    );
  }
}

export default App;
