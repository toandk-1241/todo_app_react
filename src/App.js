import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import {findIndex} from 'lodash'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    }
  }

  onToggeForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state;

    if(data.id === '') {
      data.id = this.generateId();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: false
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.onCloseForm();
  }

  // onUpdateStatus = (id) => {
  //   // var index = this.findIndex(id);
  //   var {tasks} = this.state;
  //   var index = findIndex(tasks,(task) => {
  //     return task.id === id;
  //   })

  //   if (index !== -1) {
  //     tasks[index].status = !tasks[index].status;
  //   }

  //   this.setState({
  //     tasks: tasks
  //   });

  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  findIndex(id) {
    var {tasks} = this.state;
    var result = -1;

    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });

    return result;
  }

  onDelete = (id) => {
    var index = this.findIndex(id);
    var {tasks} = this.state;

    if (index !== -1) {
      tasks.splice(index, 1);
    }

    this.setState({
      tasks: tasks
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var index = this.findIndex(id);
    var {tasks} = this.state;
    var taskEditing = tasks[index];

    this.setState({
      taskEditing: taskEditing
    });

    this.onShowForm();
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onFilter = (filterName, filterSatus) => {
    filterSatus = parseInt(filterSatus, 10);
    this.setState({
      filter: {
        name: filterName,
        status: filterSatus
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    });
  }

  onSort = (sort_by, sort_value) => {
    this.setState({
      sortBy: sort_by,
      sortValue: sort_value
    })
  }

  render() {
    var {isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue} = this.state;

    // if(filter) {
      // if(filter.name) {
      //   tasks = tasks.filter((task) => {
      //     return task.name.toLowerCase().indexOf(filter.name) !== -1;
      //   });
      // }

    //   tasks = tasks.filter((task) => {
    //     if(filter.status === -1) {
    //       return tasks;
    //     } else {
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   })
    // }

    // if(keyword) {
    //   tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(keyword) !== -1;
    //     });
    // }

    // if(sortBy === 'name') {
    //   tasks.sort((a, b) => {
    //     if(a.name > b.name) return sortValue;
    //     else if (a.name < b.name) return -sortValue;
    //     else return 0;
    //   });
    // } else {
    //   tasks.sort((a, b) => {
    //     if(a.status > b.status) return sortValue;
    //     else if (a.status < b.status) return -sortValue;
    //     else return 0;
    //   });
    // }

    var elmTaskForm = isDisplayForm ?
      <TaskForm
        onCloseForm={this.onCloseForm}
        onSubmit={this.onSubmit}
        task={taskEditing} /> : '';

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quan ly cong viec</h1><br/>
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :
            'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggeForm}
            >
              <span className="fa fa-plus mr-5"></span>Them cong viec
            </button> &nbsp;
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue= {sortValue} />
            <br/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
