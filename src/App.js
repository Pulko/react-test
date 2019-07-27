import React, { Component } from 'react';
import TitleFilter from './TitleFilter';
import DataTable from './DataTable';
import IdentFilter from './IdentFilter';
import FilterSelector from './FilterSelector';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      filterType: "",
      url: "https://gist.githubusercontent.com/codeholic/23e37417db35be1fa89060b360abb164/raw/deb4e8dd41c3df43fffb7e7f7770a38cd8cf5d40/event_venues.json",
    }

    this.onInputTitleChange = this.onInputTitleChange.bind(this);
    this.onTitleSubmit = this.onTitleSubmit.bind(this);
    this.onIdentSubmit = this.onIdentSubmit.bind(this);
    this.onEndSearching = this.onEndSearching.bind(this);
    this.onFilterTypeSubmit = this.onFilterTypeSubmit.bind(this);
  }

  componentDidMount() {
    caches.open("my-cache").then( 
      (cache) => {
        cache.match(this.state.url).then( 
            (response) => {
              if (response) {
                return response.json().then( 
                  (result) => this.setState({data: result}
                  )
                )
              } else {
                cache.add(this.state.url).then(
                  () => cache.match(this.state.url).then(
                    (response) => response.json().then(
                      (data) => this.setState({data})
                    )
                  ) 
                ) 
              }
            }
        )
      }
    )
  }

  getWrapperStyles() {
    return {
      width: "70%",
      margin: "50px auto",
    }
  }

  getTableWrapperStyle() {
    return {
      ...this.getWrapperStyles(),
      overflowY: "auto",
      maxHeight: "400px"
    }
  }

  onInputTitleChange(value) {
    if (!value) { // empty value triggers loading all the Data
      caches.open("my-cache").then(
        (cache) => {
          cache.match(this.state.url).then(
            (response) => {
              return response.json().then(
                (result) => this.setState({data: result})
              )
            }
          )
        }
      )
    }
  }



  onTitleSubmit(value) {
    if (value) { // to not asking for Data if input is empty
      caches.open("my-cache").then( 
        (cache) => {
          cache.match(this.state.url).then( 
            (response) => {
              return response.json().then( (result) => {
                const filterInputValue = value;
                const filteredData = result.filter(i => i.title.indexOf(filterInputValue) > -1);
                this.setState({data: filteredData});
              }
              )
            }
          )
        }
      )
    }
  }

  onEndSearching = () => {
    caches.open("my-cache").then( (cache) => {
      cache.match(this.state.url).then( 
        (response) => response.json().then(
          (result) => this.setState({data: result})
        )
      )
    })
  }

  onIdentSubmit = (value) => {
    if (value.length) {
      const valueSet = new Set(value);
      const newData = this.state.data.filter(
        (item) => {
          return valueSet.has(item.id.toString());
        }
      )
        this.setState({data: newData});
    }
  }

  onFilterTypeSubmit = (filterType) => {
    if (filterType !== this.state.filterType) {
      this.setState({filterType});
      caches.open("my-cache").then(
        (cache) => cache.match(this.state.url).then(
          (response) => response.json().then(
            (data) => this.setState({data})
          )
        )
      )
    }
  }

  getCurrentFilter() {
    switch(this.state.filterType) {
      case "":
        return null;
      case "id":
        return (
          <IdentFilter submitIdentValue={this.onIdentSubmit}
                       onEndSearching={this.onEndSearching}
          />
        );
      case "title":
        return (
          <TitleFilter submitTitleValue={this.onTitleSubmit}
                       onChangeTitleValue={this.onInputTitleChange}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <div style={this.getWrapperStyles()}>
          <FilterSelector onFilterTypeSubmit={this.onFilterTypeSubmit}/>
          {/* <TitleFilter submitTitleValue={this.onTitleSubmit}
                       onChangeTitleValue={this.onInputTitleChange}
          />
          <IdentFilter submitIdentValue={this.onIdentSubmit}
                       onEndSearching={this.onEndSearching}
          /> */}
          {this.getCurrentFilter()}
        </div>
        <div style={this.getTableWrapperStyle()}>
          <DataTable data={data}/>
        </div>
      </div>
    );
  }
}

export default App;
